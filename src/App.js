import { AccountBalance, AttachMoney, Contacts, Dashboard, Description, Person } from "@mui/icons-material";
import AppDrawer from "./components/AppDrawer/AppDrawer";
import Navbar from "./components/Navbar/Navbar";
import { ThemeProvider, createTheme, Box, CssBaseline, Toolbar, Typography } from "@mui/material";

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

  return (
    <ThemeProvider theme={muiTheme}>
      <Box className="App" sx={{ display: 'flex' }}>
        <CssBaseline />
        <Navbar drawerWidth={drawerWidth} />
        <AppDrawer list={appDrawerList} drawerWidth={drawerWidth} />
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: muiTheme.palette.primary.grey, p: 3 }}
        >
          <Toolbar />
          
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
