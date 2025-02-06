import Users from "../model/userModel.js";

export const getUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};


export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await Users.findOne({ username });
    if (user) {
      if (user.password === password) {
        res.status(200).json({
          id: user._id,
          username: user.username,
          email: user.email,
          image: user.image,
        });
      } else {
        res.status(400).json({ message: "Wrong password" });
      }
    } else {
      res.status(400).json({ message: "User not found" });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
export const createUser = async (req, res) => {
  try {
    const { username, email, password, image } = req.body;

    const isUserExists = await Users.findOne({ email });

    if (isUserExists) {
      res.status(400).json({ message: "User already exists" });
    } else {
      const user = await Users.create({
        username,
        email,
        password,
        image,
      });

      res.status(201).json(user);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const UpdateUser = async (req, res) => {
  try {
    const { name, email, password, image } = req.body;

    const user = await Users.findById(req.params.id);

    if (user) {
      user.username = name;
      user.email = email;
      user.password = password;
      user.image = image;

      const updatedUsers = await user.save();

      res.status(200).json(updatedUsers);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
