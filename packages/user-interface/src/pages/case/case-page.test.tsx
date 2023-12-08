import {render, screen, waitForElementToBeRemoved} from '@testing-library/react';
import {
  MockCasePage,
  MockCasePageWithoutContactMoments,
  MockCasePageWithoutDocuments,
} from './case-page.mock';

describe('CasePage', () => {
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

  it('should render with all elements present', async () => {
    render(MockCasePage());
    await waitForElementToBeRemoved(() => screen.getAllByLabelText('Aan het laden'));
    expect(screen.queryByText('Certificaat WWJB.pdf (pdf, 60,2 kB)')).toBeVisible();
    expect(screen.getByText('In behandeling genomen')).toBeVisible();
    expect(screen.getByText('ZAAK-2023-0000007947')).toBeVisible();
    expect(screen.getByRole('table')).toBeVisible();
    expect(screen.getByText('Dit is een sms')).toBeVisible();
    expect(screen.queryByText('Eerdere contactmomenten')).toBeVisible();
  });

  it('should render without any documents present', async () => {
    render(MockCasePageWithoutDocuments());
    await waitForElementToBeRemoved(() => screen.getAllByLabelText('Aan het laden'));
    expect(screen.queryByText('Certificaat WWJB.pdf (pdf, 60,2 kB)')).toBeNull();
    expect(screen.queryByText('Er zijn geen documenten.')).toBeVisible();
    expect(screen.queryByText('Eerdere contactmomenten')).toBeVisible();
  });

  it('should render without any contactmoments present', async () => {
    render(MockCasePageWithoutContactMoments());
    await waitForElementToBeRemoved(() => screen.getAllByLabelText('Aan het laden'));
    expect(screen.getByText('Documenten'));
    expect(screen.queryByText('Certificaat WWJB.pdf (pdf, 60,2 kB)')).toBeVisible();
    expect(screen.queryByText('Eerdere contactmomenten')).toBeNull();
  });
});
