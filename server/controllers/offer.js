const mongoose = require('mongoose');
const Offer = mongoose.model('offers');
const Job = mongoose.model('jobs');
const offerValidator = require('../validation/offer');

// exports.createOffer = async (req, res) => {
//   const { errors, isValid } = offerValidator(req.body);
//   if (!isValid) return res.status(400).json(errors);

//   try {
//     const { jobId, type, city, services, stars, price, adults, children } = req.body;

//     const offer = await new Offer({
//       job: jobId,
//       type, city, services, stars,
//       price: parseInt(price, 10),
//       adults: parseInt(adults, 10),
//       children: parseInt(children, 10)
//     }).save();

//     await Job.findOneAndUpdate(
//       { _id: jobId },
//       { "$push": { "offers": jobId } }
//     );

//     res.status(200).json(offer);
//   } catch (err) {
//     res.status(400).json({ success: false, err });
//   };
// };

exports.getJobOffers = async (req, res) => {
  try {
    const offers = await Offer.find({ job: req.params.jobId });

    res.status(200).json(offers);
  } catch (err) {
    res.status(400).json({ success: false, err });
  };
};

exports.searchForOffers = async ({ body }, res) => {
  let args = {};

  for (let key in body) {
    if (body[key] !== '') args[key] = body[key].toLowerCase();
  };
  console.log(args)

  try {
    const jobs = await Job.find(args).populate('pin').limit(10);
    console.log(jobs)

    res.status(200).json(jobs);
  } catch (err) {
    res.status(400).json({ success: false, err });
  };
};

exports.filterOffers = async (req, res) => {
  const { filters, limit, skip, searchData } = req.body;
  let filterData = {};
  let searchingData = {};
console.log(req.body)
  // filters {
  // type: [],
  // stars: [],
  // services: [],
  // price: []
  // }
  for (let key in filters) {
    if (filters[key].length > 0) {
      if (key === 'price') {
        filterData[key] = {
          $gte: filters[key][0], // greater than first arg in array of prices
          $lte: filters[key][1] // lower than ...
        };
      } else if (key === 'services') {
        filterData[key] = {
          $elemMatch: { $in: filters[key] } // if any element in services match 
        };
        
      } else if (key === 'days') {
        filterData[key] = {
          $elemMatch: { $in: filters[key] } // if any element in days match 
        };
        
      } else {
        filterData[key] = filters[key];
      };
    };
  };

  // searchData {
  //   city: '',
  //   adults: '2',
  //   children: '0'
  // }
  for (let key in searchData) {
    if (searchData[key] !== '') searchingData[key] = searchData[key].toLowerCase();
  };

  try {
    const job = await Job.find({ ...searchingData, ...filterData })
      .populate('pin')
      .skip(skip)
      .limit(limit);

    res.status(200).json(job);
    console.log(job)
  } catch (err) {
    res.status(400).json({ success: false, err });
  };
};

exports.getOffer = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('pin');

    res.status(200).json(job);
  } catch (err) {
    res.status(400).json({ success: false, err });
  };
};

// exports.removeOffer = async ({ params: { id } }, res) => {
//   try {
//     await Offer.findOneAndDelete({ _id: id });
//   } catch (err) {
//     res.status(400).json({ success: false, err });
//   };
// };