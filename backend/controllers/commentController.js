var CommentModel = require('../models/commentModel.js');

/**
 * commentController.js
 *
 * @description :: Server-side logic for managing comments.
 */
module.exports = {

    /**
     * commentController.list()
     */
    list: function (req, res) {
        CommentModel.find()
        .sort({ postedAt: -1 })
        .exec(function (err, comments) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting comment.',
                    error: err
                });
            }
            return res.json(comments);
        });
    },

    /**
     * commentController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        CommentModel.findOne({_id: id}, function (err, comment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting comment.',
                    error: err
                });
            }

            if (!comment) {
                return res.status(404).json({
                    message: 'No such comment'
                });
            }

            return res.json(comment);
        });
    },

    /**
     * commentController.create()
     */
    create: function (req, res) {
        var comment = new CommentModel({
			text : req.body.text,
			commentedOn : req.body.commentedOn,
			postedBy : req.body.postedBy
        });

        photoModel.findById(req.body.photo, function(err, question) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when finding picture.',
                    error: err
                });
            }

            if (!photo) {
                return res.status(404).json({
                    message: 'Photo not found'
                });
            }

            photo.comments.push(comment._id);

            photo.save(function (err, comment) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when creating comment',
                        error: err
                    });
                }
    
                return res.status(201).json(comment);
            });
        });
    },

    /**
     * commentController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        CommentModel.findOne({_id: id}, function (err, comment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting comment',
                    error: err
                });
            }

            if (!comment) {
                return res.status(404).json({
                    message: 'No such comment'
                });
            }

            comment.text = req.body.text ? req.body.text : comment.text;
			comment.commentedOn = req.body.commentedOn ? req.body.commentedOn : comment.commentedOn;
			comment.postedBy = req.body.postedBy ? req.body.postedBy : comment.postedBy;
			comment.postedAt = req.body.postedAt ? req.body.postedAt : comment.postedAt;

            comment.save(function (err, comment) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating comment.',
                        error: err
                    });
                }

                return res.json(comment);
            });
        });
    },

    /**
     * commentController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        CommentModel.findByIdAndRemove(id, function (err, comment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the comment.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
