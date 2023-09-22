type Props = {
  children?: React.ReactNode;
  className?: string;
};

function Grid({ children, className = '' }: Props) {
  return (
    <div
      className={`gap-2 grid grid-cols-6 sm:grid-cols-12 lg:gap-5 ${className}`}
    >
      {children}
    </div>
  );
}

export default Grid;
