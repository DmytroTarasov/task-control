import commentsService from "../services/comments-service.js";

export const createComment = async (req, res, next) => {
    commentsService().createComment(req.body, req.userData.userId)
        .then(comment => res.status(200).json(comment))
        .catch(err => next(err));
}
