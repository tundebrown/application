import { Candidate } from "@/app/lib/models";
import { connectToDB } from "@/app/lib/utils";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    await connectToDB();
    const candidate = await Candidate.findById(id);

    if (!candidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    res.status(200).json(candidate);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch candidate" });
  }
}
