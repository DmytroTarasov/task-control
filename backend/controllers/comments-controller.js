import commentsService from "../services/comments-service.js";

export const createComment = async (req, res, next) => {
    commentsService().createComment(req.body, req.userData.userId)
        .then(comment => res.status(201).json(comment))
        .catch(err => next(err));
}

export const deleteComment = async (req, res, next) => {
    commentsService().deletecomment(req.params.commentId)
        .then(() => res.status(200).json({ message: 'Comment was successfully deleted' }))
        .catch(err => next(err));
}

