const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('./admin.model');

module.exports = {
  //CREATE USER
  async signUp(req, res) {
    try {
      const { fullName, email, password } = req.body;

      const otheruser = await Admin.findOne({ email });

      if (otheruser) {
        throw new Error('This email is already registered');
      }

      const encPassword = await bcrypt.hash(password, 8);
      // const createdAt = new Date(Date.now()).toString();

      const admin = await Admin.create({
        fullName,
        email,
        password: encPassword,
      });

      res.status(201).json({
        message: 'admin Created Successfully',
        admin,
      });
    } catch (error) {
      res.status(500).json({
        message: `We couldn't create this admin, ${error}`,
      });
    }
  },

  //LOG USER
  async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const admin = await Admin.findOne({ email });

      if (!admin) {
        throw new Error('email or password invalid');
      }

      const isValid = await bcrypt.compare(password, admin.password);

      if (!isValid) {
        throw new Error('email or password invalid');
      }

      const token = jwt.sign({ id: admin._id }, process.env.ACCESS_KEY, {
        expiresIn: 3600,
      });

      res.status(200).json({ message: `Welcome back ${admin.email}!`, token });
    } catch (error) {
      res.status(500).json({
        error,
      });
    }
  },

  //GET USER INFO
  async getUserData(req, res) {
    try {
      const users = await Admin.find();

      res.status(201).json({ message: 'Success!', users });
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  // UPDATE USER
  // async updateUserInfo(req, res) {
  //   try {
  //     const { userId } = req.params;
  //     const updatedData = req.body;

  //     const updatedUser = await Admin.findByIdAndUpdate(userId, updatedData, {
  //       new: true,
  //     });

  //     if (!updatedUser) {
  //       return res.status(404).json({ message: `There is no user with this Id inside the DB` });
  //     }

  //     res.status(200).json({ message: 'User updated', updatedUser });
  //   } catch (error) {
  //     res.status(500).json({
  //       message: "Sorry! We couldn't update the user",
  //     });
  //   }
  // },

  //DELETE USER
  // async deleteUser(req, res) {
  //   try {
  //     const { userId } = req.params;

  //     const result = await Admin.findByIdAndDelete(userId);
  //     const isDeleted = result ? true : false;

  //     if (result !== null) {
  //       res.status(200).json({ message: `User deleted successfully` });
  //     } else {
  //       throw new Error('User not found!');
  //     }
  //   } catch (error) {
  //     res.status(500).json({ message: `User deletion failed! ${error}` });
  //   }
  // },
};
