import express from 'express';
import Tutorial from '../models/tutModel.js';

const router = express.Router();

router.post('/', async (request, response) => {
    try {

        const { 
            student_number, 
            student_email, 
            student_name, 
            dept_name, 
            prof_name, 
            subj_name, 
            request_date,
            remarks 
        } = request.body;

        if (!student_number || !student_email || !student_name || !dept_name || !prof_name || !subj_name || !request_date || !remarks ) {
            return response.status(400).send({ message: 'Send all req fields' });
        }

        const newTut = {
            student_number: request.body.student_number,
            student_email: request.body.student_email,
            student_name: request.body.student_name,
            dept_name: request.body.dept_name,
            prof_name: request.body.prof_name,
            subj_name: request.body.subj_name,
            request_date: request.body.request_date,
            remarks: request.body.remarks,
        };        

        const tut = await Tutorial.create(newTut)
        return response.status(201).send(tut)

    } catch(e) {
        console.log(e.message);
        response.status(500).send({message: e.message})
    };
});

router.get('/', async (request, response) => {
    try{
        const tut = await Tutorial.find({});
        return response.status(200).json({
            count: tut.length,
            data: tut
        });
    } catch(e){
        console.log(e.message);
        response.status(500).send({ message: e.message });
    }
});

router.get('/:id', async (request, response) => {
    try{
        const { id } = request.params;
        const tut = await Tutorial.findById(id);
        return response.status(200).json(tut);
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
            prof_name, 
            subj_name, 
            request_date,
            remarks 
        } = request.body;

        if (!student_number || !student_email || !student_name || !dept_name || !prof_name || !subj_name || !request_date || !remarks ) {
            return response.status(400).send({ message: 'Send all req fields' });
        }
        
        const { id } = request.params;
        const result = await Tutorial.findByIdAndUpdate(id, request.body);

        if(!result){
            return response.status(404).json({ message: 'tutorial data not found' })
        }

        return response.status(200).send({ message: 'tutorial data updated' });

    } catch(e) {
        console.log(e.message);
        response.status(500).send({message: e.message})
    };
});

router.delete('/:id', async (request, response) => {
    try{

        const { id } = request.params;
        const result = await Tutorial.findByIdAndDelete(id);

        if(!result){
            return response.status(404).json({ message: 'tutorial data not found' });
        }

        return response.status(200).send({ message: 'tutorial data deleted successfully' });

    } catch(e) {
        console.log(e.message);
        response.status(500).send({ message: e.message });
    }
});

export default router;