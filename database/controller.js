import Users from "../model/user";

//Cotroller

//get http://localhost:3000/api/users
export async function getUsers(req, res) {
  try {
    const users = await Users.find({});

    if (!users) return res.status(404).json({ error: "Data not Found" });
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

export async function postUser(req, res) {
  try {
    const formData = req.body;
    if (!formData)
      return res.status(404).json({ error: "Form data no provided..." });

    Users.create(formData, function (err, data) {
      res.status(200).json(data);
    });
  } catch (error) {
    res.status(404).json({ error: "Error post user" });
  }
}

export async function putUser(req, res) {
  try {
    const { userId } = req.query;
    const formData = req.body;

    if (userId && formData) {
      const user = await Users.findByIdAndUpdate(userId, formData);
      res.status(200).json(user);
    }

    res.status(404).json({ error: "User Not Selected...!" });
  } catch (error) {
    res.status(404).json({ error: "Error While Updating the Data...!" });
  }
}

export async function deleteUser(req, res) {
  try {
    const { userId } = req.query;
    if (userId) {
      const user = await Users.findByIdAndDelete(userId);
      return res.status(200).json({ delete: userId });
    }
    res.status(404).json({ error: "User Not Selected" });
  } catch (error) {
    res.status(404).json({ error: "Error While Deleting user...!" });
  }
}
