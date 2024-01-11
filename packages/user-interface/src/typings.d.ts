/**
 * Default CSS definition for typescript,
 * will be overridden with file-specific definitions by rollup
 */

declare module '*.css' {
  const content: {[className: string]: string};
  export default content;
}

declare module '*.scss' {
  const content: {[className: string]: string};
  export default content;
}

declare module '*.svg' {
  import {ReactElement, SVGProps} from 'react';
  // eslint-disable-next-line no-unused-vars
  const content: (props: SVGProps<SVGElement>) => ReactElement;
  export default content;
}
