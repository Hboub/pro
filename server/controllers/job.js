const mongoose = require("mongoose");
const Job = mongoose.model("jobs");
const Pin = mongoose.model("pins");
const jobValidator = require("../validation/job");
require("dotenv").config();

const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.cloudName,
  api_key: process.env.cloudAPIKey,
  api_secret: process.env.cloudAPISecret,
});

// Add job
exports.createJob = async (req, res) => {
  console.log(req.body)
  const { errors, isValid } = jobValidator(req.body);
  if (!isValid) return res.status(400).json(errors);
  const { services, name, city, contact, description, price, days, images, pin } = req.body;
  try {
console.log(req.body)
    const createdPin = await new Pin({
      title: pin.title,
      description: pin.description,
      longitude: pin.longitude,
      latitude: pin.latitude,
      image: images.length !== 0 ? images[0].url : null
    }).save();

    const job = await new Job({
      owner: req.user._id,
      services,
      name,
      price,
      days,
      city,
      description,
      images,
      pin: createdPin._id,
      contact: parseInt(contact, 10)
    }).save();

    res.status(200).json(job);
  } catch (err) {
    res.status(400).json({ success: false, err });
  };
};

// update job
// exports.updateJob = async (req, res) => {
//   console.log(req.body);
//   const { errors, isValid } = jobValidator(req.body);
//   console.log(isValid);
//   if (!isValid) return res.status(400).json(errors);

//   const {
//     services,
//     name,
//     city,
//     contact,
//     description,
//     images,
//     pin,
//     price,
//   } = req.body;

//   try {
//     Post.findOneAndUpdate(
//       { _id: id },
//       {
//         $pull: { _members: member },
//       },
//       { new: true }
//     ).populate({ path: "_members", select: "_id", model: "user" });
//     console.log("job");
//     res.status(200).json(job);
//   } catch (err) {
//     res.status(400).json({ success: false, err });
//   }
// };

// Get user jobs
exports.getUserJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ owner: req.user._id });

    res.status(200).json(jobs);
  } catch (err) {
    res.status(400).json({ success: false, err });
  }
};

// Upload image
exports.uploadImage = (req, res) => {
  cloudinary.uploader.upload(
    req.files.file.path,
    (result) => {
      res.status(200).json({
        public_id: result.public_id,
        url: result.url,
      });
    },
    {
      public_id: `${Date.now()}`,
      resource_type: "auto", // type of image (png, jpg), auto -> cloudinary automaticly recognize type
    }
  );
};

// Remove image
exports.removeImage = (req, res) => {
  let image_id = req.query.public_id;

  cloudinary.uploader.destroy(image_id, (err, result) => {
    if (err) return res.json({ success: false }); // we can get it on te client (in this case we dont)
    res.status(200).json({ success: "true" });
  });
};

//Get job profile
exports.getJob = async (req, res) => {
  console.log("yoo again");
  try {
    const housekeeer = await Job.find({});
    console.log(housekeeer);
    res.status(200).json(housekeeer);
  } catch (err) {
    res.status(400).json({ success: false, err });
  }
};

exports.removeJob = async ({ params: { id } }, res) => {
  console.log(id);
  try {
    await Job.findOneAndDelete({ _id: id });
  } catch (err) {
    res.status(400).json({ success: false, err });
  }
};

//Search jobs
exports.searchForJobs = async ({ body }, res) => {
  let args = {};
  console.log(body);
  for (let key in body) {
    if (body[key] !== "") args[key] = body[key];
  }

  try {
    const jobs = await Job.find(args).populate("pin").limit(10);
    res.status(200).json(jobs);
  } catch (err) {
    res.status(400).json({ success: false, err });
  }
};
