type Props = {
  backgroundColor?:
    | 'light'
    | 'lighter'
    | 'dark'
    | 'darker'
    | 'secondary'
    | 'none';
  children?: React.ReactNode;
  className?: string;
};

const bgColor = (
  backgroundColor:
    | 'light'
    | 'lighter'
    | 'dark'
    | 'darker'
    | 'secondary'
    | 'none'
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
    case 'secondary':
      return 'bg-secondary';
    default:
    case 'none':
      return 'bg-non';
  }
};

function Wrapper({ backgroundColor = 'none', children, className }: Props) {
  return (
    <div className={bgColor(backgroundColor)}>
      <div
        className={`duration-300 mx-auto px-6 transition-all sm:px-12 md:max-w-6xl ${className}`}
      >
        {children}
      </div>
    </div>
  );
}

export default Wrapper;
