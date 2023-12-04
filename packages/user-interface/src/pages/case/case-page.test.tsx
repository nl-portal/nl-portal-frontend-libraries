import {render, screen, waitForElementToBeRemoved} from '@testing-library/react';
import {
  MockCasePage,
  MockCasePageWithoutContactMoments,
  MockCasePageWithoutDocuments,
} from './case-page.mock';

describe('CasePage', () => {
  // const errorText = 'a valid phone number consists of 10 digits';
  // const inputField = () => screen.getByRole('textbox');
  // const errorTextP = () => screen.queryByText(errorText);
  // const saveButton = () => screen.getByText('Save');

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

  afterAll(() => {});

  it('should render with all elements present', async () => {
    render(MockCasePage());
    await waitForElementToBeRemoved(() => screen.getAllByLabelText('Aan het laden'));
    expect(screen.queryByText('Er zijn geen documenten gevonden')).toBeNull();
    // expect().toBeDisabled()
  });

  it('should render without any documents present', async () => {
    render(MockCasePageWithoutDocuments());
    await waitForElementToBeRemoved(() => screen.getAllByLabelText('Aan het laden'));
    screen.debug();
    expect(screen.getByText('Er zijn geen documenten.')).toBeVisible();
    expect(screen.queryByText('Er zijn geen documenten gevonden')).toBeNull();
    // expect().toBeDisabled()
  });

  it('should render without any contactmoments present', async () => {
    render(MockCasePageWithoutContactMoments());
    await waitForElementToBeRemoved(() => screen.getAllByLabelText('Aan het laden'));
    expect(screen.getByText('Documenten'));
    // expect().toBeDisabled()
  });
  // it('should give an error msg when tekst is entered as a phone number', () => {
  //   expect(errorTextP()).toBeNull();

  //   expect(inputField()).not.toBeNull();

  //   fireEvent.change(inputField(), {target: {value: 'hoiDitIsNietGeldig'}});

  //   expect(errorTextP()).toBeVisible();
  //   expect(saveButton().closest('button')).toBeDisabled();
  // });

  // it('should give an error msg when too many number are entered', () => {
  //   expect(errorTextP()).toBeNull();

  //   expect(inputField()).not.toBeNull();

  //   fireEvent.change(inputField(), {target: {value: '12345678910'}});

  //   expect(errorTextP()).not.toBeNull();
  //   expect(errorTextP()?.tagName).toEqual('P');
  //   expect(saveButton().closest('button')).toBeDisabled();
  // });

  // it('should not give an error msg when 10 numbers are entered', () => {
  //   expect(errorTextP()).toBeNull();

  //   expect(inputField()).not.toBeNull();

  //   fireEvent.change(inputField(), {target: {value: '0123456789'}});

  //   expect(errorTextP()).toBeNull();
  //   expect(saveButton().closest('button')).toBeEnabled();
  // });

  // it('should give an error msg when a special character is entered', () => {
  //   expect(errorTextP()).toBeNull();

  //   expect(inputField()).not.toBeNull();

  //   fireEvent.change(inputField(), {target: {value: '-012345678'}});

  //   expect(errorTextP()).not.toBeNull();
  //   expect(saveButton().closest('button')).toBeDisabled();
  // });
});
