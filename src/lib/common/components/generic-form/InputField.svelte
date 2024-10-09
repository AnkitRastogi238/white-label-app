<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let name = '';
	export let value = '';
	export let label = '';
	export let type = 'text';
	export let error = '';
	export let isMandatory = false;
	export let placeholder: string = '';

	const dispatch = createEventDispatcher();

	function handleInput(event: any) {
		dispatch('input', { name, value: event.target.value });
	}
</script>

<div class="flex flex-col gap-1">
	{#if label}
		<label
			for={label}
			class="font-poppins text-xs font-normal leading-ng18 text-ng-gray-800 flex gap-1 items-center"
		>
			{label}
			{#if isMandatory}<span
					class="{error
						? 'text-ng-red-300'
						: 'text-ng-gray-800'} font-poppins text-ng10 leading-ng14 font-normal">*</span
				>
			{/if}
		</label>
	{/if}
	<input
		{name}
		{type}
		{value}
		id={label}
		data-testId="name-input"
		class="flex-1 text-base w-full focus:outline-none truncate placeholder:text-ng-gray-675 font-normal rounded border {error
			? 'border-ng-red-300'
			: 'border-ng-gray-475'} px-4 py-3 font-poppins"
		{placeholder}
		on:input={handleInput}
	/>
	{#if error}
		<p class="text-ng-red-300 font-poppins font-normal leading-ng14 text-ng10">
			{error}
		</p>
	{/if}
</div>
