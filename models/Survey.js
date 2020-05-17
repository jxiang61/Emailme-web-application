const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RecipientSchema = require('./Recipient');

const surveyScheme = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [RecipientSchema],
    yes: {
        type:Number,
        default: 0
    },
    no:{
        type: Number,
        default: 0
    },
    //set relationship with user
    _user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    dateSent: Date,
    lastResponded: Date
});

mongoose.model('surveys', surveyScheme);
