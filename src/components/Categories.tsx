import CategoryCard from './CategoryCard';

type Props = {
  categories:
    | {
        name: string;
        slug: string;
        title: string;
      }[]
    | null;
  className?: string;
};

function Categories({ categories, className }: Props) {
  if (!categories) {
    return null;
  }

  return (
    <div className={`border-light flex flex-wrap ${className}`}>
      {categories.map((category, index) => (
        <CategoryCard
          category={category}
          key={category.slug}
          last={index === categories.length - 1}
        />
      ))}
    </div>
  );
}

export default Categories;
