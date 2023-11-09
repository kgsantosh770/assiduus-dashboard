import { useState } from "react";
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
  const [graphData, setGraphData] = useState(allGraphData);

  const handleRandomizeButton = () => {
    console.log(randomizeGraphData(graphData))
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
      fontSize: '.7rem'
    }
    const months = Object.keys(graphData.accounts.data);
    return (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
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

  return (
    <ThemeProvider theme={muiTheme}>
      <Box className="App" sx={{ display: 'flex' }}>
        <CssBaseline />
        <Navbar drawerWidth={drawerWidth} randomize={() => handleRandomizeButton()} />
        <AppDrawer list={appDrawerList} drawerWidth={drawerWidth} />
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: muiTheme.palette.primary.grey, p: 3, width: '100%' }}
        >
          <Toolbar />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', pb: 6 }}>
            <Chart
              title='Checking account'
              headerChildren={<AccountButtons />}
            >
              <LinearChart
                data={graphData.accounts.data[graphData.accounts.current]}
                width={495}
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
                width={495}
                height={240}
                yAxisSpacing={70}
              />
            </Chart>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Chart
              title='Total cash flow'
              headerChildren={<CashflowLabels />}
            >
              <BarChart
                xValues={graphData.cashflow.xValues}
                data={graphData.cashflow.data}
                width={495}
                height={240}
                yAxisSpacing={20}
              />
            </Chart>
            <Chart title="Account Watchlist">
              <DataTable data={graphData.watchlist.data} width={490} height={240} />
            </Chart>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
