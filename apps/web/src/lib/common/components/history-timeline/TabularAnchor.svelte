<script lang="ts">
	// external dependencies
	import scrollIntoView, { type StandardBehaviorOptions } from 'scroll-into-view-if-needed';
	import { onDestroy, onMount } from 'svelte';
	
	// internal dependencies
	import TimelineCard from './TimelineCard.svelte';
	import { browser } from '$app/environment';
	import GetIcon from '$lib/common/components/GetIcon.svelte';
	import type { TabularAnchor } from '$lib/common/types';
	import {
		addEventListeners,
		currentBreakpoint,
		getBreakpoint,
		initializeBreakpoint,
		removeEventListeners
	} from '$lib/common/utils/breakpoint';

	/**
	 * anchorTabs props of type TimelineTab
	 */
	export let anchorTabs: TabularAnchor[];

	/**
	 * activeTab variable
	 */
	let activeTab: number = 0;

	/**
	 * tabsContainer an HTMLElement containing all the tabs
	 */
	let tabsContainer: HTMLElement;
	let showPrevButton = false; // flag for the visibility of the next button
	let showNextButton = false; // flag for the visibility of the next button
	let disablePrevButton = true; // flag to disable the previous button
	let disableNextButton = false; // flag to disable the next button
	let resizeObserver: ResizeObserver | null = null; // resizeObserver initialization
	/**
	 * A particular tab HTML element
	 */
	let tab: HTMLElement;

	/**
	 * Dictionary of section elements.
	 * Keys are string identifiers, values are HTMLElements or null.
	 */
	let sectionElements: { [key: string]: HTMLElement | null } = {};

	/**
	 * Dictionary of tab button elements.
	 * Keys are string identifiers, values are HTMLElements or null.
	 */
	let tabButtonElement: { [key: string]: HTMLElement | null } = {};

	// gap on mobile default value
	let gap: number = 138;

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
	 * such as determining if the screen is large,medium-sized or small, and adjusts and updates the gap value accordingly
	 * @param newBreakpoint - The new breakpoint value ('large' or 'medium').
	 */
	const handleBreakpointChange = (newBreakpoint: string) => {
		isLargeScreen = newBreakpoint === 'large';
		isMediumScreen = newBreakpoint === 'medium';
		if (isLargeScreen) {
			gap = 196;
		} else if (isMediumScreen) {
			gap = 158;
		}
	};

	/**
	 * calling handleBreakpoint change initially
	 */
	handleBreakpointChange(currentBreakpoint);

	/**
	 * reactive element calls scrollIntoViews whenever active tab value changes.
	 */
	$: {
		scrollIntoViews(activeTab);
	}
	/**
	 * Lifecycle function that runs when the component is mounted.
	 *
	 * It performs the following actions:
	 * 1. Adds an event listener to the tabs container for the 'scroll' event
	 *    and calls the `updateButtonVisibility` function when the event is triggered.
	 * 2. Calls the `updateButtonVisibility` function initially.
	 *
	 * Initializes the ResizeObserver instance and starts observing the tabs container.
	 * The `updateButtonVisibility` function is called when the size of the tabs container changes.
	 */
	onMount(() => {
		addEventListeners(handleBreakpointChange);
		tabsContainer?.addEventListener('scroll', updateButtonVisibility);
		updateButtonVisibility();

		/**
		 * Initialize the ResizeObserver
		 */
		resizeObserver = new ResizeObserver(updateButtonVisibility);
		resizeObserver.observe(tabsContainer);

		window.addEventListener('scroll', activeTabOnScroll);
	});

	/**
	 * Cleanup function that runs when the component is destroyed.
	 * It disconnects the ResizeObserver, breakpoints and scroll event.
	 */
	onDestroy(() => {
		if (resizeObserver) {
			resizeObserver.disconnect();
		}

		removeEventListeners();

		if (browser) {
			window.removeEventListener('scroll', activeTabOnScroll);
		}
	});

	/**
	 * function to map every section and find the active section based on scroll position
	 */
	const activeTabOnScroll = () => {
		let scrollY = window.scrollY;
		anchorTabs.forEach((tab, index) => {
			const sectionElement = sectionElements[index];
			if (sectionElement) {
				const sectionHeight = sectionElement?.offsetHeight;
				const sectionTop = sectionElement?.getBoundingClientRect()?.top + window.scrollY - gap;
				sectionElement.setAttribute('data-index', index.toString());
				if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
					activeTab = index;
				}
			}
		});
	};
	/**
	 * Handles the scroll to the next section of the timeline tabs.
	 * It scrolls the tabs container to the right by the width of the container
	 * and updates the visibility of the previous and next buttons accordingly.
	 */
	const handleMoveToNext = () => {
		if (tabsContainer) {
			tabsContainer.scrollLeft += tabsContainer.offsetWidth;
			updateButtonVisibility();
		}
	};

	/**
	 * Handles the scroll to the previous section of the timeline tabs.
	 * It scrolls the tabs container to the left by the width of the container
	 * and updates the visibility of the previous and next buttons accordingly.
	 */
	const handleMoveToPrev = () => {
		if (tabsContainer) {
			tabsContainer.scrollLeft -= tabsContainer.offsetWidth;
			updateButtonVisibility();
		}
	};

	/**
	 * function to update button visibility on tab move
	 */
	const updateButtonVisibility = () => {
		if (tabsContainer) {
			const containerWidth = tabsContainer.offsetWidth;
			const totalTabsWidth = anchorTabs?.length * 172; // Assuming each tab has a width of 172px

			// Show buttons if total tabs width exceeds container width
			showPrevButton = totalTabsWidth > containerWidth;
			showNextButton = totalTabsWidth > containerWidth;

			// Disable the previous button if there is no scrollable content to the left
			disablePrevButton = tabsContainer.scrollLeft === 0;
			// Disable the next button if there is no scrollable content to the right
			disableNextButton = tabsContainer.scrollLeft + containerWidth >= totalTabsWidth;
		} else {
			// If tabsContainer is not available, hide both buttons
			showPrevButton = false;
			showNextButton = false;
			disablePrevButton = true;
			disableNextButton = true;
		}
	};

	/**
	 * Scrolls the window to a specified section on the page.
	 * sectionId - The ID of the section to scroll to.
	 * @param sectionId - string
	 */
	const scrollToSection = (sectionId: number) => {
		const section = sectionElements[sectionId];
		activeTab = sectionId;
		if (section) {
			const headerHeight = tab?.offsetHeight || 0;
			const sectionTop =
				section.getBoundingClientRect().top + window.scrollY - headerHeight + gap - 100;
			window.scrollTo({ top: sectionTop, behavior: 'auto' });
		}
	};

	/**
	 * function to handle the logic of scrolling the active tab into the view
	 * @param index : number
	 */
	const scrollIntoViews = async (index: number) => {
		const activeTabElement = tabButtonElement[index];
		if (activeTabElement) {
			scrollIntoView(activeTabElement, {
				behavior: 'smooth',
				scrollMode: 'if-needed',
				block: 'nearest',
				inline: 'nearest'
			} as StandardBehaviorOptions);
		}
	};
