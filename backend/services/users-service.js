import userDao from '../dao/user-dao.js';

export default () => ({
    getProfileInfo: (userId) => new Promise(async (resolve, reject) => {

        let user;
        try {
            user = await userDao().findUserById(userId);
        } catch (err) {
            return reject(err);
        }
    
        return resolve({
            email: user.email,
            username: user.username,
            created_date: user.created_date
        });
    }),
    deleteProfile: (userId, role) => new Promise(async (resolve, reject) => {
        try {
            await userDao().deleteUser(userId, role);
        } catch (err) {
            return reject(err);
        }

        return resolve();
    })
});

