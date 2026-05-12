var PhotoModel = require('../models/photoModel.js');
var CommentModel = require('../models/commentModel.js');

function decayedLikes(likes, postedAt, halfLife = 1) {
    const ageInMinutes = (Date.now() - postedAt) / (1000 * 60);
    return likes * Math.exp(-Math.log(2) * ageInMinutes / halfLife);
}
/**
 * photoController.js
 *
 * @description :: Server-side logic for managing photos.
 */
module.exports = {

    /**
     * photoController.list()
     */
    list: function (req, res) {
        PhotoModel.find({ reports: { $lte: 2 } })
        .populate('postedBy')
        .sort({ postedAt: -1 })
        .exec(function (err, photos) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting photo.',
                    error: err
                });
            }
            return res.json(photos);
        });
    },
    
    listHot: function (req, res) {
        PhotoModel.find({ reports: { $lte: 2 } })
        .populate('postedBy')
        .exec(function (err, photos) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting photo.',
                    error: err
                });
            }
            
            photos = photos.map(photo => ({
                ...photo.toObject(),
                decayedLikes: decayedLikes(photo.likes, photo.postedAt)
            })).sort((a, b) => b.decayedLikes - a.decayedLikes);
            
            return res.json(photos);
        });
    },

    like: function (req, res) {
        var id = req.params.id;
    
        PhotoModel.findById(id, function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting photo.',
                    error: err
                });
            }
    
            if (!photo) {
                return res.status(404).json({
                    message: 'No such photo'
                });
            }
    
            photo.likes = photo.likes + 1;
    
            photo.save(function (err, updatedPhoto) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating photo.',
                        error: err
                    });
                }
    
                return res.json(updatedPhoto);
            });
        });
    },

    dislike: function (req, res) {
        var id = req.params.id;
    
        PhotoModel.findById(id, function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting photo.',
                    error: err
                });
            }
    
            if (!photo) {
                return res.status(404).json({
                    message: 'No such photo'
                });
            }
    
            photo.dislikes = photo.dislikes + 1;
    
            photo.save(function (err, updatedPhoto) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating photo.',
                        error: err
                    });
                }
    
                return res.json(updatedPhoto);
            });
        });
    },

    report: function (req, res) {
        var id = req.params.id;

        PhotoModel.findById(id, function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting photo.',
                    error: err
                });
            }
    
            if (!photo) {
                return res.status(404).json({
                    message: 'No such photo'
                });
            }
    
            photo.reports = photo.reports + 1;
    
            photo.save(function (err, updatedPhoto) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating photo.',
                        error: err
                    });
                }
    
                return res.json(updatedPhoto);
            });
        });
    },
    /**
     * photoController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
    
        PhotoModel.findOne({_id: id})
        .populate('postedBy')
        .populate({
            path: 'comments',
            model: 'comment',
            populate: {
                path: 'postedBy',
                model: 'user'
            }
        })
            .exec(function (err, photo) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting photo.',
                        error: err
                    });
                }
    
                if (!photo) {
                    return res.status(404).json({
                        message: 'No such photo'
                    });
                }
    
                return res.json(photo);
            });
    },


    addComment: async function (req, res) {
        var id = req.params.id;
        var commentData = {
            text: req.body.text,
            postedBy: req.body.postedBy
        };
    
        var comment = new CommentModel(commentData);
        comment.save(function (err, savedComment) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating comment',
                    error: err
                });
            }
    
            PhotoModel.findById(id, function (err, photo) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when finding photo',
                        error: err
                    });
                }
    
                if (!photo) {
                    return res.status(404).json({
                        message: 'No such photo'
                    });
                }
    
                photo.comments.push(savedComment._id);
                photo.save(function (err, updatedPhoto) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error when updating photo with new comment',
                            error: err
                        });
                    }
    
                    return res.status(201).json(savedComment);
                });
            });
        });
    },
    /**
     * photoController.create()
     */
    create: function (req, res) {
        var photo = new PhotoModel({
			name : req.body.name,
            description: req.body.description,
			path : "/images/"+req.file.filename,
			postedBy : req.session.userId,
            postedAt: req.body.postedAt,
			views : 0,
			likes : 0,
            dislikes: 0,
            reports: 0,
            comments: []
        });

        photo.save(function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating photo',
                    error: err
                });
            }

            return res.status(201).json(photo);
            //return res.redirect('/photos');
        });
    },

    /**
     * photoController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        PhotoModel.findOne({_id: id}, function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting photo',
                    error: err
                });
            }

            if (!photo) {
                return res.status(404).json({
                    message: 'No such photo'
                });
            }

            photo.name = req.body.name ? req.body.name : photo.name;
            photo.description = req.body.description ? req.body.description : photo.description;
			photo.path = req.body.path ? req.body.path : photo.path;
			photo.postedBy = req.body.postedBy ? req.body.postedBy : photo.postedBy;
            photo.postedAt = req.body.postedAt ? req.body.postedAt : photo.postedAt;
			photo.views = req.body.views ? req.body.views : photo.views;
			photo.likes = req.body.likes ? req.body.likes : photo.likes;
            photo.dislikes = req.body.dislikes ? req.body.dislikes : photo.dislikes;
            photo.reports = req.body.reports ? req.body.reports : photo.reports;
			photo.comments = req.body.comments ? req.body.comments : photo.comments;

            photo.save(function (err, photo) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating photo.',
                        error: err
                    });
                }

                return res.json(photo);
            });
        });
    },

    /**
     * photoController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        PhotoModel.findByIdAndRemove(id, function (err, photo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the photo.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    },

    publish: function(req, res){
        return res.render('photo/publish');
    }
};
