import './qForm.css'
import { Button, MenuItem, Select, TextField } from "@mui/material";
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

function QForm() {

  const [questions, setQuestions] = useState({
    question: [
      { id: uuidv4(), number:'1', prompt: '',  type: '' , answers: [],},
    ]
  });

  const [questionnaireName, setQuestionnaireName] = useState('');


  const addQuestion = () => {
    setQuestions(prevState => ({
      question: [
        ...prevState.question,
        { id: uuidv4(), prompt: '', type: '', answers: [], number: prevState.question.length + 1 },
      ],
    }));
  };

  const handleChangeInput = (id, event) => {
    const newQuestions = questions.question.map((i, index) => {
      if (id === i.id) {
      
        if (event.target.name === "answers") {
          i.answers = event.target.value.split(",");
        } else {
          i[event.target.name] = event.target.value;
        }
        // Update the number attribute of each question based on its index
        i.number = index + 1;
      }
      return i;
    });
    setQuestions({ question: newQuestions });
  }

  const handleSubmit = () => {
    const isComplete = questions.question.every(
      (question) =>
        question.prompt.length > 0 &&
        question.answers.length > 0 &&
        question.type.length > 0
    ) && questionnaireName.length > 0;

    // If any field is missing a value, prevent submission
    if (!isComplete) {
      alert('Please fill out all fields');
      return;
    }

    const questionsWithoutId = questions.question.map(({ id, ...rest }) => rest);
    const questionnaire = { name: questionnaireName, question: questionsWithoutId };
    console.log(JSON.stringify(questionnaire,null,1));
   
    axios.post('http://localhost:5000/questionnaire/register', questionnaire)
    .then(response => {
      console.log('Questionnaire submitted successfully:', response);
    })
    .catch(error => {
      console.error('Error submitting questionnaire:', error);
    });
    
  }
/*{
 "name": "Questionnaire1",
 "question": [
  {
   "number": 1,
   "prompt": "what is your name",
   "type": "Button",
   "answers": [
    "as",
    "dhg"
   ]
  }
 ]
}*/
  const handleRemoveFields = id => {
    const values = [...questions.question];
    const index = values.findIndex(value => value.id === id);
    const removedQuestion = values.splice(index, 1)[0];
    values.forEach((question, i) => {
      if (question.number > removedQuestion.number) {
        question.number = i + 1;
      }
    });
    setQuestions({ question: values });
  }

  return (

    <form className='qPortal'>
      <Button id='AddButton' variant='contained' onClick={addQuestion}>
        Add question
      </Button>
      <TextField
        style={{ width: "200px", margin: "5px" }}
        name="name"
        type="text"
        label="Questionnaire Name"
        value={questionnaireName}
        onChange={event => setQuestionnaireName(event.target.value)}
      />
      {questions.question.map(q => (
        <div key={q.id}>
          <TextField
            style={{ width: "200px", margin: "5px" }}
            name="prompt"
            type="text"
            label="Question"
            value={q.prompt}
            onChange={event => handleChangeInput(q.id, event)}
          />
          <TextField
            style={{ width: "200px", margin: "5px" }}
            name="answers"
            type="text"
            label="Answer Choices"
            value={q.answers}
            onChange={event => handleChangeInput(q.id, event)}
          />
          <Select
            style={{ width: "170px", margin: "5px" }}
            name="type"
            label="Question Type"
            value={q.type}
            onChange={event => handleChangeInput(q.id, event)}
          >
            <MenuItem value={'Checkbox'}>Checkbox</MenuItem>
            <MenuItem value={'Radio Button'}>Radio Button</MenuItem>
            <MenuItem value={'Number Wheel'}>Number Wheel</MenuItem>
          </Select>
          <Button onClick={() => handleRemoveFields(q.id)}>Delete</Button>
        </div>
      ))}
      <Button id='SubmitButton' variant='contained' color='success' onClick={handleSubmit}>
        Submit
      </Button>
    </form>
  );
}

export default QForm