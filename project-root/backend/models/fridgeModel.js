import mongoose from 'mongoose';

const fridgeSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  items: {
    type: [String],
    default: [],
  },
  updatedBy: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model('Fridge', fridgeSchema);