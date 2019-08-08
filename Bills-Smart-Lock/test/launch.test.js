'use strict';
const { App, Util } = require('jovo-framework');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { Alexa } = require('jovo-platform-alexa');
jest.setTimeout(500);

for (const p of [new Alexa(), new GoogleAssistant()]) {
    const testSuite = p.makeTestSuite();

    describe(`PLATFORM: ${p.constructor.name} INTENTS` , () => {
        test('should return a welcome message and ask for door lock instructions at "LAUNCH"', async () => {
            const conversation = testSuite.conversation();

            const launchRequest = await testSuite.requestBuilder.launch();
            const responseLaunchRequest = await conversation.send(launchRequest);
            expect(
                responseLaunchRequest.isAsk(expectedLaunchPrompt, expectedLaunchReprompt)
            ).toBe(true);

        });
    });
}

let expectedLaunchPrompt = 'Welcome to Rora.  Would you like to lock your door? Check the status of your door? or unlock your door?'
let expectedLaunchReprompt = 'Please say, lock my door, what is the status of my door, or unlock my door to control your door lock.'

