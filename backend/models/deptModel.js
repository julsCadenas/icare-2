import mongoose from "mongoose";

const deptSchema = new mongoose.Schema({
    dept_name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    subjects: [{
        subj_name: {
            type: String,
            required: true,        
            trim: true    
        },
        professors: [{
            prof_name: {
                type: String,
                required: true,
                trim: true
            },
            email: {
                type: String,
                required: true,
                trim: true
            }
        }]
    }]
}, { timestamps: true }); 

const Department = mongoose.model('Department', deptSchema);

export default Department;
