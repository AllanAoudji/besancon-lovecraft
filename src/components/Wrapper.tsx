type Props = {
  children?: React.ReactNode;
  className?: string;
};

function Wrapper({ children, className }: Props) {
  return (
    <div
      className={`duration-300 mx-auto px-6 transition-all sm:px-12 md:max-w-6xl ${className}`}
    >
      {children}
    </div>
  );
}

export default Wrapper;
