// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectToMongo from "@/database/connect"

export default function handler(req, res) {
  connectToMongo();
  res.status(200).json({ name: 'John Doe' })
}

