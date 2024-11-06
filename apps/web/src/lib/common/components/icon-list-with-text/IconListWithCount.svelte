<script lang="ts">
	// internal dependencies
	import Link from '$lib/common/components/link/Link.svelte';
	import type { ICard } from '$lib/common/types';

	/**
	 * title - title of section
	 * isTitleRequired - boolean for title rendering
	 * cardList- cards in the section
	 */
	export let title: string;
	export let isTitleRequired: boolean;
	export let cardList: ICard[];
</script>

<div class="common-padding flex flex-col gap-9">
	{#if title && isTitleRequired}
		<h3 class="text-4xl text-ng font-roboto font-light leading-ng48">
			{title}
		</h3>
	{/if}
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		{#if cardList?.length > 0}
			{#each cardList as card}
				<Link
					classList="p-6 flex justify-between items-center text-black border border-ng-gray-350 group lg:hover:bg-ng-gray-200"
					href={card?.link?.href}
					isOpenNewTab={Boolean(card?.link?.target)}
				>
					<div class="flex gap-ng10 items-center">
						{#if card?.icon}
							<span class="h-9 w-9">{@html card?.icon}</span>
						{/if}
						{#if card?.title}
							<h4 class="text-lg font-poppins leading-9 font-normal lg:group-hover:underline">
								{#if card?.title?.length > 25}
									{card?.title.substring(0, 25)}...
								{:else}
									{card?.title}
								{/if}
							</h4>
						{/if}
					</div>
					{#if card?.count}
						<p class="text-lg font-poppins leading-9 font-semibold">{card?.count}</p>
					{/if}
				</Link>
			{/each}
		{/if}
	</div>
</div>
