import { Interviewvideo } from "@/app/lib/models";
import { connectToDB } from "@/app/lib/utils";

export default async function handler(req, res) {
  const { q, page } = req.query;
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = 10;

  try {
    await connectToDB();

    const aggregationPipeline = [
      {
        $match: {
          postingTitle: {
            $regex: regex, // Case-insensitive regex search on username
          },
        },
      },
      {
        $lookup: {
          from: "clients",
          localField: "client",
          foreignField: "_id",
          as: "clientData",
        },
      },
      {
        $lookup: {
          from: "candidates",
          localField: "candidate",
          foreignField: "_id",
          as: "candidateData",
        },
      },
      {
        $unwind: "$clientData",
      },
      {
        $unwind: "$candidateData",
      },
      {
        $project: {
          _id: 1,
          postingTitle: 1,
          startTime: 1,
          endTime: 1,
          comment: 1,
          client: "$clientData.username",
          candidate: {
            firstname: "$candidateData.firstname",
            lastname: "$candidateData.lastname",
          },
        },
      },
      {
        $limit: parseInt(ITEM_PER_PAGE),
      },
      {
        $skip: parseInt(ITEM_PER_PAGE * (page - 1)),
      },
    ];

    const count = await Interviewvideo.find({
      postingTitle: { $regex: regex },
    }).countDocuments();
    const interviews = await Interviewvideo.aggregate(aggregationPipeline);

    res.status(200).json({ interviews: interviews, count: count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch clients", err });
  }
}