</script>

<div>
	<div
		id="primary-tab"
		class="sticky scroll-smooth top-0 md:-top-12 lg:-top-lk60 z-20"
		bind:this={tab}
	>
		<div class="bg-lkea-gray-600 py-6 md:py-12 lg:pt-lk60 lg:pb-12">
			<div class="flex items-center relative" role="tablist">
				{#if showPrevButton}
					<button
						class="p-1 rounded-full left-9 z-50 rotate-180 absolute hidden lg:block {disablePrevButton
							? 'pointer-events-none bg-gray-200 cursor-not-allowed'
							: 'bg-lkea'}"
						on:click={handleMoveToPrev}
						aria-label="Previous"
					>
						<GetIcon classList="w-6 h-6" stroke="white" />
					</button>
				{/if}

				{#if showNextButton}
					<button
						class="p-1 rounded-full absolute z-50 right-9 hidden lg:block {disableNextButton
							? 'pointer-events-none bg-gray-300 cursor-not-allowed'
							: 'bg-lkea'}"
						on:click={handleMoveToNext}
						aria-label="Next"
					>
						<GetIcon classList="w-6 h-6" stroke="white" />
					</button>
				{/if}

				<div
					class="svg-fill-white scroll-smooth flex overflow-auto [scrollbar-width:none] ml-4 md:ml-6 lg:mx-lk56"
					bind:this={tabsContainer}
				>
					{#if anchorTabs?.length > 0}
						{#each anchorTabs as timelineTab, index}
							<button
								on:click={() => scrollToSection(index)}
								class="flex flex-col scroll-smooth p-2 md:py-4 md:px-lk10 lg:p-6 border-solid cursor-pointer items-center border {index ===
								activeTab
									? 'active-tab bg-lkea text-white'
									: 'bg-white text-black'}"
								data-testId="tab-{index + 1}"
								bind:this={tabButtonElement[index]}
							>
								<span class="tab-icon mb-4 md:mb-3 lg:mb-4">{@html timelineTab?.svgIcon}</span>
								<h3
									class="w-20 md:w-28 lg:w-lk124 h-auto text-xs leading-4 md:text-base font-lato md:leading-5 font-bold text-center"
								>
									{timelineTab?.title}
								</h3>
								<span
									class="w-20 md:w-lk104 lg:w-lk124 text-xs md:text-base font-lato leading-4 md:leading-5 font-medium"
									>{timelineTab?.subTitle}</span
								>
							</button>
						{/each}
					{/if}
				</div>
			</div>
		</div>
	</div>

	{#if anchorTabs}
		{#each anchorTabs as timelineTab, index}
			<TimelineCard
				bind:sectionElements
				subList={timelineTab?.subList}
				image={timelineTab?.image}
				description={timelineTab?.description}
				title={timelineTab?.title}
				year={timelineTab?.subTitle}
				alignment={timelineTab?.textImageAlignment}
				id={timelineTab?.id}
				{index}
				altText={timelineTab?.altText}
			/>
		{/each}
	{/if}
</div>

<style lang="scss">
	.svg-fill-white {
		.active-tab {
			:global(svg path) {
				fill: white;
			}
		}

		.tab-icon {
			:global(svg) {
				height: 1.5rem;
				width: 1.5rem;

				@media (min-width: 1024px) {
					width: 2.625rem;
					height: 2.625rem;
				}
			}
		}
	}
</style>
