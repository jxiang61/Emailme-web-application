const mongoose = require('mongoose');
const _  = require('lodash');
//help us clean the passing-in url
const {Path} = require('path-parser');
const {URL} = require('url');

const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');


//the Survey Object model
const Survey = mongoose.model('surveys');

module.exports = app => {

    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('Thanks for voting!');
    });

    //this route is mainly for creating a new survey and save it to mongoDB
    //and sent out an email to users
    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        //in front end, we pass those info to req.body
        const {title, subject, content, recipients} = req.body;

        //the instance of a Survey Object
        const survey = new Survey({
            title: title,
            subject: subject,
            body: content,
            //return a list of email object
            recipients: recipients.split(',').map(email => {return {email: email.trim()}}),
            _user: req.user.id,
            dateSent: Date.now()
        })

        //after successfully sent out the email, then save the survey to DB
        //use Mailer class we just created to send surveys.
        /**
         * @survey the survey object
         * @surveyTemplate: function that returns the html content
         */
        const mailer = new Mailer(survey, surveyTemplate(survey));

        //console.log(survey);

        try {
            //call defined function send()
            await mailer.send();

            //after send the mail, save the survey;
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();

            //send the updated user to front end
            res.send(user);
        } catch(err) {
            res.status(422).send(err);
        }
    });

    //once we click, this 'click' event will be passed into the req.body, then make an request to post this route
    //in case some other types are in the req, we should clean these event in req.body (clean dirty data)
    app.post('/api/surveys/webhooks', (req, res) => {
        // map the events passed by users, then extract the 'click' event we really want
        // this aims for counting the yes/no events, some other events will be filtered out.
        const events = _.map(req.body, (event) => {
            //extract the path from url:
            //e.g. just api/id/user, without localhost:3000
            const pathname = new URL(event.url).pathname;
            //pull off the survey id and choice(yes or no)
            //p is the object we can use;
            const p = new Path('/api/surveys/:surveyId/:choice');

            //clean
            //match may be null or be an object containing surveyId and choice
            const match = p.test(pathname);
            if (match) {
                return {email: event.email, surveyId: match.surveyId, choice: match.choice}
            }
        });

        //remove all events that are undefined
        const compactEvents = _.compact(events);

        //remove duplicate events
        //in case some users clicked many times, just record one
        const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');

        //after receiving these events from users,
        //we should find the corresponding survey in DB and update it
        uniqueEvents.forEach((e) => {
            Survey.updateOne(
                //find the specific survey and recipient
                {
                    _id: e.surveyId,
                    recipients: {
                        $elemMatch: {email: e.email, responded: false}
                    }
                },
                //increment the survey's choices number and reset the recipient's info
                {
                    $inc: { [e.choice]: 1},
                    $set: {'recipients.$.responded': true},
                    lastResponded: new Date()
               }).exec(); //execute the query;
        });


        res.send({});
    });


    //poll out all surveys in DB
    app.get('/api/surveys', requireLogin, async (req, res) => {
        const surveys = await Survey
            .find({_user: req.user.id})
            .select({recipients: false}); //do not give these properties back


        res.send(surveys);
    });

};


