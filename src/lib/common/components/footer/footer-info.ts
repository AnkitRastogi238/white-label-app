// external dependencies
import type { ComponentInfo } from '@builder.io/sdk-svelte';

const SiteNavigationInfo: ComponentInfo = {
    name: 'Site Navigation',
    canHaveChildren: false,
    inputs: [
        {
            name: 'logo',
            type: 'object',
            subFields: [
                {
                    name: 'title',
                    type: 'text',
                    helperText: 'Enter the title. Max characters limit is 21',
                },
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
            ]
        },
        {
            name: 'menuList',
            type: 'array',
            subFields: [
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
        },
    ],
};

export default SiteNavigationInfo;
