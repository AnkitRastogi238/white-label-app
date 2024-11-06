// external dependencies
import type { ComponentInfo } from '@builder.io/sdk-svelte';

const CardSubFields = [
  {
    name: 'title',
    type: 'string',
    helperText: 'Enter the title',
  },
  {
    name: 'description',
    type: 'richText',
    helperText: 'Enter the description',
    defaultValue:
      'Limit your attack surface by ensuring you never become outdated with the latest security updates depolyed.',
  },
  {
    name: 'link',
    type: 'object',
    defaultValue: {
      target: false,
    },
    subFields: [
      {
        name: 'href',
        type: 'url',
        helperText: 'Enter the link href',
      },
      {
        name: 'target',
        type: 'boolean',
        helperText: 'Enable to open in new tab',
      },
    ],
  },
];
// define the component information that Builder needs to know about
const BannerCardListInfo: ComponentInfo = {
  name: 'Banner Card List',
  canHaveChildren: false,
  inputs: [
    {
      name: 'isTitleRequired',
      type: 'boolean',
      defaultValue: false,
      helperText: 'Enable to display title',
    },
    {
      name: 'title',
      type: 'string',
      helperText: 'Enter the title',
      showIf: `options.get('isTitleRequired')===true`,
    },
    {
      name: 'variation',
      type: 'string',
      enum: ['Card With Icon', 'Card With Image'],
      defaultValue: 'Card With Icon',
      helperText: 'Select variation',
    },
    {
      name: 'bgColor',
      type: 'color',
      helperText: 'Select background color',
      defaultValue: '#005B8C',
      showIf: `options.get('variation')==='Card With Icon'`,
    },
    {
      name: 'cardsWithIcon',
      type: 'list',
      showIf: `options.get('variation')==='Card With Icon'`,
      helperText: 'Add card in the list',
      subFields: [
        {
          name: 'icon',
          type: 'code',
          helperText: 'Enter the svg code',
        },
        {
          name: 'cardsData',
          type: 'object',
          subFields: CardSubFields,
          defaultValue: {
            title: 'Enter the title',
            description: 'Enter the desription',
          },
        },
      ],
    },
    {
      name: 'cardsWithImage',
      type: 'list',
      showIf: `options.get('variation')==='Card With Image'`,
      helperText: 'Add card in the list',
      subFields: [
        {
          name: 'image',
          type: 'object',
          defaultValue: {
            src: 'https://cdn.builder.io/api/v1/image/assets%2F9363b29032ef4e6598adee3414a78ba0%2Fed1216318c6c4183a10842edf6d6bba7',
            altText: 'alt-1',
          },
          subFields: [
            {
              name: 'src',
              type: 'file',
              allowedFileTypes: ['jpeg', 'png', 'jpg', 'svg', 'webp'],
              helperText: 'Select an image. Select an image. Recommended image size is 427x282',
            },
            {
              name: 'altText',
              type: 'string',
              helperText: 'Enter the alt text',
            },
          ],
        },
        {
          name: 'cardsData',
          type: 'object',
          subFields: CardSubFields,
          defaultValue: {
            title: 'Reduce exposure to attack',
            description:
              'Limit your attack surface by ensuring you never become outdated with the latest security updates depolyed.',
          },
        },
      ],
    },
    {
      name: 'ctaText',
      type: 'string',
      helperText: 'Enter the cta text',
      defaultValue: 'View More',
    },
  ],
};

export default BannerCardListInfo;
