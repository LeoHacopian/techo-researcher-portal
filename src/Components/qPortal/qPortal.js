import React from "react";
import {AppBar,Button} from "@mui/material";
import QForm from '../qForm/qForm.js';


export default class QPortal extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      questions: []
    };
  }
  addQuestion = () => {
    const question = (
      <QForm
        key={this.state.questions.length}
       
      />
    );
    var questions = this.state.questions.slice();
    questions.push(question);
    this.setState({ questions: questions });
  };
  render(){
    return (
        <div className='qPortal'>
            <Button id="AddButton" variant='outlined' onClick={this.addQuestion}>
                    Add question
            </Button>
            {this.state.questions}
            <Button>Submit</Button>
        </div> 
    )
  }
}

