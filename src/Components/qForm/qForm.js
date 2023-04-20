import './qForm.css'
import { Box, Typography, Tabs, Tab, Button, MenuItem, Select, TextField } from "@mui/material";
import React, { useState, useEffect, useRef} from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import QuestionnaireTable from '../QuestionnaireTable/QuestionnaireTable';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function QForm() {

  const [selectedTab, setSelectedTab] = useState(0);

  const [questionnaireName, setQuestionnaireName] = useState('');

  const [showTable, setShowTable] = useState(false);

  const tableRef = useRef(null);

  const [questions, setQuestions] = useState({
    question: [
      { id: uuidv4(), number:'1', prompt: '',  type: '' , answers: [],},
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
  
  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const toggleTable = () => {
    setShowTable((prevState) => !prevState);
  };

  const addQuestion = () => {
    setQuestions(prevState => ({
      question: [
        ...prevState.question,
        { id: uuidv4(), prompt: '', type: '', answers: [], number: prevState.question.length + 1 },
      ],
    }));
    setSelectedTab(questions.question.length);
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
    setSelectedTab(questions.question.length - 2);
  }

  return (
<div>
    <div>
      <button onClick={toggleTable}>Preview</button>
      {showTable && <div ref={tableRef}><QuestionnaireTable questions={questions.question} /></div>}
    </div>
    <form align = "center" className='qPortal'>
 
      <Button id='AddButton' variant='contained' onClick={addQuestion}>
        Add question
      </Button> <hr></hr>
      <TextField
        style={{ width: "200px", margin: "5px" }}
        name="name"
        type="text"
        label="Questionnaire Name"
        value={questionnaireName}
        onChange={event => setQuestionnaireName(event.target.value)}
      />
      
      <div className = "portalContainer"> 
      <div className = "tabsContainer">
        <Tabs orientation = "vertical" value={selectedTab} onChange={handleChangeTab}>
        {questions.question.map((q, index) => (
          <Tab key={q.id} label={`Question ${index + 1}`} /> 
        ))}
      </Tabs>
      </div>
      <div className = "questionContainer">
      {questions.question.map((q, index) => (
           <TabPanel value={selectedTab} index={index}>
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
          </TabPanel>
      ))}
      </div>
    </div>
      <Button id='SubmitButton' variant='contained' color='success' onClick={handleSubmit}>
        Submit
      </Button>
      
    </form>

    </div>
  );
}

export default QForm