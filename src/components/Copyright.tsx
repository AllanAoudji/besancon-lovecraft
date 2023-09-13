const currentYear = new Date().getFullYear();

type Props = {
  className?: string;
};

function Copyright({ className = '' }: Props) {
  return (
    <div className={`text-xs flex flex-col text-dark lg:text-sm ${className}`}>
      <span>
        © Les Suivants de la Vouivre, {currentYear != 2023 && '2023 - '}{' '}
        {currentYear}
      </span>
      <span>
        site web:{' '}
        <a
          className="border-b-2 border-dark italic text-bold"
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
