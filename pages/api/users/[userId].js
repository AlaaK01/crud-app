import connectToMongo from "../../../database/connect";
import { getUserById, putUser, deleteUser } from "../../../database/controller";

export default async function handler(req, res) {
  connectToMongo().catch(() =>
    res.status(405).json({ error: "Error in the Connection" })
  );
  const { method } = req;

  switch (method) {
    case "GET":
      getUserById(req, res);
      break;
    case "PUT":
      putUser(req, res);
      break;
    case "DELETE":
      deleteUser(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
