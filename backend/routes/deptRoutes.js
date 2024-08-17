import express from 'express';
import Department from '../models/deptModel.js';

const router = express.Router();

router.post('/', async (request, response) => {
    try {
        if(!request.body.dept_name || !request.body.subjects) {
            return response.status(400).send({ message: 'Send all req fields' });
        }
        
        const newDept = {
            dept_name: request.body.dept_name,
            subjects: request.body.subjects,
        };

        const dept = await Department.create(newDept)
        return response.status(201).send(dept)

    } catch(e) {
        console.log(e.message);
        response.status(500).send({message: e.message})
    };
});

router.get('/', async (request, response) => {
    try{
        const depts = await Department.find({});
        return response.status(200).json({
            count: depts.length,
            data: depts
        });
    } catch(e){
        console.log(e.message);
        response.status(500).send({ message: e.message });
    }
});

router.get('/:id', async (request, response) => {
    try{
        const { id } = request.params;
        const dept = await Department.findById(id);
        return response.status(200).json(dept);
    } catch(e){
        console.log(e.message);
        response.status(500).send({ message: e.message });
    }
});

router.get('/:id/dept_name', async (request, response) => {
    try{
        const { id } = request.params;
        const dept = await Department.findById(id, 'dept_name');

        if(!dept){
            return response.status(404).json({ message: 'department not found' });
        }

        return response.status(200).json(dept.dept_name);
    } catch(e){
        console.log(e.message);
        response.status(500).send({ message: e.message });
    }
});

router.put('/:id', async (request, response) => {
    try {
        if(!request.body.name || !request.body.subjects) {
            return response.status(400).send({ message: 'Send all req fields' });
        }
        
        const { id } = request.params;
        const result = await Department.findByIdAndUpdate(id, request.body);

        if(!result){
            return response.status(404).json({ message: 'department not found' })
        }

        return response.status(200).send({ message: 'departments updated' });

    } catch(e) {
        console.log(e.message);
        response.status(500).send({message: e.message})
    };
});

router.delete('/:id', async (request, response) => {
    try{

        const { id } = request.params;
        const result = await Department.findByIdAndDelete(id);

        if(!result){
            return response.status(404).json({ message: 'department not found' });
        }

        return response.status(200).send({ message: 'department deleted successfully' });

    } catch(e) {
        console.log(e.message);
        response.status(500).send({ message: e.message });
    }
});

export default router;