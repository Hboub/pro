const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  pin: {
    type: Schema.Types.ObjectId,
    ref: 'pins'
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  city: {
    type: String,
    required: true
  },
  services: {
    type: [String],
    required: true
  },
  days: {
    type: [String],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  contact: {
    type: Number,
    required: true
  },
  images: {
    type: Array,
    default: []
  },
  opinions: [
    {
      fullname: {
        type: String,
        required: true
      },
      text: {
        type: String,
        required: true
      },
      rating: {
        type: Number,
        required: true
      },
      date: {
        type: Date,
        default: new Date
      }
    }
  ]
});

mongoose.model('jobs', jobSchema);