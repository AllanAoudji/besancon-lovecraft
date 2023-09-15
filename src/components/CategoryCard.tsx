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
      className="block duration-1000 font-bold transition-all hover:text-dark first-letter:uppercase"
      href={`/category/${category.slug}`}
    >
      {category.name.toLowerCase()}
    </Link>
  );
}

export default CategoryCard;
