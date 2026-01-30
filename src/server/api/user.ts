import express, { Request, Response } from 'express';
const router = express.Router();

// mongodb user model
import User from '@server/models/User.ts';

// SignUp
router.post('/signup', (req: Request, res: Response) => {
    console.log('Signup Router');
    let { name, email, password, dateOfBirth } = req.body;
    name = name.trim();
    email = email.trim();
    password = password.trim();
    dateOfBirth = dateOfBirth.trim();
    if (name == '' || email == '' || password == '' || dateOfBirth == '') {
        res.json({
            status: 'Failed',
            message: 'Empty input Fields!',
        });
    } else if (!/^[a-zA-z ]*$/.test(name)) {
        res.json({
            status: 'FAILED',
            message: 'Invalid name entered',
        });
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/.test(email)) {
        res.json({
            status: 'FAILED',
            message: 'Invalid Email entered',
        });
    } else if (new Date(dateOfBirth).getTime()) {
        res.json({
            status: 'FAILED',
            message: 'Invalid Date of Birth entered',
        });
    } else if (password.length < 8) {
        res.json({
            status: 'FAILED',
            message: 'Password Is too Short!',
        });
    } else {
        // Checking if user already exists
        User.find({ email })
            .then((result) => {
                if (result.length) {
                    // A user already exists
                    res.json({
                        status: 'FAILED',
                        message: 'User with the provided email already exists',
                    });
                } else {
                    // Try to create new user
                }
            })
            .catch((err) => {
                console.log(err);
                res.json({
                    status: 'FAILED',
                    message: 'An error occurred while checking for existing user!',
                });
            });
    }
});

// Sign In
router.post('/signin', (req, res) => {
    console.log('Signin Router');
});

export default router;
