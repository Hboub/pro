const mongoose = require('mongoose');
require("dotenv").config()
const stripe = process.env.stripeSecretKey;
const Profile = mongoose.model('profiles');
const Job = mongoose.model('jobs');
const AdminProfile = mongoose.model('adminprofiles');

// Create standard user profile
exports.createUserProfile = async (req, res) => {
  try {
    const newProfile = await new Profile({ user: req.user._id }).save();
    res.status(200).json(newProfile);
  } catch (err) {
    res.status(400).json({ success: false, err });
  };
};

// Get a profile depending on the role of the user
exports.getProfile = async (req, res) => {
  const { role } = req.user;
  try {
    if (role === 0) {
      const profile = await Profile.findOne({ user: req.user._id });
      if (!profile) return res.status(200).json({});
      return res.status(200).json(profile); // return null if doesn't exist
    };

    if (role === 1) {
      return res.status(200).json({ status: 'Is waiting for registration.' })
    };

    if (role === 2) {
      const jobs = await Job.find({ owner: req.user._id });
      return res.status(200).json({ jobs });
    };

    if (role === 3) {
      const profile = await AdminProfile.findOne({ user: req.user._id });
      return res.status(200).json(profile);
    };

  } catch (err) {
    res.status(400).json({ success: false, err });
  };
};

// Send a message to the admin asking for registration in order to enable sharing of job objects
exports.askForRegistration = async (req, res) => {
  console.log(req.body)
  console.log(req.user)
  try {
    await AdminProfile.findOneAndUpdate(
      { user: process.env.adminId1 },
      { "$push": { "requests": { user: req.user._id } } }
    );

    req.user.role = 1;
    const user = await req.user.save();

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ success: false, err });
  };
};

exports.submitOrder = async (req, res) => {
  const { name, address, contact, city, total, checkIn, checkOut, jobId } = req.body;
console.log(req.body)
  try {
    const newOrder = {
      jobName: name,
      city,
      address,
      contact,
      total,
      checkIn,
      checkOut,
      jobId
    };

    await Profile.findOneAndUpdate(
      { user: req.user._id },
      { $push: { history: newOrder } },
      { new: true }
    );

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ success: false, err });
  };
};

exports.handlePayment = async (req, res) => {
  const { total, token, orderId } = req.body;

  try {
    // await stripe.charges.create({
    //   amount: total * 100,
    //   currency: 'usd',
    //   description: `To pay: ${total}`,
    //   source: token.id
    // });

    await Profile.updateOne(
      { user: req.user._id, "history._id": orderId },
      { $set: { "history.$.paid": true } }
    );

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ success: false, err });
  };
};

exports.addOpinion = async (req, res) => {
  const { jobName, orderId, text, rating, jobId } = req.body;
console.log(req.body.jobId)
  const newOpinion = {
    fullname: req.user.fullname,
    text,
    rating
  };

  try {
    const job = await Job.findById(jobId);
    console.log(job)
    const updatedRating = ((job.rating * job.opinions.length) + parseInt(rating, 10)) / (job.opinions.length + 1);

    job.rating = updatedRating;
    job.opinions.push(newOpinion);

    await job.save();

    await Profile.updateOne(
      { user: req.user._id, "history._id": orderId },
      { $set: { "history.$.rated": true } }
    );

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ success: false, err });
  };
};