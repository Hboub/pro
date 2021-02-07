const mongoose = require('mongoose');
const { Schema } = mongoose;

const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  history: [
    {
      rated: {
        type: Boolean,
        default: false
      },
      paid: {
        type: Boolean,
        default: false
      },
      total: {
        type: Number,
        required: true,
      },
      jobName: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      address: {
        type: String,
        required: true
      },
      contact: {
        type: Number,
        required: true
      },
      checkIn: {
        type: Date,
        required: true
      },
      checkOut: {
        type: Date,
        required: true
      },
      jobId: {
        type: Schema.Types.ObjectId,
        ref: 'jobs'
      }
    }
  ]
});

mongoose.model('profiles', profileSchema);