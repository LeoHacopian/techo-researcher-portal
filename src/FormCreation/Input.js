// import './Input.css'
// import { Button, MenuItem, Select, TextField } from "@mui/material";

// export default function Input() {
//     <div>
//         <TextField
//             style={{ width: "200px", margin: "5px" }}
//             name="prompt"
//             type="text"
//             label="Question"
//             value={q.prompt}
//             onChange={event => handleChangeInput(q.id, event)}
//         />
//         <TextField
//             style={{ width: "200px", margin: "5px" }}
//             name="answers"
//             type="text"
//             label="Answer Choices"
//             value={q.answers}
//             onChange={event => handleChangeInput(q.id, event)}
//         />
//         <Select
//             style={{ width: "170px", margin: "5px" }}
//             name="type"
//             label="Question Type"
//             value={q.type}
//             onChange={event => handleChangeInput(q.id, event)}
//             position='Sticky'
//         >
//             <MenuItem value={'Checkbox'}>Checkboxes</MenuItem>
//             <MenuItem value={'Radio Button'}>Radio Buttons</MenuItem>
//             <MenuItem value={'Number Wheel'}>Number Wheel</MenuItem>
//         </Select>
//         <Button id='DeleteButton' variant='contained' color='error' onClick={() => handleRemoveFields(q.id)}>Delete</Button>
//     </div>
// }