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
        response.ask("Please refer to the intruction manual for help.");
    },
    "MedicationIntent": function(intent, session, response) {
        response.ask("Which medication are we talking about?" + (medicals.length===0 ? medications(medicals): "Will that be " +medications(medicals)), "Is it " + medications(medicals));
       // HelloWorld;
    },
    "DoctorIntent": function(intent, session, response) {
        if(intent.slots.event.value-1>-1 && intent.slots.event.value-1 < appointments.length) {
            response.ask("Your "+ intent.slots.event.value +" is on " + appointments[intent.slots.event.value] + ". Is there anything else I can do for you?");
        }
        else if(appointments.length === 0) {
            response.ask("You do not have any scheduled appointments");
        } else {
            response.ask("Your closest appointment is on" + appointments[0] + ". Is there anything else i can do for you?");
        }
    },
    "Pills": function(intent, session, response) {
        if (meds.get(intent.slots.pill.value) !==null)
            response.tellWithCard("You have to take" + intent.slots.pill.value +" "+ meds.get(intent.slots.pill.value) +" times a day");
        else
            response.ask("I am sorry, I dont have that in my list. Could you tell me how often you have to take that?");
            pill = intent.slots.pill.value;
    },
    "TimesIntent": function(intent, session, response){
      if(intent.slots.number.value > -1){
        meds.put(pill, intent.slots.number.value);
        medicals.push(pill);
        response.ask("Medication was recorded, is there anything else I can do for you?");
      }else{
          response.ask("I am sorry I did not quite get that.");
      }
    },
    "CreateAppIntent": function(intent, session, response) {
        console.log(intent.slots.date.value);
        if (intent.slots.date.value) {
            appointments.push(intent.slots.date.value);
            appointments = appointments.sort();
            response.ask("Appointment created for " + intent.slots.date.value+". Is there anything else I can do for you?");
        }else{
            response.ask("I am sorry, I did not get what you said. Could you repeat that?");
        }
        //p = new Appointment('Billy', "here", response.date, response.Purpose)
        //response.tellWithCard(p.getPurpose());
    },
     "AMAZON.YesIntent": function(intent, session, response) {
        response.ask("What can I do for you?", "You can ask for anything");
     },
     "AMAZON.NoIntent": function(intent, session, response){
        response.tellWithCard("Thank you");
     }

};
// var meds =[
//     "Morphine",
//     "Adderal",
//     "Advil"
//     ]
var pill = "";
require('javascript.util');
var meds = new javascript.util.HashMap;
var medicals = []

//Needed to be filled
    // new Medication(docName, "Morphine", bodyPart, dosageSize, monList, tueList, wedList, ThuList, friList, satList, sunList),
    // new Medication(docName, "Adderal", bodyPart, dosageSize, monList, tueList, wedList, ThuList, friList, satList, sunList),
    // new Medication(docName, "Advil", bodyPart, dosageSize, monList, tueList, wedList, ThuList, friList, satList, sunList)

var appointments = []

// var appointmentsList = [

//     new Appointment("Dr. Robert", "Worchester Location", "November 20th at 10 am", "Checkup"),
//     new Appointment("Dr. Phill", "Burlington Location", "December 5th at 11 am ", "Questions for the Doctor"),
//     new Appointment("Dr. Phill", "Burlington Location", "December 5th at 12 pm", "Personal Questions")

// ]

function medications(meds){
    str = "";
    for (var i in meds)
        str += meds[i] + ", ";//dont forget to change it to a toString() method
    console.log(str);
    return str;
}

// function appointments(appointmentsList) {
//     str = "";
//     for(var i in appointmentsList)
//         str += appointmentsList[i].toString() + ", ";
//     return str;
// }

// function addAppointment(Patient T) {
//     var docName = response.ask("Which doctor is your appointment with");
//     var location = response.ask("Which location is the appointment located?");
//     var time = response.ask("What is the time and Date of the appointment");
//     //Do we need a way to translate the Date into a variable or no?
//     var purpose = response.ask("Why are you taking this appointment");

//     newAppoit = new Appointment(docName, location, time, purpose);
//     T.getAppointmentList().push(newAppoit);
//     appointmentsList = T.getAppointmentList();
// }

// function addMedication(Patient T) {
//     var docName = response.ask("Which doctor prescribed this medication");
//     var medName = response.ask("What is the name of this medication");
//     var bodyPart = response.ask("What body part does this medication effect", "What would you like to nickname this medication");
//     var dosageSize = response.ask("What is the dosage size");

//     //There needs to be a way to parse through what we say so that Alexa can distinguish between the different times.

//     // this.frequency['Monday']=monList;
//     // this.frequency['Tuesday']=tueList;
//     // this.frequency['Wednesday']=wedList;
//     // this.frequency['Thursday']=thuList;
//     // this.frequency['Friday']=friList;
//     // this.frequency['Saturday']=satList;
//     // this.frequency['Sunday']=sunList;

//     var newMed = new Medication(docName, medName, bodyPart, dosageSize, monList, tueList, wedList, ThuList, friList, satList, sunList);
//     meds.push(newMed);
//     T.addMedication(newMed);

//}
// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the HelloWorld skill.
    var helloWorld = new HelloWorld();
    helloWorld.execute(event, context);
};
