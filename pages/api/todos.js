import User from "../../model/User";
import conectDB from "../../utils/conectDB";
import { getSession } from "next-auth/react";
import { sortTodos } from "../../utils/sortTodos";

async function handler(req, res) {
  try {
    await conectDB();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "failed", message: "Error in connecting to DB" });
  }

  const session = await getSession({ req });
  if (!session) {
    return res
      .status(401)
      .json({ status: "failed", message: "You are not logged in" });
  }
  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    return res
      .status(404)
      .json({ status: "failed", message: "User not found" });
  }

  if (req.method === "POST") {
    const { title, status, description } = req.body;

    if (!title || !status || !description) {
      return res
        .status(422)
        .json({ status: "failed", message: "Invalid data" });
    }
    user.todos.push({ title, status, description });
    const savedUser = await user.save();
    console.log(savedUser.todos);

    res.status(201).json({ status: "success", message: "Todo created!" });
  } else if (req.method === "GET") {
    const sortedData = sortTodos(user.todos);
    res.status(200).json({ status: "success", data: { todos: sortedData } });
  } else if (req.method === "PATCH") {
    const { id, status } = req.body;
    if (!id || !status) {
      return res
        .status(422)
        .json({ status: "failed", message: "Invalid data!" });
    }

    const result = await User.updateOne(
      { "todos._id": id },
      { $set: { "todos.$.status": status } }
    );
    console.log(result);
    res.status(200).json({ status: "success" });
  } else if (req.method === "DELETE") {
    const { id } = req.body; 

    if (!id) {
      return res.status(422).json({ status: "failed", message: "Invalid ID" });
    }

    try {
     
      const result = await User.updateOne(
        { "todos._id": id },
        { $pull: { todos: { _id: id } } }
      );

      console.log("DELETE result:", result);

      if (result.modifiedCount === 0) {
        return res
          .status(404)
          .json({ status: "failed", message: "Todo not found" });
      }

      res.status(200).json({ status: "success", message: "Todo deleted!" });
    } catch (err) {
      console.error("Error deleting todo:", err);
      res.status(500).json({ status: "failed", message: err.message });
    }
  }
}

export default handler;
