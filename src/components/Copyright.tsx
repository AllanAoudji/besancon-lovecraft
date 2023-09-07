const currentYear = new Date().getFullYear();

type Props = {
  className?: string;
};

function Copyright({ className = '' }: Props) {
  return (
    <div className={`flex flex-col text-sm ${className}`}>
      <span>
        © Besançon Lovecraft, {currentYear != 2023 && '2023 - '} {currentYear}
      </span>
      <span>site web: Allan Aoudji</span>
    </div>
  );
}

export default Copyright;
