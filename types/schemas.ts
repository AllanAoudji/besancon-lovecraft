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
    mainImage: {
      alt: string;
      metadata: ImageMetadata;
      url: string;
    };
    slug: string;
    title: string;
  };

  type Page = {
    _id: string;
    _createdAt: Date;
    body: PortableTextBlock[] | null;
    mainImage: {
      url: string;
      metadata: ImageMetadata;
      alt: string;
    } | null;
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
    mainImage: {
      url: string;
      metadata: ImageMetadata;
      alt: string;
    };
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
