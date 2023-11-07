import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Navbar from './Navbar'

describe('Navbar component', () => {

    beforeEach(() => {
        render(<Navbar />);
    })

    it('should render properly', () => {
        const button = screen.getByTestId('randomize-btn');
        const searchInput = screen.getByRole('searchbox');
        const notification = screen.getByTestId('NotificationsIcon');
        const profile = screen.getByRole('profilebutton');
        const arrowIcon = screen.getByTestId('ArrowDropDownIcon');
        expect(button).toBeInTheDocument();
        expect(searchInput).toBeInTheDocument();
        expect(notification).toBeInTheDocument();
        expect(profile).toBeInTheDocument();
        expect(arrowIcon).toBeInTheDocument();
    })

    it('search box should have search icon', () => {
        const searchInput = screen.getByRole('searchbox');
        const searchIcon = screen.getByTestId('SearchIcon');
        expect(searchInput).toContainElement(searchIcon);
    })
})