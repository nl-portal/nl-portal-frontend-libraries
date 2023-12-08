import {render, screen, waitFor} from '@testing-library/react';
import {MockAccountPage} from './account-page.mock';

describe('AccountPage', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('should render with all elements present and show double nationality correctly', async () => {
    render(MockAccountPage());
    await waitFor(() => {
      expect(screen.getByText('Sierra')).toBeInTheDocument();
    });
    expect(screen.getByText('Nederlandse, Portugees')).toBeVisible();
  });
});
