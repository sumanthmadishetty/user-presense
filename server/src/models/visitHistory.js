import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

const visitHistorySchema = new mongoose.Schema({
  lastActive: {
    type: Date,
    default: Date.now,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
  },
});

visitHistorySchema.plugin(mongooseUniqueValidator, {
  message: 'This use already have a visit history!',
});

const VisitHistory = mongoose.model(
  'VisitHistory',
  visitHistorySchema,
);

export default VisitHistory;
