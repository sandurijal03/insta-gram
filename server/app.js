const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const AuthRoutes = require('./routes/auth');
const PostRoutes = require('./routes/post');
const UserRoutes = require('./routes/user');

// parsing body middlewares

app.use(express.json());
app.use(cors());

// User routes
app.use(AuthRoutes);
app.use(UserRoutes);
app.use(PostRoutes);

mongoose
  .connect('mongodb://localhost:27017/instagram-clone', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(3001, () => console.log('Server is running on port  3001'));
    console.log('database connected');
  })
  .catch((err) => console.log(err));
