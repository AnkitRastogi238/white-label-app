// external dependencies
import type { ComponentInfo } from '@builder.io/sdk-svelte';

const CopyrightBannerInfo: ComponentInfo = {
    name: 'Copyright Banner',
    canHaveChildren: false,
    inputs: [
        {
            name: 'title',
            type: 'text',
            helperText: 'Enter the title. Max characters limit is 21',
        },
        {
            name: 'link',
            type: 'url',
            helperText: 'Enter the link.',
        },
        {
            name: 'openInNewTab',
            type: 'boolean',
            defaultValue: false,
            helperText: 'Enable to open in new tab',
        },
    ],
};

export default CopyrightBannerInfo;
