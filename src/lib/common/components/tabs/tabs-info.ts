// external dependencies
import type { ComponentInfo } from '@builder.io/sdk-svelte';

// define the component information that Builder needs to know about
const TabsInfo: ComponentInfo = {
  name: 'Tabs',
  canHaveChildren: true,
  shouldReceiveBuilderProps: {
    builderBlock: true,
  },
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
      name: 'isPaddingRequired',
      type: 'boolean',
      defaultValue: false,
      helperText: 'Enable to add padding',
    },
    {
      name: 'bgColor',
      type: 'string',
      enum: ['White', 'PrimaryLightGrey'],
      helperText: 'Select the background color',
      defaultValue: 'White',
    },
    {
      name: 'tabData',
      type: 'list',
      subFields: [
        {
          name: 'name',
          type: 'string',
          required: true,
          helperText: 'Enter the name',
          defaultValue: 'About Product',
        },
        {
          name: 'isApiNameRequired',
          type: 'boolean',
          defaultValue: false,
          helperText: 'Please enable it if you want to enter Api name',
        },
        {
          name: 'apiName',
          type: 'string',
          helperText: 'Enter api name in kebab case eg. Tab1 should have tab-1 as a api name',
          showIf: `options.get('isApiNameRequired')===true`,
        },
        {
          name: 'children',
          type: 'blocks',
          hideFromUI: true,
          defaultValue: [],
        },
      ],
    },
  ],
};

export default TabsInfo;
