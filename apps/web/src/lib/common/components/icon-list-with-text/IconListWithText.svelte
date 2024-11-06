<script lang="ts">
	// internal dependencies
	import GenericImage from '$lib/common/components/image/GenericImage.svelte';
	import type { ICard } from '$lib/common/types';
	import IconListWithCount from './IconListWithCount.svelte';
	import IconsAndText from './IconsAndText.svelte';

	/**
	 * alignment - Represents an alignment for cards position.
	 * title - Title for the Layout 4
	 * isTitleRequired - Boolen for the title rendering
	 * Layout - Variations
	 * catText - Text for the button that handles load more functionality
	 * linkText - Text for the card link
	 * cardList - Contain data of card when select layout is Layout1, Layout2, Layout3
	 * cardsList - Contain data of card when select layout is Layout4
	 */
	export let alignment: string;
	export let title: string;
	export let isTitleRequired: boolean;
	export let Layout: string;
	export let ctaText: string;
	export let linkText: string;
	export let cardList: ICard[];
	export let cardsList: ICard[];

	let alignemntClass: string = 'items-center lg:items-center text-center lg:text-center';

	if (alignment === 'Left') {
		alignemntClass = 'items-start lg:items-start text-start lg:text-start';
	} else if (alignment === 'Right') {
		alignemntClass = 'items-end lg:items-end text-end lg:text-end';
	} else {
		alignemntClass = 'items-center lg:items-center text-center lg:text-center';
	}
</script>

{#if Layout === 'Layout1' || Layout === 'Layout2'}
	<IconsAndText {Layout} {ctaText} {linkText} {cardList} />
{:else if Layout === 'Layout3'}
	<div class="flex flex-col md:m-0 lg:m-0 lg:flex-row gap-12 lg:gap-ng126 justify-between">
		{#if cardList?.length > 0}
			{#each cardList as cardItem}
				<div
					class="flex flex-col md:flex-row lg:flex-col gap-6 {alignemntClass} md:items-center md:text-left"
				>
					<div class="w-ng136 h-ng136 rounded-full flex-shrink-0">
						<GenericImage
							Image={{
								src: cardItem?.image?.src,
								alt: cardItem?.image?.altText,
								class: `rounded-full h-full w-full object-cover`
							}}
						/>
					</div>
					<div class="flex flex-col gap-6">
						<h2 class=" text-2xl leading-6 font-semibold font-roboto">
							{cardItem?.title}
						</h2>
						{#if cardItem?.description}
							<p class="text-sm md:text-base leading-ng26 font-light font-poppins md:self-stretch">
								{cardItem?.description}
							</p>
						{/if}
					</div>
				</div>
			{/each}
		{/if}
	</div>
{:else}
	<IconListWithCount cardList={cardsList} {title} {isTitleRequired} />
{/if}
