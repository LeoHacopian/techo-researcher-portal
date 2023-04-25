import './qForm.css'

import { IconButton, Button, MenuItem, Select, TextField } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';

import React, { useState, useEffect, useRef } from 'react';

import { v4 as uuidv4 } from 'uuid';

import axios from 'axios';

import QuestionnaireTable from '../QuestionnaireTable/QuestionnaireTable';
import GenericTabPanel from '../GenericTabPanel/GenericTabPanel';

function QForm() {

  const [questionnaireName, setQuestionnaireName] = useState('');

  const [showTable, setShowTable] = useState(false);

  const tableRef = useRef(null);

  const [questions, setQuestions] = useState({
    question: [
      { id: uuidv4(), prompt: '', type: '', number: '1', answers: [{ id: uuidv4(), answer: '' }], },
    ]
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tableRef.current && !tableRef.current.contains(event.target)) {
        setShowTable(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [tableRef]);

  const toggleTable = () => {
    setShowTable((prevState) => !prevState);
  };

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

  const handleChangeInput = (id, index, event) => {
    const { name, value } = event.target;
    const updatedQuestions = questions.question.map((q) => {
      if (q.id === id) {
        if (name === 'prompt') {
          return { ...q, prompt: value };
        } else if (name === 'type') {
          return { ...q, type: value };
        } else if (name.includes('answers')) {
          const updatedAnswers = q.answers.map((a, i) => {
            if (i === index) {
              return { ...a, answer: value };
            }
            return a;
          });
          return { ...q, answers: updatedAnswers };
        }
      }
      return q;
    });
    setQuestions({ question: updatedQuestions });
  };

  const handleSubmit = () => {
    if (questionnaireName.trim() === '') {
      alert('Please enter questionnaire name');
      return;
    }
    const isComplete = questions.question.every(
      (question) =>
        question.prompt.length > 0 &&
        question.answers.length > 0 &&
        question.type.length > 0
    );
    // If any field is missing a value, prevent submission
    if (!isComplete) {
      alert('Please fill out all fields');
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
  }


  return (
    <div>

      <button onClick={toggleTable}>Preview</button>
      {showTable && (
        <div ref={tableRef}>
          <QuestionnaireTable questions={questions.question} />
        </div>
      )}


      <div className="questionnaire-container">

        <div className="wrapper">
          <div className="top-navbar">
            <TextField
              style={{ width: "200px", margin: "5px" }}
              name="name"
              type="text"
              label="Questionnaire Name"
              value={questionnaireName}
              onChange={(event) => setQuestionnaireName(event.target.value)}
            />
          </div>

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
                  <MenuItem value={'Radio Button'}>Radio Button</MenuItem>
                  <MenuItem value={'Number Wheel'}>Number Wheel</MenuItem>
                </Select>
                <Button onClick={() => handleRemoveFields(q.id)}>Delete</Button>
                <form className="qPortal">
                  {q.answers.map((answer, index) => (
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <TextField
                        key={answer.id}
                        style={{ width: "230px", margin: "5px" }}
                        name={`answers[${index}]`}
                        type="text"
                        label={`Option ${index + 1}`}
                        value={answer.answer}
                        onChange={event => handleChangeInput(q.id, index, event)}
                      />
                      <div style={{ alignSelf: "center" }}>
                        <IconButton onClick={() => handleRemoveOption(q.id, answer.id)}>
                          <ClearIcon />
                        </IconButton>
                      </div>
                    </div>
                  ))}
                  <TextField
                    style={{ width: "120px", margin: "5px" }}
                    label="Add Option"
                    onClick={() => addAnswer(q.id)}
                  />

                </form>
              </>
            )
          }))} />

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