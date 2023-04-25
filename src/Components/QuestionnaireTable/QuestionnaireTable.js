import { TableCell, TableBody, TableHead, TableRow, TableContainer, Paper, Table } from '@mui/material';
import React from 'react';

function QuestionnaireTable({ questions }) {
  return (
    <TableContainer component={Paper} style={{ width: '50%', zIndex: 1, position: 'fixed' }}>
      <Table sx={{ Width: 150 }} aria-label="QuestionTable">
        <TableHead>
          <TableRow>
            <TableCell align="left">Number</TableCell>
            <TableCell align="left">Question</TableCell>
            <TableCell align="left">Answer Choices</TableCell>
            <TableCell align="left">Answer Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {questions.map((q) => (
            <TableRow key={q.id}>
              <TableCell>{q.number}</TableCell>
              <TableCell>{q.prompt}</TableCell>
              <TableCell>{q.answers.join(', ')}</TableCell>
              <TableCell>{q.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default QuestionnaireTable;
