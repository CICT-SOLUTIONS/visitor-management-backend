const jwt = require('jsonwebtoken');
const user = require('../api/user/user.model');

const authMiddleware = async (req, res, next) => {
  try {
    const bearerTokenPattern = /^Bearer\s[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_.+\/=]*$/;

    if (!bearerTokenPattern.test(req.headers.authorization)) {
      throw new Error('Invalid token format!');
    }

    const [_, token] = req.headers.authorization.split(' ');
    const { id } = jwt.verify(token, process.env.ACCESS_KEY);

    const user = await user.findById(id);

    if (!user) {
      throw new Error('There is no user with this id');
    }

    console.log('🔷 > -✔- < 🔷');
    next();
  } catch (error) {
    return res.status(401).json({ message: `Authorization process failed! ${error}` });
  }
};

module.exports = authMiddleware;
