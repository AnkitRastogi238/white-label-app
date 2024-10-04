<script lang="ts">
	//external dependencies
	import { onDestroy, onMount } from 'svelte';
	import Swiper from 'swiper';
	// Import Swiper modules
	import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
	import type { NavigationOptions, PaginationOptions, SwiperOptions } from 'swiper/types';

	import 'swiper/swiper-bundle.css'; // Import Swiper styles
	import CustomPagination from './CustomPagination.svelte';
	// internal dependency
	import NavigationButton from '$lib/common/components/swiper/NavigationButton.svelte';
	import type { ICustomNavigation, ICustomPagination, ISwiperStyle } from '$lib/common/types';

	// Initialize Swiper modules
	Swiper.use([Autoplay, EffectFade, Navigation, Pagination]);

	/**
	 * Variable to hold the Swiper instance or null if not initialized yet.
	 */
	let swiper: Swiper | null = null;

	/**
	 * Options object for configuring the Swiper instance.
	 */
	export let options: SwiperOptions = {};

	/**
	 * Name identifier for the Swiper component instance.
	 */
	export let swiperName: string;

	/**
	 * Swiper styles configuration object.
	 */
	export let swiperStyles: ISwiperStyle;

	/**
	 * Navigation configuration object.
	 */
	export let navigation: ICustomNavigation;

	/**
	 * Pagination configuration object.
	 */
	export let pagination: ICustomPagination;

	/**
	 * Callback function invoked when the Swiper instance is initialized.
	 * @param swiper The initialized Swiper instance.
	 */
	export let onSwiperInit: ((swiper: Swiper) => void) | undefined;

	/**
	 * Callback function invoked when the active slide changes.
	 * @param swiper The Swiper instance.
	 */
	export let onSlideChange: ((swiper: Swiper) => void) | undefined;

	/**
	 * Callback function invoked after the transition of a slide change has ended.
	 * @param swiper The Swiper instance.
	 */
	export let onSlideChangeTransitionEnd: ((swiper: Swiper) => void) | undefined;

	/**
	 * Callback function invoked just before the transition of a slide change starts.
	 * @param swiper The Swiper instance.
	 */
	export let onBeforeTransitionStart: ((swiper: Swiper) => void) | undefined;

	/**
	 * Pagination bullet color
	 */
	export let paginationBulletColor: string = 'white';

	/**
	 * Selector for the previous button element obtained from navigation options.
	 */
	const prevEl = (options?.navigation as NavigationOptions)?.prevEl as string;

	/**
	 * Selector for the next button element obtained from navigation options.
	 */
	const nextEl = (options?.navigation as NavigationOptions)?.nextEl as string;

	/**
	 * Selector for the pagination element obtained from pagination options.
	 */
	const paginationEl = (options?.pagination as PaginationOptions)?.el as string;

	// Initialize Swiper on component mount
	onMount(() => {
		if (!swiper) {
			const container = document.querySelector(`.${swiperName}`) as HTMLElement;
			swiper = new Swiper(container, {
				...options,
				on: {
					slideChange: () => {
						if (swiper && onSlideChange) {
							onSlideChange(swiper);
						}
					},
					slideChangeTransitionEnd: () => {
						if (swiper && onSlideChangeTransitionEnd) {
							onSlideChangeTransitionEnd(swiper);
						}
					},
					beforeTransitionStart: () => {
						if (swiper && onBeforeTransitionStart) {
							onBeforeTransitionStart(swiper);
						}
					}
				}
			});
			if (swiper && onSwiperInit) {
				onSwiperInit(swiper);
			}
		}
	});

	// Cleanup Swiper instance on component destruction
	onDestroy(() => {
		if (swiper) {
			swiper.destroy(true, true); // Cleanup Swiper completely
			swiper = null;
		}
	});
</script>

<div class="relative">
	<div class="swiper-container {swiperName} {swiperStyles?.containerClassList}">
		<div class="swiper-wrapper {swiperStyles?.wrapperClassList}">
			<!-- Slot for content (slides) -->
			<slot />
		</div>
	</div>
	<!-- Add navigation arrows if specified in options -->
	{#if options?.navigation && navigation?.isDefaultNav}
		<NavigationButton {navigation} {prevEl} {nextEl} />
	{/if}
</div>
<!-- Add pagination if specified in options -->
{#if options.pagination && pagination?.isDefaultPagination}
	<CustomPagination {pagination} {paginationEl} {paginationBulletColor} />
{/if}

<style lang="scss">
	/* Add any custom styles for the swiper container */
	.swiper-container {
		width: 100%;
	}
</style>
