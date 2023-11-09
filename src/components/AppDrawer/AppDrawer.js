import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoWithText from '../../assets/assiduus-logo-withtext.png';
import { NavLink } from "react-router-dom";
import './AppDrawer.css';

const AppDrawer = (props) => {
    const listButtonStyle = {
        '&&': {
            px: '1.5rem',
            py: '.75rem',
        }
    }

    const toolBarStyle = {
        '&&': {
            marginBottom: '1rem',
            px: '1.5rem',
        }
    }

    const listIconStyle = {
        '&&': {
            minWidth: 'unset',
            paddingRight: '1rem',
            color: 'black',
        }
    }

    return (
        <Drawer
            variant='permanent'
            sx={{
                width: props.drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: props.drawerWidth,
                    boxSizing: 'border-box',
                },
                '@media (max-width:992px)': {
                    display: 'none',
                  },
            }}
        >
            <Toolbar sx={toolBarStyle}>
                <img src={LogoWithText} alt="logo" height={'36px'} />
            </Toolbar>
            <List>
                {
                    props.list.map((listItem) =>
                        <ListItem key={listItem.text} disablePadding>
                            <ListItemButton
                                sx={listButtonStyle}
                                component={NavLink}
                                to={listItem.path}
                            >
                                <ListItemIcon
                                    sx={listIconStyle}
                                >
                                    {listItem.icon}
                                </ListItemIcon>
                                <ListItemText data-testid={listItem.text + 'Text'} primary={listItem.text} />
                            </ListItemButton>
                        </ListItem>
                    )
                }
            </List>
        </Drawer>
    )
}

export default AppDrawer