type Props = {
  backgroundColor?:
    | 'dark'
    | 'darker'
    | 'light'
    | 'lighter'
    | 'none'
    | 'secondary';
  children?: React.ReactNode;
  className?: string;
};

const bgColor = (
  backgroundColor:
    | 'dark'
    | 'darker'
    | 'light'
    | 'lighter'
    | 'none'
    | 'secondary'
) => {
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

function Wrapper({ backgroundColor = 'none', children, className }: Props) {
  return (
    <div className={bgColor(backgroundColor)}>
      <div
        className={`duration-300 mx-auto px-6 transition-all sm:px-12 md:max-w-7xl ${className}`}
      >
        {children}
      </div>
    </div>
  );
}

export default Wrapper;
