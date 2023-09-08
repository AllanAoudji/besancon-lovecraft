type Props = {
  backgroundColor?: 'light' | 'dark' | 'darker' | 'secondary' | 'none';
  children?: React.ReactNode;
  className?: string;
};

function Wrapper({ backgroundColor = 'none', children, className }: Props) {
  return (
    <div className={`bg-${backgroundColor}`}>
      <div
        className={`duration-300 mx-auto px-6 transition-all sm:px-12 md:max-w-6xl ${className}`}
      >
        {children}
      </div>
    </div>
  );
}

export default Wrapper;
