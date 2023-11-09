import { Box, Divider, Toolbar, Typography } from '@mui/material';
import './Chart.css';

const Chart = (props) => {
  return (
    <Box sx={{
      background: 'white',
      borderRadius: '5px',
      '@media (max-width:992px)': {
        mb: 3,
      },
    }}>
      <Toolbar sx={{ '&&': { px: '1rem', minHeight: '57px', display: 'flex', justifyContent: 'space-between' } }}>
        <Typography
          variant='p'
          sx={{
            fontWeight: '600',
            fontSize: '0.87rem',
            '@media (max-width:992px)': {
              fontSize: '0.7rem',
            },
          }}
        >{props.title}</Typography>
        {props.headerChildren}
      </Toolbar>
      <Divider />
      <Divider />
      {props.children}
    </Box>
  );
}

export default Chart;