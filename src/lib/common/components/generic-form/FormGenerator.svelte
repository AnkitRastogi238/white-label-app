<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import InputField from './InputField.svelte';
	import TextAreaField from './TextAreaField.svelte';
	import SelectField from './SelectField.svelte';

	export let formFields: any = [];

	let selectFieldRefs: { [key: string]: SelectField } = {};
	let formData: any = {};
	let errors: any = {};
	export let submitBtnText: string;

	const dispatch = createEventDispatcher();

	function validateField(field: any, value: any) {
		if (field?.isMandatory && !value) {
			return field.errorMessage || 'This field is required';
		}
		return '';
	}

	async function handleSubmit() {
		let isValid = true;
		formFields.forEach((field: any) => {
			const error = validateField(field, formData[field.name]);
			errors[field.name] = error;
			if (error) isValid = false;
		});

		if (isValid) {
			await dispatch('submit', formData);
			resetForm();
		}
	}

	function handleInput(event: any) {
		const { name, value } = event.detail;
		formData[name] = value;
	}

	function handleReset() {
		resetForm();
	}

	function resetForm() {
		formData = {};

		// Reset all errors
		errors = {};

		// Reset each field with appropriate default value
		formFields.forEach((field: any) => {
			if (field.type === 'multiselect') {
				formData[field.name] = '';
				// Call reset on the SelectField component
				if (selectFieldRefs[field.name]) {
					selectFieldRefs[field.name].reset();
				}
			} else if (field.type === 'select') {
				formData[field.name] = '';
				// Call reset on the SelectField component
				if (selectFieldRefs[field.name]) {
					selectFieldRefs[field.name].reset();
				}
			} else {
				formData[field.name] = '';
			}
		});

		dispatch('reset', { formData });
	}
</script>

<form on:submit|preventDefault={handleSubmit} class="w-ng568 flex flex-col gap-6 common-padding">
	{#each formFields as field (field.name)}
		{#if field.type === 'text' || field.type === 'number' || field.type === 'email'}
			<InputField
				name={field.name}
				value={formData[field.name] || ''}
				on:input={handleInput}
				label={field.label}
				type={field.type}
				error={errors[field.name]}
				isMandatory={field.isMandatory}
				placeholder={field.placeholder}
			/>
		{:else if field.type === 'textarea'}
			<TextAreaField
				bind:value={formData[field.name]}
				label={field.label}
				error={errors[field.name]}
				isMandatory={field.isMandatory}
				placeholder={field.placeholder}
			/>
		{:else if field.type === 'select' || field.type === 'multiselect'}
			<SelectField
				name={field.name}
				value={formData[field.name] || (field.type === 'multiselect' ? [] : '')}
				on:input={handleInput}
				label={field.label}
				options={field.options}
				multiple={field.type === 'multiselect'}
				error={errors[field.name]}
				isMandatory={field.isMandatory}
				placeholder={field.placeholder}
				bind:this={selectFieldRefs[field.name]}
			/>
		{/if}
	{/each}
	<div class="flex gap-6 mt-3">
		<button
			class="text-base w-fit font-medium font-poppins bg-ng-blue-400 rounded px-5 py-2 flex items-center gap-3 text-white justify-center disabled:text-white disabled:bg-ng-gray-285 disabled:border-none"
			type="submit"
		>
			{submitBtnText}
		</button>
		<button
			class="text-base w-fit font-medium font-poppins border border-ng-blue-400 rounded px-5 py-2 flex items-center gap-3 text-ng-blue-400 justify-center disabled:text-white disabled:bg-ng-gray-285 disabled:border-none"
			type="button"
			on:click={handleReset}
		>
			Reset
		</button>
	</div>
</form>
