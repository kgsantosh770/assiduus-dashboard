import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material';

function formatNumber(num) {
    let number = parseFloat(num);
    if (isNaN(number)) {
        return number;
    }

    // Convert the number to a string and split the integer and decimal parts
    const [integerPart, decimalPart] = number.toFixed(2).toString().split('.');

    // Add commas as thousands separators
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Combine the formatted integer and decimal parts
    const formattedNumber = decimalPart ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;

    return formattedNumber;
}

export default function DataTable(props) {
    const theme = useTheme();
    const { data, width } = props;

    const tableCellStyle = {
        fontSize: '0.8rem',
        py: 1.2,
        fontWeight: '500'
    }

    return (
        <TableContainer component={Paper} sx={{ width: width, boxShadow: 'none' }}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {
                            data.headers.map((value, index) =>
                                <TableCell
                                    key={index}
                                    align={index !== 0 ? 'right' : 'left'}
                                    sx={{ py: 1.5, color: theme.palette.primary.textgrey, fontSize: '0.7rem' }}
                                >
                                    {value}
                                </TableCell>
                            )
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.values.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ fontSize: '0.7rem', '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row" sx={tableCellStyle}>
                                {row.name}
                            </TableCell>
                            <TableCell align="right" sx={tableCellStyle}>{formatNumber(row.month)}</TableCell>
                            <TableCell align="right" sx={tableCellStyle}>{formatNumber(row.ytd)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}