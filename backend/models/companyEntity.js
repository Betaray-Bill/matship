import mongoose from 'mongoose';
import User from './userModel.js';

// COMPANY ENTITY
const companyEntity = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },  
        type: {
            type: String,
            // required: true,
        },
        users: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'User',
            },
        ],
        Legacymaterials:[
            { type:String }
        ], // Array of Materials name
        Properitarymaterials:[  
            { type:String }
        ], // Array of Materials name
    },{
    timestamps:true
})

// COMPANY
const companySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    entities: [
       { type:String}
    ], // Array of sub-companies/entities
});
  
const Company = mongoose.model('Company', companySchema);
const CompanyEntity = mongoose.model('CompanyEntity', companyEntity)
export {CompanyEntity, Company}
