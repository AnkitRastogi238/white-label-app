<script lang="ts">
	//internal dependencies
	import { getBreakpoint, initializeBreakpoint } from '$lib/common/utils/breakpoint';
	import { CheckedBox, UnCheckedBox } from '$src/lib/assets/icons';

	/**
	 * Indicates whether the item is checked or not.
	 */
	export let checked: boolean;

	/**
	 * The name associated with the item.
	 */
	export let name: string;

	/**
	 * Indicates whether the item is the last element in a list.
	 */
	export let isLastElement: boolean | undefined = undefined;

	/**
	 * Initializes the breakpoint settings.
	 */
	initializeBreakpoint();

	/**
	 * Callback function to handle checkbox change events.
	 */
	export let handleCheckBoxChange: () => void;

	/**
	 * Handles the checkbox click event.
	 * @param e - The event object from the checkbox click.
	 */
	const handleCheckBox = (e: Event) => {
		e.stopPropagation();
		handleCheckBoxChange();
	};
	let isDesktop: boolean = getBreakpoint() === 'large';
</script>

<button
	class=" {isDesktop && !isLastElement ? 'mb-4' : ''} w-full"
	data-testid="filter-listing-checkbox-wrapper"
	on:click={handleCheckBox}
    type="button"
>
	<div class="flex items-center px-4 py-2 w-full">
		<div class="p-lk5 data-testid={name}">
			{#if checked}
				{@html CheckedBox}
			{:else}
				{@html UnCheckedBox}
			{/if}
		</div>

		<p
			class="font-poppins text-sm font-normal {!checked
				? 'text-lkea-gray-975'
				: 'text-lkea-blue-300 font-semibold'} text-wrap text-left"
		>
			{name}
		</p>
	</div>
	<div
		class="self-stretch w-full {!checked
			? 'h-lk2 bg-lkea-gray-350 '
			: isDesktop
				? 'h-1 bg-lkea-blue-300'
				: 'h-lk2 bg-lkea-gray-350 '} rounded-lk6 w-full"
	></div>
</button>
