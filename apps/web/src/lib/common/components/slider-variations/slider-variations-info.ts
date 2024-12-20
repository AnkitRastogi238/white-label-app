// external dependencies
import type { ComponentInfo } from '@builder.io/sdk-svelte';

import SliderInfo from '$lib/common/components/card-slider/slider-info';

// define the component information that Builder needs to know about
const SliderVariationInfo: ComponentInfo = {
  name: 'Slider',
  inputs: [
    {
      name: 'title',
      type: 'string',
      required: true,
      helperText: 'Enter the title',
      defaultValue: 'Heading for carousel',
    },
    {
      name: 'description',
      type: 'string',
      helperText: 'Enter the description',
      defaultValue: 'Description',
    },
    {
      name: 'arrowStyle',
      type: 'enum',
      enum: ['black', 'white'],
      defaultValue: 'white',
      required: true,
      helperText:
        'Choose black arrow style for black arrows and white arrow style for white arrows',
    },
    {
      name: 'slider',
      type: 'object',
      subFields: [...SliderInfo.inputs],
    },
  ],
};

export default SliderVariationInfo;
