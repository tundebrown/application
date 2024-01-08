import { Interview, Candidate } from "@/app/lib/models";
import { connectToDB } from "@/app/lib/utils";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { interviewName, client, candidate, postingTitle, interviewOwner, location, startTime, endTime, comment } = req.body;

    
    try {
        await connectToDB();
        const newInterview = new Interview({
            interviewName,
        client,
        candidate,
        postingTitle,
        interviewOwner,
        location,
        startTime,
        endTime,
        comment
          });

          await newInterview.save();
          await Candidate.findByIdAndUpdate({_id: candidate}, {hiringStage: "interviewScheduled"});

      res.status(201).json({ success: true, data: "Interview created successfully" });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Internal Server Error', error });
      console.log(error)
    }
  } else {
    res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }
}