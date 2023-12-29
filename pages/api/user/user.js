"use server"
// import { auth } from "@/app/auth";
import { connectToDB } from "@/app/lib/utils";

export default async function handler(req, res) {
//   const { user } = await auth();
  try { 

    res.status(200).json({ message: "this works" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch user" });
  }
}
