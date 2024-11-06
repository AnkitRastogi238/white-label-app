// external dependencies
import type { ComponentInfo } from '@builder.io/sdk-svelte';

const IconListWithTextInfo: ComponentInfo = {
    name: 'Icon list with text',
    canHaveChildren: false,
    inputs: [
        {
            name: 'Layout',
            type: 'string',
            helperText: 'Select a layout',
            enum: ['Layout1', 'Layout2', 'Layout3', 'Layout4'],
            defaultValue: 'Layout1',
        },
        {
            name: 'isTitleRequired',
            type: 'boolean',
            defaultValue: false,
            helperText: 'Enable to display title',
            showIf: `options.get('Layout') === 'Layout4'`,
        },
        {
            name: 'title',
            type: 'string',
            helperText: 'Enter the title',
            showIf: `options.get('isTitleRequired')===true`,
        },
        {
            name: 'ctaText',
            type: 'string',
            helperText: 'Enter the CTA text',
            defaultValue: 'View More',
            showIf: `options.get('Layout') === 'Layout1' || options.get('Layout') === 'Layout2'`,
        },
        {
            name: 'linkText',
            type: 'string',
            helperText: 'Enter the card link text',
            defaultValue: 'Discover More',
            showIf: `options.get('Layout') === 'Layout1'`,
        },
        {
            name: 'alignment',
            type: 'string',
            helperText: 'Select an alignment',
            enum: ['Left', 'Center', 'Right'],
            defaultValue: 'Center',
            showIf: `options.get('Layout') === 'Layout3'`,
        },
        {
            name: 'cardList',
            type: 'list',
            showIf: `options.get('Layout') === 'Layout3' || options.get('Layout') === 'Layout2' || options.get('Layout') === 'Layout1'`,
            subFields: [
                {
                    name: 'image',
                    type: 'object',
                    subFields: [
                        {
                            name: 'src',
                            type: 'file',
                            allowedFileTypes: ['jpeg', 'png', 'jpg', 'svg', 'webp'],
                            helperText: 'Select an image. Recommended image size is 297x326',
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
                    defaultValue: 'We Listen',
                },
                {
                    name: 'description',
                    type: 'string',
                    helperText: 'Enter the description',
                },
                {
                    name: 'link',
                    type: 'object',
                    subFields: [
                        {
                            name: 'href',
                            type: 'url',
                            helperText: 'Enter the link href',
                        },
                        {
                            name: 'target',
                            type: 'boolean',
                            helperText: 'Enable to open in new tab',
                        },
                    ],
                },
            ],
            defaultValue: [
                {
                    image: '',
                    altText: 'alt text',
                    title: 'We Listen',
                },
            ],
        },
        {
            name: 'cardsList',
            type: 'list',
            showIf: `options.get('Layout') === 'Layout4'`,
            subFields: [
                {
                    name: 'title',
                    type: 'string',
                    helperText: 'Enter the title',
                    required: true,
                },
                {
                    name: 'icon',
                    type: 'code',
                    helperText: 'Enter the svg',
                },
                {
                    name: 'count',
                    type: 'number',
                    helperText: 'Enter the count',
                },
                {
                    name: 'link',
                    type: 'object',
                    defaultValue: {
                        target: false,
                    },
                    subFields: [
                        {
                            name: 'href',
                            type: 'url',
                            helperText: 'Enter the link href',
                        },
                        {
                            name: 'target',
                            type: 'boolean',
                            helperText: 'Enable to open in new tab',
                        },
                    ],
                },
            ],
        },
    ],
};

export default IconListWithTextInfo;
