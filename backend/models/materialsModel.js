import mongoose from 'mongoose';

const masterSchema = mongoose.Schema(
  {
    companyName:{
      type:String
    },
    productName:{
      type:String,
      required:true,
      unique:true
    },
    MasterClass: {
      type: String,
      required: true,
    },
    subClass: {
      type: String,
      required: true,
    },
    Family:{
        type: String,
        required: true
    },
    Sustainability:{
        type: String,
        required: true
    },
    Filler:{
        type: String,
        required: true
    },
    DeliveryForm:{
        type: String,
        required: true
    },
    SpecimenType:{
      type: String,
      required: true
    },
    h:{
      type:Number,
      required:true
    },
    L0:{
      type:Number,
      required:true
    },
    temperature:[
      {
        type:Number
      }
    ],
    conditioned:[
      {
        type:Number
      }
    ],
    NumberOf_Specimens:[
      {
        type:Number
      }
    ],
    CrossHeadSpeed:[
      {
        type:Number
      }
    ],
    X_axis_Type:[
      {
        type:Number
      }
    ],
    Y_axis_Type:[
      {
        type:Number
      }
    ]
  }
);


const masterClass = mongoose.model('MasterClass', masterSchema);

export default masterClass;