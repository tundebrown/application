import { Client } from "@/app/lib/models";
import { User } from "@/app/lib/models";
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
        username: {
          $regex: regex, // Case-insensitive regex search on username
        },
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'accountManager',
        foreignField: '_id',
        as: 'accountManagerData',
      },
    },
    {
      $unwind: '$accountManagerData',
    },
    {
      $project: {
        _id: 1,
        username: 1,
        contactNumber: 1,
        email: 1,
        accountManager: '$accountManagerData',
      },
    },
    {
      $limit: parseInt(ITEM_PER_PAGE),
    },
    {
      $skip: parseInt(ITEM_PER_PAGE * (page - 1)),
    },
  ];


    const count = await Client.find({ username: { $regex: regex } }).countDocuments();
    const clients = await Client.aggregate(aggregationPipeline);

    res.status(200).json({ clients:clients, count:count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch clients", err });
  }
}