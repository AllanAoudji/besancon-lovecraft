import { defineField, defineType } from 'sanity';
import { BiSolidFileBlank } from 'react-icons/bi';

export default defineType({
  name: 'page',
  title: 'Pages',
  type: 'document',
  icon: BiSolidFileBlank,
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
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description:
        "ordre d'affichage dans le menu. Plus le numéro est élevé, plus la page est bas dans le classement. Si deux pages on le même numéro d'ordre, les pages sont classé par ordre alphabétique.",
      initialValue: 0,
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
  ],
});
