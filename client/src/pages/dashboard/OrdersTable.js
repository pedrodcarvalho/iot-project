import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

import { Box, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

import { NumericFormat } from 'react-number-format';

import Dot from 'components/@extended/Dot';

function createData(studentNumber, name, course, cardId) {
  return { studentNumber, name, course, cardId };
}

const rows = [];

const getStudents = async () => {
  const token = localStorage.getItem('token');

  return await axios.get('http://localhost:5000/students', {
    headers: {
      'Authorization': token
    }
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
const setStudents = async () => {
  const students = Array.from(await getStudents());

  students.forEach((student) => {
    rows.push(createData(student.studentNumber, student.name, student.course, student.cardId));
  });
};

setStudents();

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'studentNumber',
    align: 'left',
    disablePadding: false,
    label: 'Student Number'
  },
  {
    id: 'name',
    align: 'left',
    disablePadding: true,
    label: 'Name'
  },
  {
    id: 'course',
    align: 'left',
    disablePadding: false,
    label: 'Course'
  },
  {
    id: 'cardId',
    align: 'right',
    disablePadding: false,
    label: 'Card ID'
  }
];

function OrderTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

OrderTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string
};

const Course = ({ course }) => {
  let color;
  let title;

  if (course.includes('Computer Engineering')) {
    color = 'primary';
  }
  else {
    color = 'secondary';
  }

  title = course;

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
};

Course.propTypes = {
  course: PropTypes.string
};

export default function OrderTable() {
  const [order] = useState('asc');
  const [orderBy] = useState('studentNumber');
  const [selected] = useState([]);

  const isSelected = (studentNumber) => selected.indexOf(studentNumber) !== -1;

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          sx={{
            '& .MuiTableCell-root:first-of-type': {
              pl: 2
            },
            '& .MuiTableCell-root:last-of-type': {
              pr: 3
            }
          }}
        >
          <OrderTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
              const isItemSelected = isSelected(row.studentNumber);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.studentNumber}
                  selected={isItemSelected}
                >
                  <TableCell component="th" id={labelId} scope="row" align="left">
                    <Link color="secondary" component={RouterLink} to="">
                      {row.studentNumber}
                    </Link>
                  </TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">
                    <Course course={row.course} />
                  </TableCell>
                  <TableCell align="right">
                    <NumericFormat value={row.cardId} displayType="text" />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
