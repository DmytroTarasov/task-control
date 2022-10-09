import mongoose from "mongoose";
import Joi from "joi";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    created_date: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

const validateUserRegister = (user) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        username: Joi.string().required(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(user);
}

const validateUserLogin = (user) => {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    });
    return schema.validate(user);
}

export { User, validateUserRegister, validateUserLogin };