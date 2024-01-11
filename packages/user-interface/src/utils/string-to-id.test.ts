import {stringToId} from './string-to-id';

describe('stringToId', () => {
  it('should correctly convert text strings to id', () => {
    const text = 'This is a test to convert string to id';
    const textId = stringToId(text);

    expect(textId).toBe('this-is-a-test-to-convert-string-to-id');
  });
});
