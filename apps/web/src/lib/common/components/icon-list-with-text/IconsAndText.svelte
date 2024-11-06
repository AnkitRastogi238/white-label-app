<script lang="ts">
	//internal dependencies
	import { onDestroy, onMount } from 'svelte';

	import type { ICard } from '../../types';
	import GenericImage from '../image/GenericImage.svelte';
	import Link from '$lib/common/components/link/Link.svelte';
	import {
		addEventListeners,
		currentBreakpoint,
		getBreakpoint,
		initializeBreakpoint,
		removeEventListeners
	} from '$lib/common/utils/breakpoint';

	export let Layout: string;
	export let ctaText: string;
	export let cardList: ICard[];
	export let linkText: string;
	let displayedCards: number;
	if (Layout === 'Layout1') {
		displayedCards = 4;
	} else {
		displayedCards = 2;
	}

	/**
	 * Initializes breakpoint.
	 *
	 * This function should be called to set up initial breakpoint configurations,
	 * such as defining responsive behaviors or adapting layouts based on screen size.
	 */
	initializeBreakpoint();
	let isLargeScreen = getBreakpoint() === 'large';
	let isMediumScreen = getBreakpoint() === 'medium';

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
		if (Layout === 'Layout2') {
			if (isLargeScreen) {
				displayedCards = 5;
			} else if (isMediumScreen) {
				displayedCards = 3;
			} else {
				displayedCards = 2;
			}
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
	 * Increases the number of cards to be displayed.
	 *
	 * This function increments the `displayedCards` variable by 4 if layout is Layout1 and 5 in case of Layout2,
	 * effectively increasing the number of documents to be displayed.
	 *
	 */
	const handleLoadMore = () => {
		if (Layout === 'Layout1') {
			displayedCards += 4;
		} else {
			if (isLargeScreen) {
				displayedCards += 5;
			} else if (isMediumScreen) {
				displayedCards += 3;
			} else {
				displayedCards += 2;
			}
		}
	};

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

<div class="common-padding">
	{#if cardList?.length > 0}
		{#if Layout === 'Layout1'}
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{#each cardList.slice(0, displayedCards) as card}
					<Link
						href={card?.link?.href}
						isOpenNewTab={Boolean(card?.link?.target)}
						classList="group"
					>
						<div
							class="flex flex-col gap-4 p-6 h-full bg-white border border-ng-gray-300 rounded-ng10 shadow-ng3"
						>
							<GenericImage
								Image={{
									src: card?.image?.src,
									alt: card?.image?.altText,
									class: `h-ng52 w-ng52`
								}}
							/>
							<h3 class="text-2xl font-lato font-bold text-black leading-ng142P">{card?.title}</h3>
							{#if card?.description}
								<h4 class="text-base leading-ng142P font-medium font-poppins text-ng-gray-650">
									{card?.description}
								</h4>
							{/if}
							{#if card?.link?.href && linkText}
								<Link
									classList="text-ng font-roboto text-sm not-italic font-normal leading-ng160P inline-flex items-center gap-1 group-hover:scale-y-ng1dt08 group-hover:scale-x-ng1dt08 origin-left [transition:transform_0.3s_ease-out] group-hover:[transition:transform_0.3s_ease]"
									href={card?.link?.href}
									isOpenNewTab={Boolean(card?.link?.target)}>{linkText} &gt;</Link
								>
							{/if}
						</div>
					</Link>
				{/each}
			</div>
		{:else}
			<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
				{#each cardList.slice(0, displayedCards) as card}
					<Link href={card?.link?.href} isOpenNewTab={Boolean(card?.link?.target)}>
						<div
							class="flex flex-col px-4 py-6 md:p-6 lg:py-6 lg:px-ng42 items-center gap-6 h-full bg-white border border-ng-gray-300 rounded-ng10 shadow-ng3"
						>
							<GenericImage
								Image={{
									src: card?.image?.src,
									alt: card?.image?.altText,
									class: `h-ng60 w-ng60 md:h-ng100 md:w-ng100`
								}}
							/>
							<h3 class="text-xl font-poppins font-medium text-black leading-ng142P text-center">
								{card?.title}
							</h3>
						</div>
					</Link>
				{/each}
			</div>
		{/if}
		{#if cardList?.length > displayedCards}
			<div class="flex justify-center mt-9">
				<button
					on:click={handleLoadMore}
					class="text-ng-blue-300 border border-ng-blue-300 bg-white px-3 py-1 rounded-ng5 flex items-center gap-3"
				>{ctaText}</button>
			</div>
		{/if}
	{/if}
</div>
