const User = require('../models/user');
const bcrypt = require('bcryptjs');
const router = require('express').Router();
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../keys');

const requireLogin = require('../middleware/requireLogin');

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    return res.status(422).json({ error: 'Please fill all the fields' });
  }

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(422)
        .json({ error: 'User already exists with that email' });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    return res.status(200).json({ message: 'saved successfully' });
  } catch (err) {
    console.log(err);
  }
});

router.post('/signin', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({
      error: 'please add email or password',
    });
  }
  User.findOne({ email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: 'Invalid email or password' });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          // res.json({ message: 'succesfully signed in' });
          const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
          const { _id, name, email } = savedUser;
          res.json({ token, user: { _id, name, email } });
        } else {
          return res.status(422).json({ error: 'Invalid email or password' });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

module.exports = router;
