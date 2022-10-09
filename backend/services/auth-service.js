import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import HttpError from '../models/http-error.js';
import { User } from '../models/user.js';
import userDao from '../dao/user-dao.js';

export default () => ({
    createProfile: (email, username, password) => new Promise(async (resolve, reject) => {
        try {
            await userDao().findUserByEmail(email, false);
        } catch (err) {
            return reject(err);
        }
    
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (err) {
            return reject(new HttpError('User was not created, try again later', 500));
        }
    
        const createdUser = new User({
            email,
            username,
            password: hashedPassword,
            created_date: new Date().toISOString()
        });
    
        try {
            await userDao().saveUser(createdUser);
        } catch (err) {
            return reject(err);
        }
    
        return resolve();
    }),
    login: (email, password) => new Promise(async (resolve, reject) => {
    
        let existingUser;
        try {
            existingUser = await userDao().findUserByEmail(email, true);
        } catch (err) {
            return reject(err);
        }
    
        let isValidPassword = false;
        try {
            isValidPassword = await bcrypt.compare(password, existingUser.password);
        } catch (err) {
            return reject(new HttpError('Could not log you in, please try later', 500));
        }
    
        if (!isValidPassword) {
            return reject(new HttpError('Invalid creds', 400));
        }
    
        let token;
        let user;
        try {
            token = jwt.sign({ userId: existingUser.id, email: existingUser.email }, process.env.JWT_KEY);
            user = await userDao().findUserById(existingUser.id);
        } catch (err) {
            return reject(new HttpError('Login failed', 500));
        }
        
        return resolve({
            email: user.email,
            username: user.username,
            created_date: user.created_date,
            token
        });
    })
});
