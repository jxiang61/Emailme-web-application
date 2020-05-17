//from emailregx.com, used for validating email
const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default (emails) => {
    //trim() remove any spaces in a string
    const invalidEmailsArray = emails
        .split(',')
        .map(email => email.trim())
        .filter(email => re.test(email) === false);
    if(invalidEmailsArray.length) {
        return `Invalid emails: ${invalidEmailsArray}`;
    }

    return null;
}
