import { groq } from 'next-sanity';
import { getCachedClient } from './lib/getClient';

// ---------------------------------
// Author
// ---------------------------------
// Get all authors
const authorsQuery = groq`*[_type == "author" && slug.current > $lastSlug] | order(slug.current) [0...30] {
  _id,
  _createdAt,
  bio,
  email,
  name,
  "profilePicture": profilePicture.asset->url,
  "slug": slug.current,
}`;
export const getAuthors = (lastSlug: string) =>
  getCachedClient()<Author[]>(authorsQuery, { lastSlug });

// Get a single author by its slug
const authorQuery = groq`*[_type == "author" && slug.current == $slug][0] {
  _id,
  _createdAt,
  bio,
  email,
  name,
  "profilePicture": profilePicture.asset->url,
  "slug": slug.current,
}`;
export const getAuthor = (slug: string) =>
  getCachedClient()<Author>(authorQuery, { slug });

// ---------------------------------
// Category
// ---------------------------------
// Get all categories
const categoriesQuery = groq`*[_type == "category" && slug.current > $lastSlug] | order(slug.current) [0...15] {
  _id,
  _createdAt,
  description,
  name,
  title,
  "posts": *[
    _type == "post" &&
    ^.slug.current in categories[]->slug.current &&
    publishedAt <= $now &&
    (publishedAt > $lastPostPublishedAt ||
    (publishedAt == $lastPostPublishedAt && slug.current > $lastPostSlug))
  ] | order(publishedAt, slug.current) [0...15]{
    _id,
    _createdAt,
    body,
    publishedAt,
    title,
    "author": {
      "name": author->name,
      "profilePicture": author->profilePicture.asset->url,
      "slug": author->slug.current,
    },
    "categories": categories[]->{
      "slug": slug.current,
      title,
    },
    "mainImage" : {
      "alt": mainImage.alt,
      "metadata": mainImage.asset->metadata,
      "url": mainImage.asset->url,
    },
    "slug": slug.current,
  },
  "slug": slug.current,
}`;
export const getCategories = (
  lastSlug: string,
  lastPostPublishedAt: Date,
  lastPostSlug: string
) => {
  const now = new Date().toISOString();
  return getCachedClient()<Category[]>(categoriesQuery, {
    lastPostPublishedAt,
    lastPostSlug,
    lastSlug,
    now,
  });
};

// Get a single category by its slug
const categoryQuery = groq`*[_type == "category" && slug.current == $slug][0] {
  _id,
  _createdAt,
  description,
  name,
  title,
  "posts": *[
    _type == "post" &&
    ^.slug.current in categories[]->slug.current &&
    publishedAt <= $now &&
    (publishedAt > $lastPublishedAt ||
    (publishedAt == $lastPublishedAt && slug.current > $lastPostSlug))
  ] | order(publishedAt, slug.current) [0...15]{
    _id,
    _createdAt,
    body,
    publishedAt,
    title,
    "author": {
      "name": author->name,
      "profilePicture": author->profilePicture.asset->url,
      "slug": author->slug.current,
    },
    "categories": categories[]->{
      title,
      "slug": slug.current,
    },
    "slug": slug.current,
    "mainImage" : {
      "alt": mainImage.alt,
      "metadata": mainImage.asset->metadata,
      "url": mainImage.asset->url,
    },
  },
  "slug": slug.current,
}`;
export const getCategory = (
  slug: string,
  lastPublishedAt: Date,
  lastPostSlug: string
) => {
  const now = new Date().toISOString();
  return getCachedClient()<Category>(categoryQuery, {
    lastPublishedAt,
    lastPostSlug,
    now,
    slug,
  });
};

// ---------------------------------
// Page
// ---------------------------------
// Get all pages
const pagesQuery = groq`*[_type == "page"] | order(order asc) [0...15] {
  _id,
  _createdAt,
  body,
  name,
  "mainImage": {
    "alt": mainImage.alt,
    "metadata": mainImage.asset->metadata,
    "url": mainImage.asset->url,
  },
  "slug": slug.current,
}`;
export const getPages = () => getCachedClient()<Page[]>(pagesQuery);

// Get a page by its slug
const pageQuery = groq`*[_type == "page" && slug.current == $slug][0] {
  _id,
  _createdAt,
  body,
  name,
  "mainImage": {
    "alt": mainImage.alt,
    "metadata": mainImage.asset->metadata,
    "url": mainImage.asset->url,
  },
  "slug": slug.current,
}`;
export const getPage = (slug: string) =>
  getCachedClient()<Page>(pageQuery, { slug });

