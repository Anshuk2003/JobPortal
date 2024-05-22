import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";

const userSchema = new mongoose.Schema(
    {
        userType: {
            type: String,
            required: true,
            default: "employee",
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
            required: false
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false
        },
        //additionall fields for employee
        skills: {
            type: [],
            required: false,
        },
        education: {
            type: [],
            required: false,
        },
        experience: {
            type: [],
            required: false,
        },
        addressEmployee: {
            type: String,
            required: false
        },
        pincode: {
            type: String,
            required: false
        },
        gender: {
            type: String,
            required: false
        },
        carrierObjective: {
            type: String,
            required: false
        },
        projects: {
            type: [],
            required: false
        },
        links: {
            type: [],
            required: false
        },
        //additionall fields for employer

        establishmentYear: {
            type: Number,
            required: false
        },
        companySize: {
            type: Number,
            required: false
        },
        website: {
            type: String,
            required: false
        },
        about: {
            type: String,
            required: false
        },
        address: {
            type: String,
            required: false,
        },
        isVerified:{
            type:Boolean,
            default:false
        },
        verifyToken: String,
        verifyTokenExpiry: Date
    },
    {
        timestamps: true
    });

//if model already exists Delete old model
if (mongoose.models.users) {
    const userModel = mongoose.model('users')
    mongoose.deleteModel(userModel.modelName)

}
//create new model
const User = mongoose.model("users", userSchema);
export default User;