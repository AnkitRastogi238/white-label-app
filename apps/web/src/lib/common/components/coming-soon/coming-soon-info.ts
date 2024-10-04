// external dependencies
import type { ComponentInfo } from '@builder.io/sdk-svelte';

// define the component information that Builder needs to know about
const ComingSoonInfo: ComponentInfo = {
  name: 'Coming Soon',
  canHaveChildren: false,
  inputs: [
    {
      name: 'icon',
      type: 'object',
      subFields: [
        {
          name: 'src',
          type: 'file',
          allowedFileTypes: ['jpeg', 'png', 'jpg', 'svg', 'webp', 'gif'],
          helperText: 'Select an animated icon. Recommended image size is 95.63x76.5',
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
      name: 'title',
      type: 'string',
      required: true,
      helperText: 'Enter the title',
      defaultValue: 'Title',
    },
    {
      name: 'description',
      type: 'string',
      required: true,
      helperText: 'Enter the description',
      defaultValue: 'Description',
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
};

export default ComingSoonInfo;
