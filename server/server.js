const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors')
require("dotenv").config()

require('./models/User');
require('./models/Job');
require('./models/Offer');
require('./models/Profile');
require('./models/AdminProfile');
require('./models/Pin');

const db = process.env.mongoURI;
const port = process.env.PORT || 5000;

const users = require('./routes/user');
const profiles = require('./routes/profile');
const jobs = require('./routes/job');
const offers = require('./routes/offer');
const admin = require('./routes/admin');

const app = express();

app.use(express.json());
app.use(cors())
// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./services/passport')(passport);

// Use Routes
app.use('/api/users', users);
app.use('/api/profiles', profiles);
app.use('/api/jobs', jobs);
app.use('/api/offers', offers);
app.use('/api/admin', admin);

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('client/build'));

//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
//   })
// };

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(port);
    console.log('DB connected port '+port)
  })
  .catch(err => {
    console.log(err);
  });