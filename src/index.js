/**
/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, tell Hello World to say hello"
 *  Alexa: "Hello World!"
 */

/**
 * App ID for the skill
 */
var APP_ID = undefined; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * HelloWorld is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var HelloWorld = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
HelloWorld.prototype = Object.create(AlexaSkill.prototype);
HelloWorld.prototype.constructor = HelloWorld;

HelloWorld.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("HelloWorld onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

HelloWorld.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("HelloWorld onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    var speechOutput = "Welcome, I can check your appointments or remind you about your medications";
    var repromptText = "Do you want me to tell you your appointments for the day?";
    response.ask(speechOutput, repromptText);
};

HelloWorld.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("HelloWorld onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

HelloWorld.prototype.intentHandlers = {
    // register custom intent handlers
    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("I am a bad bitch! touch me in my charging port you big boi", "Oh yeaaaaa that feels good!");
    },
    "MedicationIntent": function(intent, session, response) {
        response.ask("Which medication are we talking about?", "Is it " + medications(meds));
       // HelloWorld;
    },
    "DoctorIntent": function(intent, session, response) {
        console.log(response.shouldEndSession);
        response.askWithCard("Your next appointment is on the 22nd", "YAW", "live", 'doctor');
    },
    "Pills": function(intent, session, response) {
        response.tellWithCard("smoke that shit, BITCH");
    },
    "CreateAppIntent": function(intent, session, response) {
        p = new Appointment('Billy', "here", response.date, response.Purpose)
        response.tellWithCard(p.getPurpose());
    }
    "CheckIntent": function(intent, session, response) {

    }

};
var meds =[

        "weed",
        "cocaine",
        "pot",
        "heroin",
        "lsd",
        "advil"
    ]

var appointmentsList = [

    new Appointment("Dr. Robert", "Worchester Location", "November 20th at 10 am", "Checkup"),
    new Appointment("Dr. Phill", "Burlington Location", "December 5th at 11 am ", "Questions for the Doctor"),
    new Appointment("Dr. Phill", "Burlington Location", "December 5th at 12 pm", "Personal Questions")

]

function medications(meds){
    str = "";
    for (var i in meds)
        str += meds[i] + ", ";
    return str;
}

function appointments(appointmentsList) {
    str = "";
    for(var i in appointmentsList)
        str += appointmentsList[i].toString() + ", ";
    return str;
}

function addAppointment(Patient T) {
    var docName = response.ask("Which doctor is your appointment with");
    var location = response.ask("Which location is the appointment located?");
    var time = response.ask("What is the time and Date of the appointment");
    //Do we need a way to translate the Date into a variable or no?
    var purpose = response.ask("Why are you taking this appointment");

    newAppoit = new Appointment(docName, location, time, purpose);
    T.getAppointmentList().push(newAppoit);
    appointmentsList = T.getAppointmentList();zzzazzzzszzz
}

function addMedication(Patient T) {
    var docName = response.ask("Which doctor prescribed this medication");
    var medName = response.ask("What is the name of this medication");
    var bodyPart = response.ask("What body part does this medication effect", "What would you like to nickname this medication");
    var dosageSize = response.ask("What is the dosage size");

    //There needs to be a way to parse through what we say so that Alexa can distinguish between the different times.

    // this.frequency['Monday']=monList;
    // this.frequency['Tuesday']=tueList;
    // this.frequency['Wednesday']=wedList;
    // this.frequency['Thursday']=thuList;
    // this.frequency['Friday']=friList;
    // this.frequency['Saturday']=satList;
    // this.frequency['Sunday']=sunList;

    var newMed = new Medication(docName, medName, bodyPart, dosageSize, monList, tueList, wedList, ThuList, friList, satList, sunList);
    meds.push(newMed);
    T.addMedication(newMed);

}
// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the HelloWorld skill.
    var helloWorld = new HelloWorld();
    helloWorld.execute(event, context);
};
