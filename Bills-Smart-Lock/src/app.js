'use strict';

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const { App } = require('jovo-framework');
const { Alexa } = require('jovo-platform-alexa');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { JovoDebugger } = require('jovo-plugin-debugger');
const { FileDb } = require('jovo-db-filedb');

const app = new App();

app.use(
    new Alexa(),
    new GoogleAssistant(),
    new JovoDebugger(),
    new FileDb()
);


// ------------------------------------------------------------------
// APP LOGIC
// ------------------------------------------------------------------

app.setHandler({
    LAUNCH() {
        this.$speech.addText ('Welcome to Rora.  Would you like to lock your door? Check the status of your door? or unlock your door?')
        this.$reprompt.addText ('Please say, lock my door, what is the status of my door, or unlock my door to control your door lock.')
        return this.ask(this.$speech, this.$reprompt);
    },

    LockIntent() {
        let expectedLockPrompt = 'Your door is locked'
        let expectedUnlockPrompt = 'Your door is unlocked'
        let lockStatus = this.$inputs.lockStatus.value
        if (lockStatus === "lock") {
            this.$speech.addText(expectedLockPrompt)
        }   else {
            this.$speech.addText(expectedUnlockPrompt)
        }
        this.tell(this.$speech);
    },

});

module.exports.app = app;
