'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var bugs = require('../../app/controllers/bugs');

	// Bugs Routes
	app.get('/bugs', bugs.list);
	app.post('/bugs', users.requiresLogin, bugs.create);
	app.get('/bugs/:bugId', bugs.read);
	app.put('/bugs/:bugId', users.requiresLogin, bugs.hasAuthorization, bugs.update);
	app.del('/bugs/:bugId', users.requiresLogin, bugs.hasAuthorization, bugs.delete);

	// Finish by binding the Bug middleware
	app.param('bugId', bugs.bugByID);
};