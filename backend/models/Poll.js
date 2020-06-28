import { Schema, model } from 'mongoose';

// Create Schema
const PollSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  options: []
});

const Poll = model('poll', PollSchema);

export default Poll;
