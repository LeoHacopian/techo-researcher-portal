
import {Button, TextField, MenuItem, Select} from "@mui/material";


function QForm(){
       return(
        <div className='Form'>

        <TextField
         style={{ width: "200px", margin: "5px" }}
         type="text"
         label="Question"
         variant="outlined"
        />
        <TextField
         style={{ width: "200px", margin: "5px" }}
         type="text"
         label="Answer Choices"
         variant="outlined"
        />  
        <Select
        style={{ width: "170px", margin: "5px" }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Question Type"
        >
        <MenuItem value={'Checkbox'}>Checkbox</MenuItem>
        <MenuItem value={'Button'}>Button</MenuItem>
        <MenuItem value={'NumberWheel'}>NumberWheel</MenuItem>
        </Select>

        <Button>Delete</Button>
        </div>

       )
}

export default QForm