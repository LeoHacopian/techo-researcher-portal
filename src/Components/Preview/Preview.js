
import React, { useState } from 'react';
import Slider from '@mui/material/Slider';

function Preview(props) {

  const { questionsData } = props;
  
  const [sliderValue, setSliderValue] = useState(0); // Initialize the slider value to 0

  if (!questionsData || !questionsData.questions || !questionsData.questions.question.length) {
    return <p>Empty questionnaire</p>;
  }
  return (
    <div>
      {questionsData.questions.question.map((question, index) => (
        <div key={question.id}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <p style={{ marginRight: "8px" }}>Q{index + 1} </p>
            <p>
              {question.prompt
                ? question.prompt
                : <p style={{ fontWeight: "bold" }}>Missing field: prompt</p>}
            </p>
          </div>
          {!question.type ? (
            <span style={{ marginLeft: "28px", fontWeight: "bold"}}>Missing field: question type</span>
          ) : (
            <>
              {question.type === "Checkbox" && (
                <div style={{ marginLeft: "8px" }}>
                  {question.answers.map((answer) => (
                    <div key={answer.id}>
                      <label>
                        <input type="radio" value={answer.answer} />
                        {answer.answer || <span style={{ color: 'red' }}>Empty answer field</span>}
                      </label>
                    </div>
                  ))}
                </div>
                
              )}
         {question.type === "Slider" && (
  <>
    {question.answers[0]?.answer && question.answers[1]?.answer ? (
      <>
        <div style={{ marginLeft: "30px", maxWidth: "220px" }}>
          <Slider
            value={sliderValue}
            onChange={(e, newValue) => setSliderValue(Number(newValue))}
            valueLabelDisplay="auto"
            marks
            min={Number(question.answers[0].answer)}
            max={Number(question.answers[1].answer)}
          />
        </div>
      </>
    ) : (
      <>
        {!question.answers[0]?.answer && (
          <span style={{ color: 'red' }}>Empty answer field: min value</span>
        )}
        {!question.answers[1]?.answer && (
          <>
          <br/>
          <span style={{ color: 'red' }}>Empty answer field: max value</span>
          <br/>
          </>
        )}
      </>
    )}
  </>
)}

            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default Preview;
