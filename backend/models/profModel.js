import mongoose from "mongoose";

const profSchema = new mongoose.Schema({
    dept_name: {
        type: String,
        required: true,
        unique: true, 
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
        },
        schedule: [{
            day: {
                type: String,
                required: true
            },
            time: {
                type: String,
                required: true
            }
        }]
    }]
}, { timestamps: true });

const Professor = mongoose.model('Professor', profSchema);

export default Professor;
