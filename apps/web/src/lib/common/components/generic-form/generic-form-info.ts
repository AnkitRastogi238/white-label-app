// external dependencies
import type { ComponentInfo } from '@builder.io/sdk-svelte';

const GenericFormInfo: ComponentInfo = {
    name: 'Generic Form',
    canHaveChildren: false,
    inputs: [
        {
            name: 'formFields',
            type: 'list',
            subFields: [
                {
                    name: 'name',
                    type: 'text',
                    helperText: 'Enter the name',
                },
                {
                    name: 'label',
                    type: 'text',
                    helperText: 'Enter the label',
                },
                {
                    name: 'placeholder',
                    type: 'text',
                    helperText: 'Enter the placeholder',
                },
                {
                    name: 'type',
                    type: 'string',
                    helperText: 'Select a type',
                    enum: ['text', 'email', 'number', 'textarea', 'select', 'multiselect'],
                    defaultValue: 'text',
                },
                {
                    name: 'isMandatory',
                    type: 'boolean',
                    helperText: 'Enable to make the field mandatory to fill',
                    defaultValue: false,
                },
                {
                    name: 'errorMessage',
                    type: 'string',
                    helperText: 'Enter the error message'
                },
                {
                    name: 'options',
                    type: 'list',
                    showIf: `options.get('type') === 'select' || options.get('type') === 'multiselect'`,
                    subFields: [
                        {
                            name: 'label',
                            type: 'text',
                            helperText: 'Enter the display name for the option',
                        },
                        {
                            name: 'value',
                            type: 'text',
                            helperText: 'Enter the value for the option',
                        },
                    ],
                },
            ]
        }
    ]
};

export default GenericFormInfo;
