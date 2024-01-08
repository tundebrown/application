import { Client } from "@/app/lib/models";
import { connectToDB } from "@/app/lib/utils";

export default async function handler(req, res) {
  try {
    await connectToDB();

    const clients = await Client.find();

    res.status(200).json({ clients });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch client" });
  }
}