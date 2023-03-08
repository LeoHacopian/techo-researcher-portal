import './qPortal.css';
import { Button } from '@mui/material';
import QForm from '../qForm/qForm.js';
import { useState } from 'react';

export default function QPortal() {
  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    const question = <QForm key={questions.length} />;
    const newQuestions = [...questions, question];
    setQuestions(newQuestions);
  };

  return (
    <div className='qPortal'>
      <Button id='AddButton' variant='contained' onClick={addQuestion}>
        Add question
      </Button>
      {questions}
      <Button id='SubmitButton' variant='contained' color='success'>
        Submit
      </Button>
    </div>
  );
}
