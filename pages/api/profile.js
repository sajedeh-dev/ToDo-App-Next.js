import { getSession } from "next-auth/react";
import conectDB from "../../utils/conectDB";
import User from "../../model/User";
import { verifyPassword } from "../../utils/auth";

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
  console.log(session);
  if (!session) {
    return res
      .status(401)
      .json({ status: "failed", message: "You are not logged in!" });
  }

  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    return res
      .status(404)
      .json({ status: "failed", message: "User doesn't exist!" });
  }

  if (req.method === "POST") {
    const { name, lastName, password, contact, position } = req.body;

    const isValid = await verifyPassword(password, user.password);

    if (!isValid) {
      return res.status(422).json({
        status: "failed",
        message: "password is incorrect!",
      });
    }

    user.name = name;
    user.lastName = lastName;
    user.contact = contact;
    user.position = position;
    user.save();

    res.status(200).json({
      status: "success",
      data: { name, lastName, contact, position, email: session.user.email },
    });
  } else if (req.method === "GET") {
    res.status(200).json({
      status: "success",
      data: { name: user.name, lastName: user.lastName, email: user.email },
    });
  } else if (req.method === "PUT") {
    const { name, lastName, contact, position } = req.body;

    user.name = name;
    user.lastName = lastName;
    user.contact = contact;
    user.position = position;
    await user.save();

    return res.status(200).json({
      status: "success",
      data: {
        name: user.name,
        lastName: user.lastName,
        contact: user.contact,
        position: user.position,
        email: user.email,
      },
    });
  } else {
    return res
      .status(405)
      .json({ status: "failed", message: "Method not allowed" });
  }
}

export default handler;
