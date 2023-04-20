import './FormCreation.css'
import { Button, Box, TextField, Select, MenuItem, FormControl, InputLabel, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { Field, Form, Formik, useFormikContext} from 'formik'
import {object, string} from 'yup'
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import apiClient from '../Services/apiClient';
import * as Yup from 'yup';



const validationSchema = Yup.object().shape({
  name: Yup.string().required("Form Name is required"),
  questions: Yup.array().of(Yup.object().shape({
    prompt: Yup.string().required("Question prompt is required"),
    type: Yup.string().required("Question type is required"),
    answer: Yup.array().of(Yup.string().required("Answer is required")).min(2, "At least 2 answers are required"),
  })),
});

export default function FormCreation() {

  const initialValues = {
    name: '',
    questions: '',
    prompt: '',
    type: '',
    answer: [],
  }

  const [status, setStatus] = useState(undefined)
  const [results, setResults] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);




  // initializes the state of the forms to a default question that matches the schema
  const [questions, setQuestions] = useState([
    { id: uuidv4(), number: 1, prompt: '', type: '', answers: [] },
  ]);

  const handleDialogToggle = () => {
    setOpenDialog(!openDialog);
  };
  
  

  // initializes the state of the forms name to an empty string
  const [formsName, setFormsName] = useState('');

  // const addQuestion = () => {
  //   setQuestions(prevState => ({
  //     question: [
  //       ...prevState.question,
  //       { id: uuidv4(), prompt: '', type: '', answers: [], number: prevState.question.length + 1 },
  //     ],
  //   }));
  // };

  // const handleChangeInput = (event) => {
  //   const newQuestions = questions.question.map((i, index) => {
  //     if (i.id === event.target.id) { // Use event.target.id instead of id
  //       if (event.target.name === "answers") {
  //         i.answers = event.target.value.split(",");
  //       } else {
  //         i[event.target.name] = event.target.value;
  //       }
  //       i.number = index + 1; // Update the question number based on its index
  //     }
  //     return i;
  //   });
  //   setQuestions({ question: newQuestions });
  // }

  // const handleSubmit = async (event) => {

  //   const questionsWithoutId = questions.question.map(({ id, ...rest }) => rest);
  //   const forms = { name: formsName, question: questionsWithoutId };
    
  //   const {data, error} = await apiClient.register(forms);
  //   if (data !== null) {
  //     setStatus(true)
  //   } else if (error !== null) {
  //     console.log(error)
  //     setStatus(false)
  //   }
    
  // };

  const handleNext = (formik) => {
    console.log('formik.values:', formik.values);
    const newResults = [...results, formik.values];
    setResults(newResults);
    formik.resetForm({ values: initialValues });
  };
  

  const handleBack = (formik) => {
    const newResults = results.slice(0, -1);
    setResults(newResults);
    formik.resetForm({ values: initialValues });

  }
  

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    
    // Flatten the answers array for each question
    const flattenedQuestions = questions.map((q) => {
      const flattenedAnswers = q.answers.flat();
      console.log('flattenedAnswers:', flattenedAnswers);
      return {
        ...q,
        answers: flattenedAnswers,
      };
    });
    console.log('flattenedQuestions:', flattenedQuestions);
  
    const questionnaire = {
      name: values.name,
      question: flattenedQuestions,
    };

    console.log('questionnaire:', JSON.stringify(questionnaire, null, 2));

  
    try {
      const { data } = await apiClient.register(questionnaire);
      console.log('response data:', data);
      if (data) {
        setStatus(true);
        resetForm();
        setQuestions([{ id: uuidv4(), number: 1, prompt: '', type: '', answers: [] }]);
      }
    } catch (error) {
      console.log(error);
      setStatus(false);
    } finally {
      setSubmitting(false);
    }
  };
  
  

  return (
    <div className="Form-Container fixed" style={{ position: 'sticky' }}>
      <Formik 
        initialValues={initialValues}
        validationSchema={validationSchema} 
        onSubmit={handleSubmit}
        >
        {(formik) => (
          <Form>
            <Field 
              name="name" 
              type="text" 
              as={TextField} 
              variant="outlined" 
              color="primary" 
              label="Form Name" 
              fullWidth
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helpertext={formik.touched.name && formik.errors.name}
              />
            <Box height={15} />
            {questions.map((q, index) => (
              <div key={q.id}>
                <Field 
                  name={`questions[${index}].prompt`}
                  type="text" 
                  as={TextField} 
                  variant="outlined" 
                  color="primary" 
                  label="Question" 
                  fullWidth
                  value={q.prompt}
                  onChange={(event) => {
                    formik.handleChange(event);
                    const newQuestions = [...questions];
                    newQuestions[index].prompt = event.target.value;
                    setQuestions(newQuestions);
                    console.log('questions:', newQuestions);
                  }}
                  onBlur={formik.handleBlur}
                  error={formik.touched.questions?.[index]?.prompt && Boolean(formik.errors.questions?.[index]?.prompt)}
                  helpertext={formik.touched.questions?.[index]?.prompt && formik.errors.questions?.[index]?.prompt}
                />
                <Box height={15} />
                <Field 
                  name={`questions[${index}].answers`}
                  type="text" 
                  as={TextField} 
                  variant="outlined" 
                  color="primary" 
                  label="Answer(s)" 
                  fullWidth
                  value={q.answers.join(", ")}
                  onChange={(event) => {
                    formik.handleChange(event);
                    const newQuestions = [...questions];
                    newQuestions[index].answers = event.target.value.split(/,\s*/);
                    setQuestions(newQuestions);
                  }}
                  onBlur={formik.handleBlur}
                  error={formik.touched.questions && Boolean(formik.errors.questions)}
                  helpertext={formik.touched.questions && formik.errors.questions}
                />
                <Box height={15} />
                <FormControl fullWidth>
                  <InputLabel id="select-label">Type</InputLabel>
                  <Field fullWidth
                    name={`questions[${index}].type`}
                    as={Select}
                    labelId={`select-label-${q.id}`}
                    variant="outlined"
                    color="primary"
                    label="Type"
                    value={q.type}
                    onChange={(event) => {
                      formik.handleChange(event);
                      const newQuestions = [...questions];
                      newQuestions[index].type = event.target.value;
                      setQuestions(newQuestions);
                    }}
                    onBlur={formik.handleBlur}
                    error={formik.touched.questions && Boolean(formik.errors.questions)}
                    helpertext={formik.touched.questions && formik.errors.questions}
                  >
                    <MenuItem value={'Checkbox'}>Checkbox</MenuItem>
                    <MenuItem value={'Radio Button'}>Radio Button</MenuItem>
                    <MenuItem value={'Number Wheel'}>Number Wheel</MenuItem>
                  </Field>
                </FormControl>
                <Box height={20} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button variant='contained' color='primary' onClick={() => handleBack(formik)}>Back</Button>
                  <Button variant='contained' color='primary' onClick={() => handleNext(formik)}>Next</Button>
                </div>
                <Button style={{ 
                  position: 'fixed', 
                  bottom: 0, 
                  right: 0, 
                  margin: '1rem' 
                  }}
                  type="submit" 
                  variant='contained' 
                  color='primary' 
                  size='large' 
                  disabled={formik.isSubmitting}>Submit</Button>
                <Button style={{
                  position: 'fixed',
                  bottom: 0,
                  left: 0,
                  margin: '1rem'
                }} variant="contained" color="primary" onClick={handleDialogToggle}>
                  Review Questions
                </Button>
              </div>
            ))}
          </Form>
        )}
      </Formik>
      <Dialog open={openDialog} onClose={handleDialogToggle}>
        <DialogTitle>Review Questions</DialogTitle>
        <DialogContent>
          {questions.map((q, index) => (
            <DialogContentText key={q.id}>
              <strong>Question {index + 1}:</strong> {q.prompt}
              <br />
              <strong>Answers:</strong> {q.answers.join(", ")}
              <br />
              <strong>Type:</strong> {q.type}
              <br />
            </DialogContentText>
          ))}
        </DialogContent>
        <DialogActions>
          <Box display="flex" justifyContent="center" width="100%">
            <Button onClick={handleDialogToggle} variant="contained" color="primary">
              Close
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  )
}