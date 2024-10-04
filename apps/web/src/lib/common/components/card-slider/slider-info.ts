// external dependencies
import type { ComponentInfo } from '@builder.io/sdk-svelte';

// define the component information that Builder needs to know about
const SliderInfo: ComponentInfo = {
  name: 'Slider with pagination',
  canHaveChildren: false,
  inputs: [
    {
      name: 'cardList',
      type: 'list',
      subFields: [
        {
          name: 'title',
          type: 'string',
          required: true,
          helperText: 'Enter the title',
          defaultValue: 'Title 1',
        },
        {
          name: 'description',
          type: 'string',
          required: true,
          helperText: 'Enter the description',
          defaultValue: 'description-1',
        },
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
              helperText: 'Select an image.Recommended image size is 307x375.',
            },
            {
              name: 'altText',
              type: 'string',
              defaultValue: 'alt-text',
              helperText: 'Enter the alt text',
            },
          ],
        },
        {
          name: 'link',
          type: 'object',
          defaultValue: {
            text: 'Read More',
            href: '/',
            target: false,
          },
          subFields: [
            {
              name: 'text',
              type: 'string',
              defaultValue: 'Read More',
              helperText: 'Enter the link text',
            },
            {
              name: 'href',
              type: 'url',
              defaultValue: '/',
              helperText: 'Enter the link href',
            },
            {
              name: 'target',
              type: 'boolean',
              defaultValue: false,
              helperText: 'Enable to open in new tab',
            },
          ],
        },
      ],
      defaultValue: [
        {
          description: 'Description',
          image:
            'https://cdn.builder.io/api/v1/image/assets%2F9363b29032ef4e6598adee3414a78ba0%2Ff8ec5129bb5243e4a8c3e8b954343561',
          altText: 'Alt text',
          title: 'History',
          ctaText: 'View Details',
          ctaLink: '/',
        },
      ],
    },
  ],
};

export default SliderInfo;
