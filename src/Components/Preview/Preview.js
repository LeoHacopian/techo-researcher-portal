import React, { useState} from 'react';
import Slider from '@mui/material/Slider';
import './Preview.css';

function renderFormField(question,sliderValue, setSliderValue) {
  switch (question.type) {
    case 'Textfield':
      return (
       <input type="text"/>
      );
    case 'Checkbox':
      return (
        <div >
          {question.answers.map((answer) => (
            <div key={answer.id}>
              <label className="label-answer">
                <input className="RadioButton-Input" type="radio" value={answer.answer} />
                {answer.answer || (
                  <span style={{ color: 'red' }}>Empty answer field</span>
                )}
              </label>
            </div>
          ))}
        </div>
      );
    case 'Slider':
      if (question.answers[0]?.answer && question.answers[1]?.answer) {
        return (
          <div style={{ marginLeft: '30px', minWidth: '180px' }}>
            <Slider
              value={sliderValue}
              onChange={(e, newValue) => setSliderValue(Number(newValue))}
              valueLabelDisplay="auto"
              marks
              min={Number(question.answers[0].answer)}
              max={Number(question.answers[1].answer)}
            />
          </div>
        );
      } else {
        return (
          <>
            {!question.answers[0]?.answer && (
              <span style={{ color: 'red' }}>Empty answer field: min value</span>
            )}
            {!question.answers[1]?.answer && (
              <>
                <br />
                <span style={{ color: 'red' }}>Empty answer field: max value</span>
                <br />
              </>
            )}
          </>
        );
      }
    default:
      return null;
  }
}

function Preview(props) {
  const { questionsData } = props;
  const [sliderValue, setSliderValue] = useState(0); // Initialize the slider value to 0

  if (!questionsData || !questionsData.questions || !questionsData.questions.question.length) {
    return <p>Empty questionnaire</p>;
  }

  return (
    <div>
    <form className='Form-Container'>
      {questionsData.questions.question.map((question, index) => (
        <div className="Question-Container" key={question.id}>
            <p>
              {question.prompt ? (
                question.prompt
              ) : (
                <span>Missing field: prompt</span>
              )}
            </p>
          {!question.type ? (
                  <span >Missing field: prompt</span>
          ) : (
            renderFormField(question, sliderValue, setSliderValue)
          )}
        </div>
      ))}
      </form>
    </div>
  );
}

export default Preview;
