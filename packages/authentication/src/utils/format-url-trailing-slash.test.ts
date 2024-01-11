import {formatUrlTrailingSlash} from './format-url-trailing-slash';

describe('formatUrlTrailingSlash', () => {
  it('should remove trailing slash when slash is present but not wanted', () => {
    const formattedUrl = `${formatUrlTrailingSlash('http://www.example.com/api/', false)}`;
    const lastCharacter = formattedUrl[formattedUrl.length - 1];

    expect(lastCharacter).toBe('i');
  });

  it('should keep trailing slash when slash is present and wanted', () => {
    const formattedUrl = `${formatUrlTrailingSlash('http://www.example.com/api/', true)}`;
    const lastCharacter = formattedUrl[formattedUrl.length - 1];

    expect(lastCharacter).toBe('/');
  });

  it('should add trailing slash when slash is not present but is wanted', () => {
    const formattedUrl = `${formatUrlTrailingSlash('http://www.example.com/api', true)}`;
    const lastCharacter = formattedUrl[formattedUrl.length - 1];

    expect(lastCharacter).toBe('/');
  });

  it('should not add a trailing slash when slash is not present and not wanted', () => {
    const formattedUrl = `${formatUrlTrailingSlash('http://www.example.com/api', false)}`;
    const lastCharacter = formattedUrl[formattedUrl.length - 1];

    expect(lastCharacter).toBe('i');
  });
});
