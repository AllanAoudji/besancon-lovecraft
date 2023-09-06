import Link from 'next/link';

type Props = {
  category: {
    name: string;
    title: string;
    slug: string;
  };
};

function CategoryCard({ category }: Props) {
  return (
    <Link
      className="block border-2 border-light duration-1000 px-3 py-px rounded-full text-lg text-light transition-all hover:bg-light hover:px-4 hover:text-dark"
      href={`/category/${category.slug}`}
    >
      {category.name.toLowerCase()}
    </Link>
  );
}

export default CategoryCard;
