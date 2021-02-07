const mongoose = require('mongoose');
const { Schema } = mongoose;

const offerSchema = new Schema({
  job: {
    type: Schema.Types.ObjectId,
    ref: 'jobs'
  },
  type: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  services: {
    type: [String],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  // adults: {
  //   type: Number,
  //   required: true
  // },
  // children: {
  //   type: Number,
  //   required: true
  // }
});

mongoose.model('offers', offerSchema);