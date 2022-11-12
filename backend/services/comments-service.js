import commentDao from '../dao/comment-dao.js';
import { Comment } from '../models/comment.js';

export default () => ({
    createComment: (comment, userId) => new Promise(async (resolve, reject) => {
        const newComment = new Comment({
            ...comment,
            created_at: new Date().toISOString(),
            created_by: userId
        });

        try {
            await commentDao().saveComment(newComment);
        } catch (err) {
            return reject(err);
        }
        return resolve(newComment);
    }),
    deletecomment: (id) => new Promise(async (resolve, reject) => {
        try {
            await commentDao().deleteComment(id);
        } catch (err) {
            return reject(err);
        }
        return resolve();
    })
});