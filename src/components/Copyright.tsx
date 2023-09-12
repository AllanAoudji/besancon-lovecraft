const currentYear = new Date().getFullYear();

type Props = {
  className?: string;
};

function Copyright({ className = '' }: Props) {
  return (
    <div className={`flex flex-col text-md text-dark ${className}`}>
      <span>
        © Les Suivants de la Vouivre, {currentYear != 2023 && '2023 - '}{' '}
        {currentYear}
      </span>
      <span>
        site web:{' '}
        <a
          className="text-bold border-b-2 border-dark italic"
          target="_blank"
          href="https://allan-aoudji.vercel.app/"
        >
          Allan Aoudji
        </a>
      </span>
    </div>
  );
}

export default Copyright;
