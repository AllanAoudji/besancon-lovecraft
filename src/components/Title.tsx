type Color = 'dark' | 'darker' | 'light' | 'lighter' | 'secondary';
type Size = 'large' | 'normal' | 'small';

type Props = {
  children: React.ReactNode;
  className?: string;
  color?: Color;
  size?: Size;
  type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  uppercase?: boolean;
};

const colorGenerator = (color: Color) => {
  switch (color) {
    case 'dark':
      return 'text-dark';
    default:
    case 'darker':
      return 'text-darker';
    case 'light':
      return 'text-light';
    case 'lighter':
      return 'text-lighter';
    case 'secondary':
      return 'text-secondary';
  }
};

const sizeGenerator = (size: Size, uppercase: boolean) => {
  switch (size) {
    default:
    case 'large':
      return `text-4xl ${uppercase ? 'leading-[3rem] uppercase' : ''}`;
    case 'normal':
      return `text-3xl sm:text-4xl lg-text-5xl ${
        uppercase ? 'uppercase sm:leading-[3rem]' : ''
      }`;
    case 'small':
      return `text-xl ${uppercase ? 'uppercase' : ''}`;
  }
};

const classNameGenerator = (
  className: string,
  color: Color,
  size: Size,
  uppercase: boolean
) => {
  return `font-bold ${colorGenerator(color)} ${sizeGenerator(
    size,
    uppercase
  )} ${className}`;
};

function Title({
  children,
  className = '',
  color = 'darker',
  size = 'large',
  type = 'h1',
  uppercase = false,
}: Props) {
  switch (type) {
    default:
    case 'h1':
      return (
        <h1 className={classNameGenerator(className, color, size, uppercase)}>
          {children}
        </h1>
      );
    case 'h2':
      return (
        <h2 className={classNameGenerator(className, color, size, uppercase)}>
          {children}
        </h2>
      );
    case 'h3':
      return (
        <h3 className={classNameGenerator(className, color, size, uppercase)}>
          {children}
        </h3>
      );
    case 'h4':
      return (
        <h4 className={classNameGenerator(className, color, size, uppercase)}>
          {children}
        </h4>
      );
    case 'h4':
      return (
        <h4 className={classNameGenerator(className, color, size, uppercase)}>
          {children}
        </h4>
      );
    case 'h5':
      return (
        <h5 className={classNameGenerator(className, color, size, uppercase)}>
          {children}
        </h5>
      );
    case 'h5':
      return (
        <h5 className={classNameGenerator(className, color, size, uppercase)}>
          {children}
        </h5>
      );
  }
}

export default Title;
