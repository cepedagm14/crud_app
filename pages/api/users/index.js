import connectMongo from "../../../database/conn";
import { getUsers, postUser } from "../../../database/controller";

export default async function handler(req, res) {
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the Connection" })
  );
  const {
    query: { id, name },
    method,
  } = req;

  switch (method) {
    case "GET":
      // Get data from your database
      getUsers(req, res);
      break;
    case "POST":
      // Update or create data in your database
      postUser(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
