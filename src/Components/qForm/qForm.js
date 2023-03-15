import './qForm.css'
import { Button, MenuItem, Select, TextField } from "@mui/material";
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function QForm() {

  const [questions, setQuestions] = useState({
    question: [
      { id: uuidv4(), prompt: '', answers: [], type: '' },
    ]
  });

  const [questionnaireName, setQuestionnaireName] = useState('');

  const addQuestion = () => {
    setQuestions({
      question: [...questions.question, { id: uuidv4(), prompt: '', answers: [], type: '' },],
    });
  };

  const handleChangeInput = (id, event) => {
    const newQuestions = questions.question.map(i => {
      if (id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i;
    })
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
    console.log(JSON.stringify(questionnaire));
  }

  const handleRemoveFields = id => {
    const values = [...questions.question];
    values.splice(values.findIndex(value => value.id === id), 1);
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
            <MenuItem value={'Button'}>Button</MenuItem>
            <MenuItem value={'NumberWheel'}>NumberWheel</MenuItem>
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