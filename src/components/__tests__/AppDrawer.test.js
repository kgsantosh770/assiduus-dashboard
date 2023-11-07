import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import AppDrawer from '../AppDrawer/AppDrawer';
import { AccountBalance, AttachMoney, Dashboard } from "@mui/icons-material";
import { BrowserRouter } from 'react-router-dom';


describe('App Drawer', () => {
    const appDrawerList = [
        {
            text: 'Dashboard',
            path: '/',
            icon: <Dashboard />
        },
        {
            text: 'Accounts',
            path: '/',
            icon: <AccountBalance />
        },
        {
            text: 'Payroll',
            path: '/',
            icon: <AttachMoney />
        },
    ]

    beforeEach(() => {
        render(
            <BrowserRouter>
                <AppDrawer list={appDrawerList} />
            </BrowserRouter>
        );
    })

    it('should render properly', () => {
        const firstListText = screen.getByText(appDrawerList[0].text);
        expect(firstListText).toBeInTheDocument();
    })

    it('should have links equal to list items length', () => {
        const drawerButtons = screen.getAllByRole('link');
        expect(drawerButtons.length).toBe(appDrawerList.length);
    })

    it('links should have icon and text', () => {
        const icon = screen.getByTestId('DashboardIcon');
        const text = screen.getByTestId('DashboardText');
        expect(icon).toBeInTheDocument();
        expect(text).toBeInTheDocument();
    })

    it('should have all icons and texts from the list items', () => {
        const svgs = ['DashboardIcon', 'AccountBalanceIcon', 'AttachMoneyIcon'].map((testId) => screen.getByTestId(testId));
        expect(svgs.length).toEqual(appDrawerList.length);
    })

    it('should have all texts from the list items', () => {
        const texts = appDrawerList.map((listItem) => screen.getByText(listItem.text));
        expect(texts.length).toEqual(appDrawerList.length);
    })

    it('first link should have the class active by default', () => {
        const firstLink = screen.getAllByRole('link')[0];
        expect(firstLink).toHaveClass('active');
    })
})