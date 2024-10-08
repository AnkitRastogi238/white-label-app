// external dependencies
import type { ComponentInfo } from '@builder.io/sdk-svelte';

// define the component information that Builder needs to know about
const ViewDocumentsInfo: ComponentInfo = {
  name: 'Documents',
  canHaveChildren: false,
  inputs: [
    {
      name: 'isPaddingRequired',
      type: 'boolean',
      defaultValue: false,
      helperText: 'Enable to add padding',
    },
    {
      name: 'title',
      type: 'string',
      defaultValue: 'Documents',
      helperText: 'Enter the title',
      required: true,
    },
    {
      name: 'ctaText',
      type: 'string',
      helperText: 'Enter the cta Text',
      defaultValue: 'Load More',
      required: true,
    },
    {
      name: 'referenceAnchorId',
      type: 'string',
      helperText: 'Enter the reference anchor id',
      defaultValue: 'documents',
      required: true,
    },

    {
      name: 'secondaryCategory',
      type: 'reference',
      model: 'secondary-category',
    },
    {
      name: 'model',
      type: 'reference',
      model: 'model',
    },
  ],
};

export default ViewDocumentsInfo;
