<script lang="ts">
	//external dependencies
	import { onDestroy, onMount } from 'svelte';
	//internal dependencies
	import GenericImage from '$lib/common/components/image/GenericImage.svelte';
	import Link from '$lib/common/components/link/Link.svelte';
	import {
		addEventListeners,
		currentBreakpoint,
		getBreakpoint,
		initializeBreakpoint,
		removeEventListeners
	} from '$lib/common/utils/breakpoint';

	export let title: string;
	export let isTitleRequired: boolean;
	export let variation: string;
	export let cardsWithIcon: any[];
	export let cardsWithImage: any[];
	export let ctaText: string;
	export let bgColor: string;
	export let videoVariation: string;

	let cards: (any | any)[] = [];
	$: cards = variation === 'Card With Icon' ? cardsWithIcon : cardsWithImage;

	let selectedVideoIndex: number;
	let showModal = false;

	/**
	 * Initializes breakpoint.
	 *
	 * This function should be called to set up initial breakpoint configurations,
	 * such as defining responsive behaviors or adapting layouts based on screen size.
	 */
	initializeBreakpoint();
	let isLargeScreen = getBreakpoint() === 'large';
	let isMediumScreen = getBreakpoint() === 'medium';

	let displayedCards: number = 3;
	/**
	 * Function for handling Load More cta
	 */
	const handleLoadMoreCards = () => {
		if (isLargeScreen) {
			displayedCards += 3;
		} else if (isMediumScreen) {
			displayedCards += 2;
		} else {
			displayedCards += 3;
		}
	};

	/**
	 * Handles changes in breakpoint settings.
	 *
	 * This function updates internal state variables based on the new breakpoint,
	 * such as determining if the screen is large,medium-sized or small, and adjusts and updates finalSlide value accordingly
	 * @param newBreakpoint - The new breakpoint value ('large' or 'medium').
	 */
	const handleBreakpointChange = (newBreakpoint: string) => {
		isLargeScreen = newBreakpoint === 'large';
		isMediumScreen = newBreakpoint === 'medium';
		if (isLargeScreen) {
			displayedCards = 3;
		} else if (isMediumScreen) {
			displayedCards = 2;
		} else {
			displayedCards = 3;
		}
	};

	/**
	 * calling handleBreakpoint change initially
	 */
	handleBreakpointChange(currentBreakpoint);
	/**
	 * Executes initialization operations when the component or element is mounted.
	 *
	 */
	onMount(() => {
		// Add a resize event listener to handle breakpoint changes
		addEventListeners(handleBreakpointChange);
		const resizeHandler = () => {
			handleBreakpointChange(getBreakpoint());
		};
		window.addEventListener('resize', resizeHandler);
		return () => {
			window.removeEventListener('resize', resizeHandler);
		};
	});
	/**
	 * Executes cleanup operations when the component or element is destroyed.
	 * @param {() => void} cleanupCallback - The callback function containing cleanup operations to be executed.
	 * @returns {void}
	 */
	onDestroy(() => {
		// Remove event listeners or any other cleanup operations as necessary.
		removeEventListeners();
	});
</script>

<div class="min-h-ng43 common-padding flex flex-col gap-9">
	{#if isTitleRequired && title}
		<h3 class="text-4xl leading-ng48 text-ng font-light font-roboto" data-testId="title">
			{title}
		</h3>
	{/if}
	{#if cards?.length > 0}
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each cards?.slice(0, displayedCards) as card, index}
				<Link
					href={card?.cardsData?.link?.href && card?.variation !== 'Video'
						? card?.cardsData?.link?.href
						: undefined}
					isOpenNewTab={card?.cardsData?.link?.href && card?.variation !== 'Video'
						? card?.cardsData?.link?.target
							? Boolean(card?.cardsData?.link?.target)
							: undefined
						: undefined}
					classList="block hover:scale-105 rounded-ng10 [transition:transform_0.6s_ease]"
				>
					<div class="border border-solid border-ng-gray-300 shadow-ng3 h-full rounded-ng10">
						{#if variation === 'Card With Icon' && 'icon' in card}
							<div
								style="background-color:{bgColor}"
								class="card-icon h-ng236 flex justify-center items-center"
							>
								{@html card?.icon}
							</div>
						{/if}
						{#if variation !== 'Card With Icon'}
							<GenericImage
								Image={{
									class: `aspect-ng427by236 w-full object-cover rounded-t-ng10`,
									src: card?.image?.src,
									alt: card?.image?.altText
								}}
							/>
						{/if}
						<Link
							href={card?.cardsData?.link?.href}
							isOpenNewTab={card.variation === 'Video' && card?.cardsData?.link?.target
								? Boolean(card?.cardsData?.link?.target)
								: undefined}
						>
							<div class="flex flex-col gap-4 p-6">
								<div class="font-lato font-medium text-2xl leading-ng34">
									{card?.cardsData?.title}
								</div>
								{#if card?.cardsData?.description}
									<div
										class="font-poppins text-ng-gray-650 font-light text-base leading-ng22 overflow-hidden"
									>
										{@html card?.cardsData?.description}
									</div>
								{/if}
							</div>
						</Link>
					</div>
				</Link>
			{/each}
		</div>
	{/if}
	{#if cards?.length > displayedCards}
		<div data-testId="load-more" class="flex justify-center">
			<button
				on:click={handleLoadMoreCards}
				class='text-ng-blue-300 border border-ng-blue-300 bg-white px-3 py-1 rounded-ng5 flex items-center gap-3'
			>
            {ctaText ? ctaText : 'View More'}
            </button>
		</div>
	{/if}
</div>

<style lang="scss">
	.card-icon {
		:global(svg) {
			height: 7.625rem;
			width: 7.625rem;
		}
	}
</style>
