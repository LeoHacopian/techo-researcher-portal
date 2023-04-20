import './FormCreation.css'
import { Button, Box, TextField, Select, MenuItem, FormControl, InputLabel, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { Field, Form, Formik} from 'formik'
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import apiClient from '../Services/apiClient';
import * as Yup from 'yup';



const validationSchema = Yup.object().shape({
  name: Yup.string().required('Form Name is required'),
  prompt: Yup.string().required('Question is required'),
  answers: Yup.string().required('Answer is required'),
  type: Yup.string()
    .oneOf(['single', 'multiple'], 'Invalid type')
    .required('Type is required'),
});


export default function FormCreation() {
  

  const initialValues = {
    name: '',
    prompt: '',
    type: '',
    answers: '',
  }  

  const [status, setStatus] = useState(undefined)
  const [results, setResults] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [step, setStep] = useState(0);
  const [formValues, setFormValues] = useState(initialValues);
  const [formValuesArray, setFormValuesArray] = useState([initialValues]);


  useEffect(() => {
    if (step < results.length) {
      setFormValues(results[step]);
    } else {
      setFormValues({
        ...initialValues,
        name: formValues.name,
      });
    }
  }, [step]);

  // initializes the state of the forms to a default question that matches the schema
  const [questions, setQuestions] = useState([
    { id: uuidv4(), number: 1, prompt: '', type: '', answers: [] },
  ]);

  const handleDialogToggle = () => {
    setOpenDialog(!openDialog);
  };

  const handleNext = (formik) => {
    // Store the current form values
    setFormValuesArray((prev) => {
      const newFormValuesArray = [...prev];
      newFormValuesArray[step] = formik.values;
      return newFormValuesArray;
    });
  
    setStep(step + 1);
  
    // Clear all fields except 'name'
    formik.resetForm();
  };
  
  

  const handleBack = () => {
    setStep(step - 1);
  };
  
  
  

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
          initialValues={formValuesArray[step] || initialValues}
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
                helperText={formik.touched.name && formik.errors.name}
                />
                <Box height={15} />
                <Field 
                    name='prompt'
                    type="text" 
                    as={TextField} 
                    variant="outlined" 
                    color="primary" 
                    label="Question" 
                    fullWidth
                    value={formik.values.prompt}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.prompt && Boolean(formik.errors.prompt)}
                    helperText={formik.touched.prompt && formik.errors.prompt}
                />
                <Box height={15} />
                <Field 
                    name='answers'
                    type="text" 
                    as={TextField} 
                    variant="outlined" 
                    color="primary" 
                    label="Answer(s)" 
                    fullWidth
                    value={formik.values.answers}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.answers && Boolean(formik.errors.answers)}
                    helperText={formik.touched.answers && formik.errors.answers}
                />
                <Box height={15} />
                <FormControl fullWidth>
                    <InputLabel id="select-label">Type</InputLabel>
                    <Field fullWidth
                    name='type'
                    as={Select}
                    labelId={`select-label`}
                    variant="outlined"
                    color="primary"
                    label="Type"
                    value={formik.values.type}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.type && Boolean(formik.errors.type)}
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