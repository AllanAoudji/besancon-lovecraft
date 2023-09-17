import { defineField, defineType } from 'sanity';
import { BiUser } from 'react-icons/bi';

export default defineType({
  name: 'author',
  title: 'Authors',
  type: 'document',
  icon: BiUser,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
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
      name: 'profilePicture',
      title: 'Profile Picture',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [
        {
          title: 'Block',
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'profilePicture',
      subtitle: 'email',
    },
  },
  orderings: [
    {
      title: 'Nom, desc',
      name: 'SlugDesc',
      by: [{ field: 'slug.current', direction: 'desc' }],
    },
    {
      title: 'Nom, asc',
      name: 'SlugAsc',
      by: [{ field: 'slug.current', direction: 'asc' }],
    },
  ],
});
