import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import { Company, CompanyEntity } from '../models/companyEntity.js';

// login - POST - /login
const login = asyncHandler(async(req, res) => {
    const { email, password, companyEntity } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);

        const com = await CompanyEntity.findOne({name:companyEntity, users:user._id})
        if(!com){
            res.status(500).json("Enter Correct Company Entity")
        }

        res.status(200).json(user);
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
})


// Register - POST - /register
const register =asyncHandler(async(req, res) => {
    const { name, email, password, phoneNumber, company, companyEntity } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name:name,
        email:email,
        password:password,
        phoneNumber:phoneNumber,
        company:company,
        companyEntity:companyEntity
    });
    await user.save()
    console.log(user)
    if (user) {
        generateToken(res, user._id);

        const companyName = await Company.find({name:company});
        console.log(companyName[0].entities)
        var userEntity = ''
        
        if(!companyName[0].entities.includes(companyEntity)){
            res.status(500).json("COmpany Entity Not present in Company")
        }

        console.log("User Enty", companyEntity, userEntity)
        // Add user to Company Entity
        const cmpEnty = await CompanyEntity.findOne({name:companyEntity})
        await cmpEnty.users.push(user.id);
        await cmpEnty.save()        
        console.log(cmpEnty)
        res.status(200).json(user);
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
})

// SignOut - GET - /signout
const signout = asyncHandler(async(req, res) => {
    res.clearCookie('jwt').status(200).json('Signout success!');
})


// Update User - PUT - /update/:id
const updateUser = asyncHandler(async(req, res) => {
    const id = req.params.id;

    const userExists = await User.findOne({ _id:id });
    if (!userExists) {
        res.status(400);
        throw new Error('User doesn\'\t exists');
    }

    try{
        const updateUser = await User.findByIdAndUpdate(
            id,
            {
                $set:req.body
            }
        )
        res.status(200).json(updateUser);
    }catch(err){
        return res.status(500).json("Error in Updating User")
    }
})


export{
    login,
    register,
    signout,
    updateUser
}