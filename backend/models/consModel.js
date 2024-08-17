import mongoose from "mongoose";

const consSchema = new mongoose.Schema({
    student_number: {
        type: Number,
        required: true,
        trim: true
    },
    student_email: {
        type: String,
        required: true,
        trim: true
    },
    student_name: {
        type: String,
        required: true,
        trim: true
    },
    dept_name: {
        type: String,
        required: true,
        trim: true
    },
    concern: {
        type: String,
        required: true,
        trim: true
    },
    prof_name: {
        type: String,
        required: true,
        trim: true
    },
    subj_name: {
        type: String,
        required: true,
        trim: true 
    },
    remarks: {
        type: String,
        required: true,
        trim: true 
    }
}, { timestamps: true }); 

const Consultation = mongoose.model('Consultation', consSchema);

export default Consultation;
