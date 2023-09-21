import Link from 'next/link';

type Props = {
  category: {
    name: string;
    title: string;
    slug: string;
  };
  last?: boolean;
};

function CategoryCard({ category, last = true }: Props) {
  return (
    <>
      <Link
        className="block border-darker font-bold relative transition-all first-letter:uppercase after:bg-darker after:absolute after:h-0.5 after:w-0 after:bottom-0 after:right-0 hover:after:w-full hover:after:right-auto hover:after:left-0 after:transition-all after:duration-300"
        href={`/category/${category.slug}`}
      >
        {category.name.toLowerCase()}
      </Link>
      {!last && <span>,&nbsp;</span>}
    </>
  );
}

export default CategoryCard;
