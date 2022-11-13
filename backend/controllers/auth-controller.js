import authService from '../services/auth-service.js';

export const createProfile = async (req, res, next) => {
    const { email, username, password } = req.body;

    authService().createProfile(email, username, password)
        .then(() => res.status(200).json({ message: 'Profile was created successfully' }))
        .catch(err => next(err));
}

export const login = async (req, res, next) => {
    const { email, password } = req.body;

    authService().login(email, password)
        .then(data => res.status(200).json(data))
        .catch(err => next(err));
}