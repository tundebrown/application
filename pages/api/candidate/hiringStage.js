import { Candidate } from "@/app/lib/models";
import { connectToDB } from "@/app/lib/utils";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { id, hiringStage } = req.body;

    
    try {
        await connectToDB();
        await Candidate.findByIdAndUpdate({_id: id}, {hiringStage: hiringStage});

      res.status(201).json({ success: true, data: "Hiring Stage updated successfully" });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Internal Server Error', error });
      console.log(error)
    }
  } else {
    res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }
}