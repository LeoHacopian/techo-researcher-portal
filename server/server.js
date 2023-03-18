require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()
const { mongoose, db } = require("./database")
const Questionnaire = require("./routes/questionnaire.route")

app.use(cors())
app.use(express.json())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/questionnaire', Questionnaire)

app.get("/", (req, res) => {
    res.send("Hello World")
})

// start the Express server
app.listen(5000, () => {
    console.log("Server started on port http://localhost:5000")
})
//test