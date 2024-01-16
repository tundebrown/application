import { Candidate } from "@/app/lib/models";
import { connectToDB } from "@/app/lib/utils";


export default async function handler(req, res) {
  const { q, page } = req.query;
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = 10;

  try {
    await connectToDB();

    const count = await Candidate.find({ firstname: { $regex: regex } }).countDocuments();
    const candidates = await Candidate.find({ firstname: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));

    res.status(200).json({ count, candidates });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch candidates" });
  }
}