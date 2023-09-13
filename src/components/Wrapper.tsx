type Border = 'full' | 'top' | 'bottom' | 'none';
type Color = 'dark' | 'darker' | 'light' | 'lighter' | 'secondary';

type Props = {
  backgroundColor?: Color | 'none';
  borderColor?: Color;
  children?: React.ReactNode;
  className?: string;
  border?: Border;
};

const borderGenerator = (border: Border, color: Color) => {
  let borderStyle = '';

  switch (border) {
    case 'bottom':
      borderStyle = 'border-b-4';
      break;
    case 'full':
      borderStyle = 'border-4';
      break;
    default:
    case 'none':
      break;
    case 'top':
      borderStyle = 'border-t-4';
      break;
  }
  switch (color) {
    default:
    case 'dark':
      return 'border-dark ' + borderStyle;
    case 'darker':
      return 'border-darker ' + borderStyle;
    case 'light':
      return 'border-light ' + borderStyle;
    case 'lighter':
      return 'border-lighter ' + borderStyle;
    case 'secondary':
      return 'border-secondary ' + borderStyle;
  }
};

const bgColor = (backgroundColor: Color | 'none') => {
  switch (backgroundColor) {
    case 'dark':
      return 'bg-dark';
    case 'darker':
      return 'bg-darker';
    case 'light':
      return 'bg-light';
    case 'lighter':
      return 'bg-lighter';
    default:
    case 'none':
      return 'bg-non';
    case 'secondary':
      return 'bg-secondary';
  }
};

function Wrapper({
  border = 'none',
  borderColor = 'dark',
  backgroundColor = 'none',
  children,
  className,
}: Props) {
  return (
    <div
      className={`${bgColor(backgroundColor)} ${borderGenerator(
        border,
        borderColor
      )}`}
    >
      <div
        className={`duration-300 mx-auto px-3 transition-all sm:px-8 md:px-10 md:max-w-7xl ${className}`}
      >
        {children}
      </div>
    </div>
  );
}

export default Wrapper;
