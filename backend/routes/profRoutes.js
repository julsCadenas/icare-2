import express from 'express';
import Professor from '../models/profModel.js';

const router = express.Router();

router.get('/search', async (request, response) => {
    try {
        const { dept_name } = request.query;

        if (!dept_name) {
            return response.status(400).send({ message: 'department name is required' });
        }

        const deptNameString = String(dept_name);

        if (!deptNameString || /\d/.test(deptNameString)) {
            return response.status(400).send({ message: 'Invalid department name' });
        }

        const prof = await Professor.find({ dept_name: deptNameString });

        if (prof.length === 0) {
            return response.status(404).json({ message: 'No profs found for this department name' });
        }

        return response.status(200).json({
            count: prof.length,
            data: prof
        });
    } catch (e) {
        console.log(e.message);
        response.status(500).send({ message: e.message });
    }
});


router.post('/', async (request, response) => {
    try {
        if(!request.body.dept_name || !request.body.professors) {
            return response.status(400).send({ message: 'Send all req fields' });
        }
        
        const newProf = {
            dept_name: request.body.dept_name,
            professors: request.body.professors,
        };

        const prof = await Professor.create(newProf)
        return response.status(201).send(prof)

    } catch(e) {
        console.log(e.message);
        response.status(500).send({message: e.message})
    };
});

router.get('/', async (request, response) => {
    try{
        const profs = await Professor.find({});
        return response.status(200).json({
            count: profs.length,
            data: profs
        });
    } catch(e){
        console.log(e.message);
        response.status(500).send({ message: e.message });
    }
});

router.get('/:id', async (request, response) => {
    try{
        const { id } = request.params;
        const prof = await Professor.findById(id);
        return response.status(200).json(prof);
    } catch(e){
        console.log(e.message);
        response.status(500).send({ message: e.message });
    }
});

router.get('/:id/dept_name', async (request, response) => {
    try{
        const { id } = request.params;
        const prof = await Professor.findById(id, 'dept_name');

        if(!prof){
            return response.status(404).json({ message: 'department not found' });
        }

        return response.status(200).json(prof.dept_name);
    } catch(e){
        console.log(e.message);
        response.status(500).send({ message: e.message });
    }
});

router.put('/:id', async (request, response) => {
    try {
        if(!request.body.name || !request.body.professors) {
            return response.status(400).send({ message: 'Send all req fields' });
        }
        
        const { id } = request.params;
        const result = await Professor.findByIdAndUpdate(id, request.body);

        if(!result){
            return response.status(404).json({ message: 'department not found' })
        }

        return response.status(200).send({ message: 'professors updated' });

    } catch(e) {
        console.log(e.message);
        response.status(500).send({message: e.message})
    };
});

router.delete('/:id', async (request, response) => {
    try{

        const { id } = request.params;
        const result = await Professor.findByIdAndDelete(id);

        if(!result){
            return response.status(404).json({ message: 'department and profs not found' });
        }

        return response.status(200).send({ message: 'department and profs deleted successfully' });

    } catch(e) {
        console.log(e.message);
        response.status(500).send({ message: e.message });
    }
});

export default router;