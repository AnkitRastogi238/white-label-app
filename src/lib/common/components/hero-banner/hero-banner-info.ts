import type { ComponentInfo } from '@builder.io/sdk-svelte';

// define the component information that Builder needs to know about
const HeroBannerInfo: ComponentInfo = {
  name: 'Hero Banner',
  canHaveChildren: false,
  inputs: [
    {
      name: 'image',
      type: 'file',
      required: true,
      allowedFileTypes: ['jpeg', 'webp', 'png'],
      helperText: 'Select an image. Recommended image size is 1440x540',
    },
    {
      name: 'altText',
      type: 'string',
      required: true,
      helperText: 'Enter the alt text for the image',
    },
    {
      name: 'title',
      type: 'string',
      required: true,
      helperText: 'Enter the title',
    },
    {
      name: 'description',
      type: 'string',
      required: true,
      helperText: 'Enter the description',
    },
  ],
};

export default HeroBannerInfo;
