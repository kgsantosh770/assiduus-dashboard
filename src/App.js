import { useState, useEffect } from "react";
import { AccountBalance, AttachMoney, Contacts, Dashboard, Description, Person } from "@mui/icons-material";
import AppDrawer from "./components/AppDrawer/AppDrawer";
import Navbar from "./components/Navbar/Navbar";
import { ThemeProvider, createTheme, Box, CssBaseline, Toolbar, Typography } from "@mui/material";
import Chart from "./components/Chart/Chart";
import LinearChart from "./components/D3Charts/LinearChart";
import BarChart from './components/D3Charts/BarChart';
import DataTable from "./components/Chart/Table";
import DropdownButton from "./components/DropdownButton/DropdownButton";
import FileUploaderButton from "./components/FileUploaderButton/FileUploaderButton";
import { allGraphData } from "./data";
import { randomizeGraphData } from "./utils";

function App() {
  const appDrawerList = [
    {
      text: 'Dashboard',
      path: '/',
      icon: <Dashboard />
    },
    {
      text: 'Accounts',
      path: '/accounts',
      icon: <AccountBalance />
    },
    {
      text: 'Payroll',
      path: '/payroll',
      icon: <AttachMoney />
    },
    {
      text: 'Reports',
      path: '/reports',
      icon: <Description />
    },
    {
      text: 'Advisor',
      path: '/advisor',
      icon: <Person />
    },
    {
      text: 'Contacts',
      path: '/contacts',
      icon: <Contacts />
    }
  ]

  const muiTheme = createTheme({
    typography: {
      fontFamily: 'Poppins',
      text: {
        primary: '#000',
      },
    },
    palette: {
      primary: {
        main: '#55bc55',
        grey: '#f6f7f9',
        textgrey: '#9c9c9c',
      }
    },
    components: {
      MuiIcon: {
        styleOverrides: {
          root: {
            color: '#000',
          },
        },
      },
    },
  })

  const drawerWidth = 220;
  const [chartWidth, setChartWidth] = useState(window.outerWidth > 992 ? 495 : (window.outerWidth * 90) / 100);
  useEffect(() => {
    const updateDrawerSize = () => {
      const newWidth = window.outerWidth > 992 ? 495 : (window.outerWidth * 90) / 100;
      setChartWidth(newWidth)
    };
    window.addEventListener('resize', updateDrawerSize);
    return () => {
      window.removeEventListener('resize', updateDrawerSize);
    };
  }, []);


  const [graphData, setGraphData] = useState(allGraphData);

  const handleRandomizeButton = () => {
    setGraphData((prevData) => randomizeGraphData({ ...prevData }));
  }

  const changeCurrentMonth = (month) => {
    const newData = { ...graphData };
    newData.accounts.current = month;
    setGraphData(newData);
  }

  const AccountButtons = () => {
    const btnStyle = {
      border: `1px solid ${muiTheme.palette.primary.textgrey}`,
      borderRadius: '4px',
      color: 'black',
      fontSize: '.7rem',
      '@media (max-width:992px)': {
        fontSize: '.6rem',
        py: '3px',
      },
    }
    const months = Object.keys(graphData.accounts.data);
    return (
      <Box sx={{
        display: 'flex',
        gap: '1rem',
        '@media (max-width:992px)': {
          gap: '.5rem',
        },
      }}>
        <DropdownButton btnName="Manage" menuItems={[]} style={btnStyle} />
        <DropdownButton
          btnName={graphData.accounts.current}
          menuItems={months}
          style={btnStyle}
          onChange={(month) => changeCurrentMonth(month)}
        />
      </Box>
    )
  }

  const CashflowLabels = () => {
    return (
      <Box sx={{ display: 'flex', gap: '1.2rem' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '.3rem' }}>
          <Box width={14} height={14} bgcolor={muiTheme.palette.primary.main} borderRadius={0.7} />
          <Typography variant='p' sx={{ fontSize: '.8rem', fontWeight: '500' }}>In</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '.3rem' }}>
          <Box width={14} height={14} bgcolor={muiTheme.palette.primary.main} borderRadius={0.7} />
          <Typography variant='p' sx={{ fontSize: '.8rem', fontWeight: '500' }}>Out</Typography>
        </Box>
      </Box>
    )
  }

  const chartContainerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    pb: 6,
    '@media (max-width:992px)': {
      flexDirection: 'column',
      pb: 0,
    },
  }

  return (
    <ThemeProvider theme={muiTheme}>
      <Box className="App" sx={{
        display: 'flex', '@media (max-width:992px)': {
          overflow: 'hidden',
        },
      }}>
        <CssBaseline />
        <Navbar drawerWidth={drawerWidth} randomize={() => handleRandomizeButton()} />
        <AppDrawer list={appDrawerList} drawerWidth={drawerWidth} />
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: muiTheme.palette.primary.grey, p: 3, width: '100%' }}
        >
          <Toolbar />
          <Box sx={chartContainerStyle}>
            <Chart
              title='Checking account'
              headerChildren={<AccountButtons />}
            >
              <LinearChart
                data={graphData.accounts.data[graphData.accounts.current]}
                width={chartWidth}
                height={240}
              />
            </Chart>
            <Chart
              title='Invoices owned to you'
              headerChildren={<FileUploaderButton btnName="New Sales Invoice" />}
            >
              <BarChart
                xValues={graphData.invoice.xValues}
                data={graphData.invoice.data}
                width={chartWidth}
                height={240}
                yAxisSpacing={70}
              />
            </Chart>
          </Box>
          <Box sx={chartContainerStyle}>
            <Chart
              title='Total cash flow'
              headerChildren={<CashflowLabels />}
            >
              <BarChart
                xValues={graphData.cashflow.xValues}
                data={graphData.cashflow.data}
                width={chartWidth}
                height={240}
                yAxisSpacing={20}
              />
            </Chart>
            <Chart title="Account Watchlist">
              <DataTable data={graphData.watchlist.data} width={chartWidth - 10} height={240} />
            </Chart>
          </Box>
        </Box>
      </Box>
    </ThemeProvider >
  );
}

export default App;
