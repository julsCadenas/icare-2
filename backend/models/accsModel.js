import mongoose from "mongoose";

const accsSchema = new mongoose.Schema({
    student_number: {
        type: Number,
        required: true,
        unique: true,
        trim: true
    },
    student_email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    student_name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    Department: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }

}, { timestamps: true }); 

const Accounts = mongoose.model('Accounts', accsSchema);

export default Accounts;
