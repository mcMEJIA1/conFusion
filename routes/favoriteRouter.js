const bodyParser = require('body-parser');
const { Router } = require('express');
const Favorites = require('../models/favorite');
const authenticate = require('../authenticate');
const cors = require('./cors');
const dishRouter = require('./dishRouter');

const favoriteRouter = Router();

favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ user: req.user._id })
    .populate('dishes')
    .populate('user')
    .then((favorite) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(favorite);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({user : req.user._id})
    .then((fav) => {
        if(!fav){
            Favorites.create({user:req.user._id})
            .then((fav) => {
            },
            (err) => next(err))
            .catch((err) => next(err));
        }
    },(err) => next(err))
    .catch((err) => next(err));
    Favorites.findOne({user : req.user._id})
    .then((fav) => {
        req.body.forEach((dish) => {
            if (fav.dishes.indexOf(dish._id) === -1) {
                console.log('lrctm')
                fav.dishes.push(dish._id);
            }
        })
        fav.save()
        .then((fav) => {
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(fav);
        },(err) => next(err))
    },(err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ user: req.user._id })
    .then((favorite) => {
        if (favorite !== null) {
            favorite.remove()
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(resp);
            })
        }else {
            res.statusCode = 404;
            res.setHeader('Content-Type','application/json');
            res.json({error: 'Not Found'})
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

favoriteRouter.route('/:dishId')
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ user: req.user._id })
    .then((favorite) => {
        if (favorite !== null) {
            if (favorite.dishes.indexOf(req.params.dishId) === -1) {
                favorite.dishes.push(req.params.dishId);
            }
            favorite.save()
            .then((favorite) => {
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(favorite);
            }, (err) => next(err));
        }else {
            let err = new Error('Favotites not found');
            err.status = 404;
            return next(err); 
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ user: req.user._id })
    .then((favorite) => {
        if (favorite !== null) {
            for (var i = 0; i >= favorite.dishes; i--) {
                if ()
            }
        }
    })
});

module.exports = favoriteRouter;