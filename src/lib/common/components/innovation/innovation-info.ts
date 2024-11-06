// external dependencies
import type { ComponentInfo } from '@builder.io/sdk-svelte';

// define the component information that Builder needs to know about
const InnovationInfo: ComponentInfo = {
  name: 'Innovation with Blocks',
  canHaveChildren: true,
  shouldReceiveBuilderProps: {
    builderBlock: true,
  },
  inputs: [
    {
      name: 'title',
      type: 'string',
      required: true,
      helperText: 'Enter the title',
      defaultValue: 'Our Innovation',
    },
    {
      name: 'image',
      type: 'file',
      allowedFileTypes: ['jpeg', 'png', 'jpg', 'svg', 'webp'],
      required: true,
      helperText: 'Select an image.Recommended image size is 845x418.',
      defaultValue:
        'https://cdn.builder.io/api/v1/image/assets%2F9363b29032ef4e6598adee3414a78ba0%2Fc4fccf5324d34f1d983ffaa3e47ad887',
    },
    {
      name: 'altText',
      type: 'string',
      defaultValue: 'innovation',
      helperText: 'Enter the alt text',
    },
    {
      name: 'video',
      type: 'file',
      allowedFileTypes: ['mp4', 'mov'],
      required: true,
      helperText: 'Select a background video.Recommended image size is 1440x1224',
      defaultValue:
        'https://cdn.builder.io/o/assets%2F9363b29032ef4e6598adee3414a78ba0%2F8e60376f8a084bc3b4915f1c9f6c1c84%2Fcompressed?apiKey=9363b29032ef4e6598adee3414a78ba0&token=8e60376f8a084bc3b4915f1c9f6c1c84&alt=media&optimized=true',
    },
    {
      name: 'childBlocks',
      type: 'blocks',
      hideFromUI: true,
      defaultValue: [],
    },
  ],
};

export default InnovationInfo;
