import { User } from "../models/user.js";
import HttpError from "../models/http-error.js";

export default () => ({
    findUserByEmail: (email, loginMode) => new Promise(async (resolve, reject) => {
        let existingUser;

        try {
            existingUser = await User.findOne({ email });
        } catch (err) {
            return reject(new HttpError('DB error occured', 500));
        }

        if (loginMode) {
            if (!existingUser) {
                return reject(new HttpError('Invalid creds', 400));
            }
        } else {
            if (existingUser) {
                return reject(new HttpError('User exists already, please login instead', 422));
            }
        }

        return resolve(existingUser);
    }),
    findUserById: (userId) => new Promise(async (resolve, reject) => {
        let user;

        try {
            user = await User.findById(userId).select('-__v');
        } catch (err) {
            return reject(new HttpError('DB error occured', 500));
        }

        if (!user) {
            return reject('User doesn`t exist', 500);
        }

        return resolve(user);
    }),
    saveUser: (user) => new Promise(async (resolve, reject) => {
        try {
            await user.save();
        } catch (err) {
            return reject(new HttpError('DB error occured', 500));
        }
        return resolve();
    })
});