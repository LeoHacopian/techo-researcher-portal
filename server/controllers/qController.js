const Questionnaire = require("../models/questionnaire.model")
const async = require("async")


//gets our object but request continues
//FIXED: it was because I wasn't actually sending a response back
//fixed with res.send(results.qs)
exports.detail = (req, res, next) => {
    async.parallel(
        {
            qs(callback) {
                Questionnaire.findOne({name: req.params.name}).exec(callback)
            }
        },
        (err, results) => {
            if (err) {
              return next(err);
            }
            if (results.qs == null) {
              // No results.
              const err = new Error("Questionnaire not found");
              err.status = 404;
              return next(err);
            }
            // Successful, so send response, but what about displaying it?
            res.send(results.qs)
          }
    );
};


//create a new Questionnaire 
exports.register = async (req, res) => {
    //basic validation
    if (!req.body.name) {
        res.status(400).send({ message: "Questionnaire must have a name!"});
        return;
    }

    try {

        const questionnaire = new Questionnaire({
            name: req.body.name,
            question: req.body.question //....this was legit my issue ._. 
        })

        console.log(questionnaire);

        try {
            return await questionnaire.save()
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }

    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
/*
//create a new Questionnaire
    const questionnaire = new Questionnaire ({
        name: req.body.name,
        question: req.body.question
    })

    return await questionnaire
        .save(questionnaire)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred."
            });
        });
*/
}

/*^^^^^^^^^^^^^^^
        const number = req.body.number
        const prompt = req.body.prompt
        const type = req.body.type
        const answers = req.body.answers*/