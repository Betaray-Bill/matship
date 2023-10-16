import mongoose from 'mongoose';

const masterSchema = mongoose.Schema(
  {
    class: {
      type: String,
      required: true,
    },
    subclass: {
      type: String,
      required: true,
      unique: true,
    },
    tensileStrength:{
        type: Number,
        required: true
    }
  }
);


const masterClass = mongoose.model('MasterClass', masterSchema);

export default masterClass;