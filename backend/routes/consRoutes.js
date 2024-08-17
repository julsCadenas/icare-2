import express from 'express';
import Consultation from '../models/consModel.js';

const router = express.Router();

router.post('/', async (request, response) => {
    try {

        const { 
            student_number, 
            student_email, 
            student_name, 
            dept_name, 
            concern, 
            prof_name, 
            subj_name, 
            remarks 
        } = request.body;

        if (!student_number || !student_email || !student_name || !dept_name || !concern || !prof_name || !subj_name || !remarks ) {
            return response.status(400).send({ message: 'Send all req fields' });
        }

        const newCons = {
            student_number: request.body.student_number,
            student_email: request.body.student_email,
            student_name: request.body.student_name,
            dept_name: request.body.dept_name,
            concern: request.body.concern,
            prof_name: request.body.prof_name,
            subj_name: request.body.subj_name,
            remarks: request.body.remarks,
        };        

        const cons = await Consultation.create(newCons)
        return response.status(201).send(cons)

    } catch(e) {
        console.log(e.message);
        response.status(500).send({message: e.message})
    };
});

router.get('/', async (request, response) => {
    try{
        const cons = await Consultation.find({});
        return response.status(200).json({
            count: cons.length,
            data: cons
        });
    } catch(e){
        console.log(e.message);
        response.status(500).send({ message: e.message });
    }
});

router.get('/:id', async (request, response) => {
    try{
        const { id } = request.params;
        const cons = await Consultation.findById(id);
        return response.status(200).json(cons);
    } catch(e){
        console.log(e.message);
        response.status(500).send({ message: e.message });
    }
});

router.put('/:id', async (request, response) => {
    try {

        const { 
            student_number, 
            student_email, 
            student_name, 
            dept_name, 
            concern, 
            prof_name, 
            subj_name, 
            remarks 
        } = request.body;

        if (!student_number || !student_email || !student_name || !dept_name || !concern || !prof_name || !subj_name || !remarks ) {
            return response.status(400).send({ message: 'Send all req fields' });
        }
        
        const { id } = request.params;
        const result = await Consultation.findByIdAndUpdate(id, request.body);

        if(!result){
            return response.status(404).json({ message: 'data not found' })
        }

        return response.status(200).send({ message: 'data updated' });

    } catch(e) {
        console.log(e.message);
        response.status(500).send({message: e.message})
    };
});

router.delete('/:id', async (request, response) => {
    try{

        const { id } = request.params;
        const result = await Consultation.findByIdAndDelete(id);

        if(!result){
            return response.status(404).json({ message: 'data not found' });
        }

        return response.status(200).send({ message: 'data deleted successfully' });

    } catch(e) {
        console.log(e.message);
        response.status(500).send({ message: e.message });
    }
});

export default router;