const sendGrid = require('sendgrid');
const helper = sendGrid.mail;
const keys = require('../config/keys');

//Mailer takes in survey and its corresponding recipients and info
//then send these to all recipients
class Mailer extends helper.Mail {
    //content: the html String
    constructor(survey, content) {
        super();

        this.sendGridApi = sendGrid(keys.sendGridKey);
        this.from_email = new helper.Email('jzhsiang@gmail.com');
        this.subject = survey.subject;
        this.body = new helper.Content('text/html', content);

        //recipients here is the collection of recipients object.
        this.recipients = this.formatAddresses(survey.recipients);

        //implement thi built-in function in helper.Mail
        this.addContent(this.body);

        //track users' click. More info in official documentations
        this.addClickTracking();

        //add recipients to Mailer. More info in official documentations
        this.addRecipients();
    }

    //converts recipients' info to an array
    formatAddresses(recipients) {
        return recipients.map(({email}) => {
            return new helper.Email(email);
        })
    }

    //track users' click
    addClickTracking() {
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);
        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    addRecipients() {
        const personalize = new helper.Personalization();

        this.recipients.forEach(recipient => {
            personalize.addTo(recipient);
        });
        this.addPersonalization(personalize);
    }

    async send() {
        const request = this.sendGridApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        });

        const response = await this.sendGridApi.API(request);
        return response;
    }
}

module.exports = Mailer;
