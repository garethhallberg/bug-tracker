'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Bug Schema
 */
var BugSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Bug name',
		trim: true
	},
    done:{
        type: Boolean,
        default: false
    },
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Bug', BugSchema);