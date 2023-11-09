import { Box, Divider, Toolbar, Typography } from '@mui/material';
import './Chart.css';

const Chart = (props) => {
  return (
    <Box sx={{ background: 'white', borderRadius: '5px' }}>
      <Toolbar sx={{ '&&': { px: '1rem', minHeight: '57px', display: 'flex', justifyContent: 'space-between' } }}>
        <Typography variant='p' fontWeight={'600'} fontSize={'0.87rem'}>{props.title}</Typography>
        {props.headerChildren}
      </Toolbar>
      <Divider />
      <Divider />
      {props.children}
    </Box>
  );
}

export default Chart;