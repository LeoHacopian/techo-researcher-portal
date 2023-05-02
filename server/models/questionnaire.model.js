const mongoose = require("mongoose")
/*
const QuestionSchema = new mongoose.Schema({
    number: {type: Number},
    prompt: {type: String},
    type: {type: String, enum: ["Radio Button", "Checkbox"], default: "Radio Button"},
    answers: [String]

})*/

const QuestionnaireSchema = new mongoose.Schema({
    name: {type: String, required: true},
    question: [{//array of questions
        number: {type: Number, required: true},//auto-increment?
        prompt: {type: String, required: true},
        type: {type: String, enum: ["Checkbox", "Slider"], default: "Checkbox", required: true},//input box
        answers: [String]//just pass empty query if asking for numbers? and then just limit input in front end?
        //or maybe pass "Numbers" as the only value in array, so you can have that ajs a key or something??? 
        //^^^ but then we already have "Number Wheel" as a type so we wouldn't need that
    }]
})

QuestionnaireSchema.method("toJSON", function() {
    const { __v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})

const Questionnaire = mongoose.model("Questionnaire", QuestionnaireSchema)
module.exports = Questionnaire

/*
SAMPLE INPUT:

{
    "name": "Sample Questionnaire",
    "question": [
        {"number": 1,
        "prompt": "Please enter your age",
        "type": "Number Wheel",
        "answers": []},
        {"number": 2,
        "prompt": "What do you consider to be your ethnicity?",
        "type": "Radio Button",
        "answers": ["Hispanic or Latino", "Black or African American", "White", "Asian"]},
        {"number": 3,
        "prompt": "Please Indicate Your Gender",
        "type": "Radio Button",
        "answers": ["Male", "Female", "Non-binary", "Other", "Prefer not to answer"]}
    ]
}

*/