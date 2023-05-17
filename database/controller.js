/* Controller */
import Users from "../model/user";

// GET: http://localhost:3000/api/users
export async function getUsers(req, res) {
  const users = await Users.find({});
  try {
    if (!users || users.length === 0) {
      return res.status(404).json({ error: "Data not found" });
    }
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
}

// GET: http://localhost:3000/api/users/:userId
export async function getUserById(req, res) {
  const { userId } = req.query;

  try {
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
}

//Post: http://localhost:3000/api/users
export async function postUser(req, res) {
  const formData = req.body;
  try {
    if (!formData)
      return res.status(404).json({ error: "Form Data Not Provided...!" });
    const newUser = await Users.create(formData);
    return res.status(200).json(newUser);
  } catch (error) {
    return res.status(500).json({ error: "Error creating user" });
  }
}

//Put http://localhost:3000/api/users/:userId
export async function putUser(req, res) {
  const { userId } = req.query;
  const formData = req.body;
  try {
    if (userId && formData) {
      const user = await Users.findByIdAndUpdate(userId, formData);
      res.status(200).json(user);
      //await user.save();
    }
    res.status(404).json({ error: "User not found" });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
}

//DELETE: http://localhost:3000/api/users/:userId
export async function deleteUser(req, res) {
  const { userId } = req.query;
  try {
    if (userId) {
      const user = await Users.findByIdAndRemove(userId);
      res.status(200).json({ message: "User deleted successfully" });
    }
    res.status(404).json({ error: "User not found" });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
}
