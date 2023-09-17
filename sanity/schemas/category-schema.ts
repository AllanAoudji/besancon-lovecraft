import { defineField, defineType } from 'sanity';
import { BiCategory } from 'react-icons/bi';

export default defineType({
  name: 'category',
  title: 'Categories',
  type: 'document',
  icon: BiCategory,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Display title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
  orderings: [
    {
      title: 'Nom, asc',
      name: 'SlugAsc',
      by: [{ field: 'slug.current', direction: 'asc' }],
    },
    {
      title: 'Nom, desc',
      name: 'SlugDesc',
      by: [{ field: 'slug.current', direction: 'desc' }],
    },
  ],
});