// ---------------------------------
// Post
// ---------------------------------
// Get all posts
const postsQuery = groq`*[
  _type == "post" &&
  publishedAt <= $now &&
  slug.current != $not &&
  (publishedAt < $lastPublishedAt ||
  (publishedAt == $lastPublishedAt && slug.current < $lastSlug))
] | order(publishedAt desc, slug.current asc) [0...$query] {
  _id,
  _createdAt,
  body,
  publishedAt,
  title,
  "nextPost": *[
    _type == "post" &&
    publishedAt <= $now &&
    (publishedAt < ^.publishedAt ||
    (publishedAt == ^.publishedAt && slug.current < ^.slug.current))
  ] | order(publishedAt, slug.current) [0]{
    title,
    "mainImage": {
      "alt": mainImage.alt,
      "metadata": mainImage.asset->metadata,
      "url": mainImage.asset->url,
    },
    "slug": slug.current,
  },
  "author": {
    "name": author->name,
    "profilePicture": author->profilePicture.asset->url,
    "slug": author->slug.current,
  },
  "categories": categories[]->{
    name,
    title,
    "slug": slug.current,
  },
  "mainImage" : {
    "alt": mainImage.alt,
    "metadata": mainImage.asset->metadata,
    "url": mainImage.asset->url,
  },
  "slug": slug.current,
}`;
export const getPosts = (
  lastPublishedAt: string,
  lastSlug: string,
  options?: { numToFetch?: number; not?: string }
) => {
  const query = options?.numToFetch ? options.numToFetch : 12;
  const now = new Date().toISOString();
  const not = options?.not ?? '';
  return getCachedClient()<Post[]>(postsQuery, {
    lastPublishedAt,
    lastSlug,
    now,
    query,
    not,
  });
};

// Get all posts filtered by category
const postsByCategoryQuery = groq`*[
  _type == "post" &&
  $categorySlug in categories[]->slug.current &&
  (publishedAt < $lastPublishedAt ||
  (publishedAt == $lastPublishedAt && slug.current > $lastSlug))
] | order(publishedAt, slug.current) [0...15] {
  _id,
  _createdAt,
  body,
  title,
  publishedAt,
  "slug": slug.current,
  "nextPost": *[
    _type == "post" &&
    publishedAt <= $now &&
    (publishedAt < ^.publishedAt ||
    (publishedAt == ^.publishedAt && slug.current > ^.slug.current))
  ] | order(publishedAt, slug.current) [0] {
    title,
    "mainImage": {
      "alt": mainImage.alt,
      "metadata": mainImage.asset->metadata,
      "url": mainImage.asset->url,
    },
    "slug": slug.current,
  },
  "author": {
      "name": author->name,
      "profilePicture": author->profilePicture.asset->url,
      "slug": author->slug.current,
  },
  "categories": categories[]->{
      "slug": slug.current,
      name,
      title,
  },
  "mainImage" : {
      "alt": mainImage.alt,
      "metadata": mainImage.asset->metadata,
      "url": mainImage.asset->url,
  },
}`;
export const getPostsByCategory = (
  lastPublishedAt: string,
  lastSlug: string,
  categorySlug: string
) => {
  const now = new Date().toISOString();
  return getCachedClient()<Post[]>(postsByCategoryQuery, {
    categorySlug,
    lastPublishedAt,
    lastSlug,
    now,
  });
};

// Get a single post by its slug
const postQuery = groq`*[_type == "post" && slug.current == $slug && publishedAt <= $now][0] { 
    _id,
    _createdAt,
    body,
    title,
    publishedAt,
    "nextPost": *[
      _type == "post" &&
      publishedAt <= $now &&
      (publishedAt < ^.publishedAt ||
      (publishedAt == ^.publishedAt && slug.current > ^.slug.current))
    ] | order(publishedAt desc, slug.current) [0]{
      title,
      "mainImage": {
        "alt": mainImage.alt,
        "metadata": mainImage.asset->metadata,
        "url": mainImage.asset->url,
      },
      "slug": slug.current,
    },
    "slug": slug.current,
    "author": {
        "name": author->name,
        "slug": author->slug.current,
    },
    "categories": categories[]->{
        "slug": slug.current,
        name,
        title,
    },
    "mainImage" : {
      "alt": mainImage.alt,
      "metadata": mainImage.asset->metadata,
      "url": mainImage.asset->url,
    },
}`;
export const getPost = (slug: string) => {
  const now = new Date().toISOString();
  return getCachedClient()<Post>(postQuery, { slug, now });
};

const firstPostQuery = groq`*[_type == "post" && publishedAt <= $now] | order(publishedAt desc, slug.current)[0]{
  "slug": slug.current,
  "mainImage": {
    "alt": mainImage.alt,
    "metadata": mainImage.asset->metadata,
    "url": mainImage.asset->url,
  },
  title
}`;
export const getFirstPost = () => {
  const now = new Date().toISOString();
  return getCachedClient()<NextPost>(firstPostQuery, { now });
};
