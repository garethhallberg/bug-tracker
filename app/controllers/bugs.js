'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Bug = mongoose.model('Bug'),
	_ = require('lodash');

/**
 * Create a Bug
 */
exports.create = function(req, res) {
	var bug = new Bug(req.body);
	bug.user = req.user;

	bug.save(function(err) {
		if (err) {
			return res.send('users/signup', {
				errors: err.errors,
				bug: bug
			});
		} else {
			res.jsonp(bug);
		}
	});
};

/**
 * Show the current Bug
 */
exports.read = function(req, res) {
	res.jsonp(req.bug);
};

/**
 * Update a Bug
 */
exports.update = function(req, res) {
	var bug = req.bug;

	bug = _.extend(bug, req.body);

	bug.save(function(err) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(bug);
		}
	});
};

/**
 * Delete an Bug
 */
exports.delete = function(req, res) {
	var bug = req.bug;

	bug.remove(function(err) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(bug);
		}
	});
};

/**
 * List of Bugs
 */
exports.list = function(req, res) {
	Bug.find().sort('-created').populate('user', 'displayName').exec(function(err, bugs) {
		if (err) {
			res.render('error', {
				status: 500
			});
		} else {
			res.jsonp(bugs);
		}
	});
};

/**
 * Bug middleware
 */
exports.bugByID = function(req, res, next, id) {
	Bug.findById(id).populate('user', 'displayName').exec(function(err, bug) {
		if (err) return next(err);
		if (!bug) return next(new Error('Failed to load Bug ' + id));
		req.bug = bug;
		next();
	});
};

/**
 * Bug authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.bug.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};