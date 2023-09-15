import 'moment/locale/fr';

import moment from 'moment';
import Categories from './Categories';
import Image from 'next/image';

type Props = {
  categories?:
    | {
        name: string;
        title: string;
        slug: string;
      }[]
    | null;
  image?: Image | null;
  publishedAt?: string;
  title: string;
};

function SubPageHeader({ categories, image, publishedAt, title }: Props) {
  return (
    <div className="pb-10 sm:pb-16">
      <h2 className="font-bold text-4xl text-darker transition-all md:text-5xl lg:text-6xl">
        {title}
      </h2>
      {(!!categories ||
        (!!image && !!image.url && !!image.metadata) ||
        !!publishedAt) && (
        <div className="pt-8 sm:pt-12">
          {!!image && !!image.url && !!image.metadata && (
            <div className="overflow-hidden pb-3/5 relative">
              <Image
                alt={image.alt || title}
                blurDataURL={image.metadata.lqip}
                className="absolute duration-1000 h-full object-cover inset-0 w-full"
                height={image.metadata.dimensions.height}
                placeholder="blur"
                src={image.url}
                width={image.metadata.dimensions.width}
              />
            </div>
          )}
          {(!!categories || !!publishedAt) && (
            <div className="pt-4 text-sm sm:flex sm:items-end sm:gap-8 sm:text-base">
              {!!publishedAt && (
                <p className="text-darker">
                  Publié {moment(publishedAt).fromNow()}
                </p>
              )}
              {!!categories && (
                <Categories className="text-darker" categories={categories} />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SubPageHeader;
