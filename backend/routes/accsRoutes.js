import express from 'express';
import Accounts from '../models/accsModel.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import auth from '../middleware/auth.js';
import dotenv from 'dotenv';

dotenv.config();
const secretToken = process.env.JWT_SECRET;

const router = express.Router();

router.post('/', async (req, res) => {
    const { student_email, password } = req.body;

    try {
        const user = await Accounts.findOne({ student_email });
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ msg: 'Incorrect password' });
        }

        const token = jwt.sign({ id: user._id }, secretToken, { expiresIn: '1h' });
        // const refreshToken = jwt.sign({ id: user._id }, secretToken, { expiresIn: '7d' });

        res.json({
            token,
            user: {
                id: user._id,
                student_email: user.student_email,
                student_name: user.student_name,
                student_number: user.student_number,
                department: user.department
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/signup', async (req, res) => {
    try {
        const { student_number, student_email, student_name, department, password } = req.body;

        if (!student_number || !student_email || !student_name || !department || !password) {
            return res.status(400).json({ message: 'Send all required fields' });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newAccs = {
            student_number,
            student_email,
            student_name,
            department,
            password: hashedPassword
        };

        const accs = await Accounts.create(newAccs);
        res.status(201).json(accs);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Accounts.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: 'Account not found' });
        }

        res.status(200).json({ message: 'Account deleted successfully' });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

router.get('/current', auth, async (req, res) => {
    try {
        const authHeader = req.header("Authorization");
        const token = authHeader && authHeader.split(' ')[1]; 

        if (!token) return res.status(401).json({ msg: 'No token provided' });

        const verified = jwt.verify(token, secretToken);
        if (!verified) return res.status(401).json({ msg: 'Token is not valid' });

        const user = await Accounts.findById(verified.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        res.json({ user });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});


router.post('/tokenIsValid', async (req, res) => {
    try {
        const authHeader = req.header("Authorization");
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) return res.json(false);

        const verified = jwt.verify(token, secretToken);
        if (!verified) return res.json(false);

        const user = await Accounts.findById(verified.id);
        if (!user) return res.json(false);

        res.json(true);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const accs = await Accounts.find({});
        res.status(200).json({
            count: accs.length,
            data: accs,
        });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

export default router;
