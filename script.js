'use strict';

const Script = require('smooch-bot').Script;

module.exports = new Script({
    processing: {
        prompt: (bot) => bot.say('Beep boop...'),
        receive: () => 'processing'
    },

    start: {
        receive: (bot) => {
            return bot.say('Hi! I\'m the Donald Bot')
                .then(() => 'askfirstName');
        }
    },

    askfirstName: {
        prompt: (bot) => bot.say('What\'s your first name?'),
        receive: (bot, message) => {
            const firstName = message.text;
            return bot.setProp('firstName', firstName)
                .then(() => bot.say(`Great! I'll call you ${firstName}`))
                .then(() => 'finish');
        }
    },

    finish: {
        receive: (bot, message) => {
            return bot.getProp('firstName')
                .then((firstName) => bot.say(`Sorry ${firstName}, my creator didn't ` +
                        'teach me how to do anything else!'))
                .then(() => 'finish');
        }
    }
});
