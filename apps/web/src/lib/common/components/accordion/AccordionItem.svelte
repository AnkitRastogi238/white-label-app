<script lang="ts">
	// svelte dependencies
	import { quintOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';
	
	// internal dependencies
	import { MinusIcon, PlusIcon } from '$lib/assets/icons';

	/**
	 * Represents the icon of the Accordion Items.
	 */
	export let icon: string;

	/**
	 * Represents the subHeading of the Accordion Items.
	 */
	export let subTitle: string;

	/**
	 * Represents the description of the Accordion Items.
	 */
	export let description: string;

	/**
	 * Unique index for each accordion.
	 */
	export let index: number;

	/**
	 * Track the index of the currently expanded accordion.
	 */
	export let expandedAccordion: number | null = null;
</script>

<div class="border border-ng-gray-50 rounded-md mb-4 shadow-ng5 overflow-hidden">
	<div
		class="flex gap-4 items-center px-6 py-5 cursor-pointer {expandedAccordion === index
			? 'bg-ng-gray-125 text-ng-blue-300'
			: ''}"
	>
		{#if icon}
			<div class="h-8 w-8">{@html icon}</div>
		{/if}
		<h3 class="flex-grow font-lato font-medium text-lg md:text-2xl">{subTitle}</h3>
		<button class="focus:outline-none w-8">
			{#if expandedAccordion === index}
				<span class="block w-8">{@html MinusIcon}</span>
			{:else}
				<span class="w-8 h-8">{@html PlusIcon}</span>
			{/if}
		</button>
	</div>
	{#if expandedAccordion === index}
		<div
			class="bg-ng-gray-125 px-6 pt-ng30 pb-5 content-description font-poppins font-normal text-base leading-ng142P"
			transition:slide={{ duration: 300, easing: quintOut }}
		>
			{@html description}
		</div>
	{/if}
</div>

<style lang="scss">
	.content-description {
		:global(ul) {
			list-style-type: disc;
			padding-left: 20px;
		}
		:global(ol) {
			list-style-type: decimal;
			padding-left: 20px;
		}
		:global(a) {
			color: var(--ng-blue-300);
		}
	}
</style>
