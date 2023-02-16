import { SVGProps } from 'react';

const BagIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={props.width ?? 40}
    height={props.height ?? 40}
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
    className='icon glyph'
    data-testid='bag-icon'
    {...props}
  >
    <path
      d='M19.91 19.85a2 2 0 0 1-.52 1.51 2 2 0 0 1-1.47.64H6.08a2 2 0 0 1-1.47-.64 2 2 0 0 1-.52-1.51l.84-11a2 2 0 0 1 2-1.85h10.14a2 2 0 0 1 2 1.85ZM12 2a4 4 0 0 0-4 4h2a2 2 0 0 1 4 0h2a4 4 0 0 0-4-4Z'
      style={{
        fill: props.fill ?? '#000',
      }}
    />
  </svg>
);

export default BagIcon;
