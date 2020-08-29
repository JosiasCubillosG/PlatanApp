const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExpenseScheme = new Schema({
	createdDate: {
		default: Date.now,
		type: Date
    },
	description: {
		required: 'Please add the name.',
		type: String
    },
    value: {
        required: 'Please add the value',
        type: Number
    },
    userId: {
		type: String
	}
});

module.exports = ExpenseScheme;