<script lang="ts">
	import FormGenerator from './FormGenerator.svelte';

	export let formFields: any[];
	function handleSubmit(event: any) {
		console.log('Form submitted:', event.detail);
	}
</script>

<FormGenerator {formFields} on:submit={handleSubmit} />
