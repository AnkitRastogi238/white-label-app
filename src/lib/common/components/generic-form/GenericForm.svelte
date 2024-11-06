<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import FormGenerator from './FormGenerator.svelte';
	export let submitBtnText: string = 'Submit';
	export let formFields: any[];
	export let handleSubmit: ((event: CustomEvent<any>) => Promise<void>) | undefined = undefined;

	const dispatch = createEventDispatcher();
	const onSubmit = async (event: CustomEvent) => {
		// If handleSubmit is provided, use it directly
		if (handleSubmit) {
			await handleSubmit(event);
		} else {
			// Otherwise dispatch the submit event to be handled by parent
			dispatch('submit', event.detail);
		}
	};
</script>

<FormGenerator {submitBtnText} {formFields} on:submit={onSubmit} />
