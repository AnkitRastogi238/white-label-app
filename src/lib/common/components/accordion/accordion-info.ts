// external dependencies
import type { ComponentInfo } from '@builder.io/sdk-svelte';

const AccordionInfo: ComponentInfo = {
  name: 'Accordion',
  canHaveChildren: false,
  inputs: [
    {
      name: 'variation',
      type: 'string',
      helperText: 'Select a variation',
      enum: ['Variation1', 'Variation2'],
      defaultValue: 'Variation1',
    },
    {
      name: 'data',
      type: 'object',
      subFields: [
        {
          name: 'isTitleRequired',
          type: 'boolean',
          helperText: 'Enable for the title',
          defaultValue: 'false',
        },
        {
          name: 'title',
          type: 'string',
          helperText: 'Enter the title',
          defaultValue: 'Title',
          showIf: `options.get('isTitleRequired') === true`,
        },
        {
          name: 'subTitle',
          type: 'string',
          helperText: 'Enter the sub-title',
          defaultValue: 'Sub-Title',
          showIf: `options.get('isTitleRequired') === true`,
        },
        {
          name: 'cardList',
          type: 'list',
          subFields: [
            {
              name: 'image',
              type: 'object',
              subFields: [
                {
                  name: 'src',
                  type: 'file',
                  allowedFileTypes: ['jpeg', 'png', 'jpg', 'webp'],
                  helperText: 'Select an image. Recommended image size is 314x310',
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
              name: 'name',
              type: 'string',
              helperText: 'Enter the name',
              defaultValue: 'XYZ',
            },
            {
              name: 'designation',
              type: 'string',
              helperText: 'Enter the designation',
              defaultValue: 'Manager',
            },
            {
              name: 'content',
              type: 'richText',
              helperText: 'Enter the content',
              defaultValue: 'Content',
            },
          ],
          defaultValue: [
            {
              image: {
                src: '',
                altText: 'altText',
              },
              name: 'Name',
              designation: 'Designation',
              content: 'Content',
            },
          ],
        },
      ],
      showIf: `options.get('variation') === 'Variation1'`,
    },
    {
      name: 'title',
      type: 'string',
      helperText: 'Enter the title',
      defaultValue: 'Title',
      showIf: `options.get('variation') === 'Variation2'`,
    },
    {
      name: 'accordionItems',
      type: 'list',
      helperText: 'Add accordion item details',
      showIf: `options.get('variation') === 'Variation2'`,
      subFields: [
        {
          name: 'icon',
          type: 'richText',
          helperText: 'Enter the svg icon code for the Accordion Item',
        },
        {
          name: 'subTitle',
          type: 'string',
          helperText: 'Enter the subtitle',
          required: true,
          defaultValue: 'Sub Heading',
        },
        {
          name: 'description',
          type: 'richText',
          helperText: 'Enter the description',
          required: true,
          defaultValue: 'Description',
        },
      ],
    },
  ],
};

export default AccordionInfo;
