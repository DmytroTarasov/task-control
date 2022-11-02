import HttpError from '../models/http-error.js';
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

});