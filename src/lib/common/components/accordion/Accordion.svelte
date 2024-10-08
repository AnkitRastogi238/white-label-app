<script lang="ts">
	// internal dependencies - child component
	import { logger } from '@white-label/ui/services';
	
	import AccordionItem from './AccordionItem.svelte';
	import GridCardAccordion from './GridCardAccordion.svelte';
	import type { accordionItem } from '$lib/common/types';
	import type { AccordionData } from '$lib/common/types';

	/**
	 * Represents the main title of the component.
	 */
	export let title: string;

	/**
	 * Represents the Accordion Items of the component.
	 */
	export let accordionItems: accordionItem[];

	/**
	 * Represents the Accordion variation.
	 */
	export let variation: string;

	/**
	 * Represents the data for the grid accordian.
	 */
	export let data: AccordionData;

	/**
	 * Track the index of the currently expanded accordion.
	 */
	let expandedAccordion: number | null = null;

	/**
	 * This function Handles toggle effect on Accordion Items.
	 * @param index - The Index of Accordion Items Array.
	 */
	const handleClick = (index: number) => {
		expandedAccordion = expandedAccordion === index ? null : index;
		logger.log("clicked")
	};
</script>

{#if variation === 'Variation2'}
	<div class="common-padding pb-8 lg:pb-11">
		{#if title}
			<h2
				class="mb-9 font-roboto text-4xl font-light text-ng-blue-300 leading-ng44"
				data-testId="title"
			>
				{title}
			</h2>
		{/if}
		{#if accordionItems?.length > 0}
			{#each accordionItems as accordion, i}
				{#if accordion?.subTitle}
					<div on:click={() => handleClick(i)} data-testId="accordion-data" role="presentation">
						<AccordionItem
							index={i}
							icon={accordion?.icon}
							subTitle={accordion?.subTitle}
							description={accordion?.description}
							{expandedAccordion}
						/>
					</div>
				{/if}
			{/each}
		{/if}
	</div>
{:else}
	<GridCardAccordion {data} />
{/if}
