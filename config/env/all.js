'use strict';

var path = require('path'),
	rootPath = path.normalize(__dirname + '/../..');

module.exports = {
	app: {
		title: 'BugOff',
		description: 'Track bugs',
		keywords: 'bugs, die, clean up, t'
	},
	root: rootPath,
	port: process.env.PORT || 8080,
	templateEngine: 'swig',
	sessionSecret: 'bugoff',
	sessionCollection: 'sessions'
};