import { Form } from '@/lib/enums';
import { StaticImageData } from 'next/image';
import { PortableTextBlock } from 'sanity';

declare global {
  type Author = {
    _id: string;
    _createdAt: Date;
    bio: PortableTextBlock[] | null;
    email: string | null;
    name: string;
    profilePicture: string | null;
  };

  type Category = {
    _id: string;
    _createdAt: Date;
    description: string | null;
    name: string;
    posts: Post[];
    slug: string;
    title: string;
  };

  type FormState = {
    state: Form;
    message?: string;
  };

  type Image = {
    alt: string | null;
    metadata: ImageMetadata | null;
    url: string | null;
  };

  type ImageMetadata = {
    hasAlpha: boolean;
    lqip: string;
    dimensions: {
      aspectRatio: number;
      height: number;
      width: number;
      _type: string;
    };
    isOpaque: boolean;
    blurHash: string;
    _type: string;
    palette: string;
  };

  type NextPost = {
    mainImage: Image;
    slug: string;
    title: string;
  };

  type Page = {
    _id: string;
    _createdAt: Date;
    body: PortableTextBlock[] | null;
    mainImage: Image;
    name: string;
    slug: string;
  };

  type Post = {
    _id: string;
    _createdAt: string;
    author: {
      name: string;
      slug: string;
      profilePicture: string | null;
    };
    body: PortableTextBlock[] | null;
    categories:
      | {
          name: string;
          title: string;
          slug: string;
        }[]
      | null;
    mainImage: Image;
    nextPost: NextPost | null;
    publishedAt: string;
    slug: string;
    title: string;
  };

  type SocialMedia = {
    name: string;
    image: StaticImageData;
    link: string;
  };
}
