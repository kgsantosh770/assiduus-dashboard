import { AccountBalance, AttachMoney, Contacts, Dashboard, Description, Person } from "@mui/icons-material";
import AppDrawer from "./components/AppDrawer/AppDrawer";
import { ThemeProvider, createTheme } from "@mui/material";

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
  return (
    <ThemeProvider theme={muiTheme}>
      <div className="App">
        <AppDrawer list={appDrawerList} />
      </div>
    </ThemeProvider>
  );
}

export default App;
