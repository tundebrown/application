import { Client } from "@/app/lib/models";
import { connectToDB } from "@/app/lib/utils";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, contactNumber, accountManager, email } = req.body;

    console.log(username)

    try {
      connectToDB();

      const newClient = new Client({
        username,
        contactNumber,
        accountManager,
        email,
      });

      await newClient.save();

      res
        .status(201)
        .json({ success: true, data: "Client created successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, error: `Internal Server Error${error}` });
    }
  } else {
    res.status(405).json({ success: false, error: "Method Not Allowed" });
  }
}
