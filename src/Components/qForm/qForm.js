import './qForm.css'

import { IconButton, Button, MenuItem, Select, TextField } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';

import React, { useState, useEffect } from 'react';

import { v4 as uuidv4 } from 'uuid';

import axios from 'axios';

import GenericTabPanel from '../GenericTabPanel/GenericTabPanel';
import ErrorMessageSnackbar from '../ErrorMessageSnackbar/ErrorMessageSnackbar';

function QForm({ questionsData, setQuestionsData }) {

  const [questionnaireName, setQuestionnaireName] = useState('');

  const [openErrorMessage, setOpenErrorMessage]= useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [openSliderErrorMessage, setOpenSliderErrorMessage]= useState(false);
  const [sliderErrorMessage, setSliderErrorMessage]= useState('');

  const [questions, setQuestions] = useState({
    question: [
      { id: uuidv4(), prompt: '', type: '', number: '1', answers: [{ id: uuidv4(), answer: '' }], },
    ]
  });

  useEffect(() => {
    const updatedQuestionsData = { ...questionsData, questions: { ...questions } };
    setQuestionsData(updatedQuestionsData);

  }, [questions, setQuestionsData]);
  

  const addQuestion = () => {
    setQuestions(prevState => ({
      question: [
        ...prevState.question,
        { id: uuidv4(), prompt: '', type: '', number: prevState.question.length + 1, answers: [{ id: uuidv4(), answer: '' }] },
      ],
    }));
  };

  const addAnswer = (id) => {
    setQuestions(prevState => ({
      question: prevState.question.map(q => {
        if (q.id === id) {
          return {
            ...q,
            answers: [
              ...q.answers,
              { id: uuidv4(), answer: '' }
            ]
          };
        } else {
          return q;
        }
      })
    }));

  };

  const handleSliderRangeError = (q) => {
    if (q.type === "Slider" && q.answers[0].answer !== "" && q.answers[1].answer !== "") {
      const minValue = q.answers[0].answer;
      const maxValue = q.answers[1].answer;
  
      if (isNaN(minValue) || isNaN(maxValue)) {
        setSliderErrorMessage("Invalid slider data: input values must be numerical.");
        setOpenSliderErrorMessage(true);
        return true;
      }
      
      if (Number(minValue) > Number(maxValue)) {
        setSliderErrorMessage("Invalid slider data: minimum value is greater than maximum value.");
        setOpenSliderErrorMessage(true);
        return true;
      }
    }
    return false;
  };
  
  const handleChangeInput = (id, index, event) => {
    const { name, value } = event.target;
    const updatedQuestions = questions.question.map((q) => {
      if (q.id === id) {
        if (name === 'prompt') {
          return { ...q, prompt: value };
        } else if (name === 'type') {
          if (value === 'Slider') {
            return { ...q, type: value, answers: [{ answer: '', id: uuidv4() }, { answer: '', id: uuidv4() }] };
          }
          if (value === 'Textfield') {
            return { ...q, type: value, answers: [ ] };
          }
          return { ...q, type: value };
        } else if (name.includes('answers')) {
          const updatedAnswers = q.answers.map((a, i) => {
            if (i === index) {
              return { ...a, answer: value };
            }
            return a;
          });
          const updatedQuestion = { ...q, answers: updatedAnswers };
          if (!handleSliderRangeError(updatedQuestion)) {
            return updatedQuestion; // return the updated question only if there was no error
          }
        }
      }
      return q;
    });
    setQuestions({ question: updatedQuestions });
  };

  const checkEmptyFields = () => {
    const emptyFields = [];
  
    if(questionnaireName === ''){
      emptyFields.push('Questionnaire Name \n')
    }
    questions.question.forEach((question, questionIndex) => {
      if (question.prompt === '') {
        emptyFields.push(`Question ${questionIndex + 1} - Prompt,\n`);
      }
      if (question.type === '') {
        emptyFields.push(`Question ${questionIndex + 1} - Type,\n`);
      }
      if(!question.type === "Textfield" && question.answers.length === 0){
        emptyFields.push(`Question ${questionIndex + 1} Answers,\n`);
      }
      question.answers.forEach((answer, answerIndex) => {
        if (answer.answer === '') {
          emptyFields.push(`Question ${questionIndex + 1} - Answer ${answerIndex + 1},\n`);
        }
      });
   
    });
  
    return emptyFields;
  };
  
  
  const handleSubmit = () => {
   
    const emptyFields = checkEmptyFields();
    console.log(emptyFields.length)
    if (emptyFields.length > 0) {
      const errorMessage = `The following fields are empty: \n ${emptyFields.join(' ')}`;
      setErrorMessage(errorMessage);
      setOpenErrorMessage(true);
      console.log(openErrorMessage)
      return;
    }
    
    const questionsWithoutId = questions.question.map(({ id, ...rest }) => rest);
    const questionnaire = {
      name: questionnaireName,
      question: questionsWithoutId.map((question) => ({
        ...question,
        answers: question.answers.map((answerObj, index) => index === question.answers.length - 1 ? String(answerObj.answer) : String(answerObj.answer)),
      })),
    };

    console.log(JSON.stringify(questionnaire, null, 1));

    axios.post('http://localhost:5000/questionnaire/register', questionnaire)
      .then(response => {
        console.log('Questionnaire submitted successfully:', response);
      })
      .catch(error => {
        console.error('Error submitting questionnaire:', error);
      });

  }

  const handleRemoveFields = id => {
    const values = [...questions.question];

    if (values.length === 1) {
      return;
    }
    const index = values.findIndex(value => value.id === id);
    const removedQuestion = values.splice(index, 1)[0];
    values.forEach((question, i) => {
      if (question.number > removedQuestion.number) {
        question.number = i + 1;
      }
    });

    setQuestions({ question: values });
 
  }

  const getLabel = (q, index) => {
    if (q.type === "Slider") {
      return index === 0 ? "Min" : "Max";
    } else {
      return `Option ${index + 1}`;
    }
  }

  const handleRemoveOption = (questionId, answerId) => {
    setQuestions(prevState => ({
      question: prevState.question.map(q => {
        if (q.id === questionId) {
          return {
            ...q,
            answers: q.answers.filter(a => a.id !== answerId)
          };
        } else {
          return q;
        }
      })
    }));
  };
  return (
    <div>
       <ErrorMessageSnackbar
      open={openErrorMessage}
      message={errorMessage}
      onClose={() => setOpenErrorMessage(false)}
    />
     <ErrorMessageSnackbar
      open={openSliderErrorMessage}
      message={sliderErrorMessage}
      onClose={() => setOpenSliderErrorMessage(false)}
    />
      <div className="questionnaire-container">
        <div className="wrapper">
          <div className="top-navbar">
            <TextField
              style={{ width: "200px", margin: "5px" }}
              name="name"
              variant="standard"
              type="text"
              label="Questionnaire Name"
              value={questionnaireName}
              onChange={(event) => setQuestionnaireName(event.target.value)}
            />      
          </div>
        <div className="tabContentWrapper">
          <GenericTabPanel content={questions.question.map((q, index) => ({
            label: `Question ${index + 1}`,
            content: (
              <>
                <TextField
                  style={{ width: "350px", margin: "5px" }}
                  name="prompt"
                  type="text"
                  label="Question"
                  value={q.prompt}
                  onChange={event => handleChangeInput(q.id, index, event)}
                />
                <Select
                  style={{ width: "170px", margin: "5px" }}
                  name="type"
                  label="Question Type"
                  value={q.type}
                  onChange={event => handleChangeInput(q.id, index, event)}
                >
                  <MenuItem value={'Checkbox'}>Checkbox</MenuItem>
                  <MenuItem value={'Slider'}>Slider</MenuItem>
                  <MenuItem value={'Textfield'}>Textfield</MenuItem>
                </Select>
                <Button onClick={() => handleRemoveFields(q.id)} variant="contained" color="error">Delete</Button>
                <form className="qPortal">
                  { q.answers.map((answer, index) => (
                    <div className = "options" style={{ display: 'flex', flexDirection: 'row' }}>
                      <TextField
                        key={answer.id}
                        style={{ width: "230px", margin: "5px" }}
                        name={`answers[${index}]`}
                        type="text"
                        label={getLabel(q, index)}
                        value={answer.answer}
                        onChange={event => handleChangeInput(q.id, index, event)}
                      
                      />
                      
                      <div style={{ alignSelf: "center" }}>
                      {q.type !== "Slider" && (
                        <IconButton onClick={() => handleRemoveOption(q.id, answer.id)}>
                          <ClearIcon />
                        </IconButton>
                         )}
                      </div>
                    </div>
                  ))}
               {q.type !== "Slider" && q.type !== "Textfield" &&(
                  <TextField
                  style={{ width: "120px", margin: "5px" }}
                  label="Add Option"
                  variant="standard"
                  onClick={() => addAnswer(q.id)}
                  />
                )}
                </form>
              </>
            )
          }))} />
            </div>
          <div className="bottom-navbar">
            <Button id="AddButton" variant="contained" onClick={addQuestion}>
              Add question
            </Button>
            <Button
              id="SubmitButton"
              variant="contained"
              color="success"
              onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

}

export default QForm