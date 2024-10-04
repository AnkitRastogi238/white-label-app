<script lang="ts">
	// external dependencies
	import { onDestroy, onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	import { BriefArrow, WhiteDownArrow } from '$src/lib/assets/icons';
	// internal dependencies
	import GenericImage from '$lib/common/components/image/GenericImage.svelte';
	import type { AccordionData } from '$lib/common/types';

	/**
	 * Represents the data for grid accordian.
	 */
	export let data: AccordionData;

	let toggleButton: { [key: string]: HTMLElement | null } = {};
	let clickEventListeners: { area: HTMLElement; clickHandler: () => void }[] = [];
	const contentContainerClassList =
		'card-item-description content-description w-full relative left-0 py-6 px-6 md:py-6 md:px-6 lg:px-9 bg-ng text-white md:group-even:ml-ngCalm100m24by1 md:w-ngCal200P24px lg:w-ngCal400P72px lg:group-[:nth-of-type(4n+2)]:ml-ngCalm100m72by3 lg:group-[:nth-of-type(4n+3)]:ml-ngCalm200m72by1dt5 lg:group-[:nth-of-type(4n+4)]:ml-ngCalm300m72 mb-6 rounded-b-ng10 text-base font-poppins leading-ng140P';

	/**
	 * Function to handle accordion toggle event
	 * @param index - The index of the active accordion.
	 */
	function toggleActive(index: number) {
		data.cardList = data?.cardList.map((item, i) => ({
			...item,
			active: i === index ? !item?.active : false
		}));
	}
	// Use onMount to attach click event listeners
	onMount(() => {
		const clickAreas = toggleButton;
		Object.entries(clickAreas).forEach(([key, area], index) => {
			if (area && key) {
				const clickHandler = () => {
					toggleActive(index);
				};
				area.addEventListener('click', clickHandler);
				clickEventListeners.push({ area, clickHandler });
			}
		});
	});

	onDestroy(() => {
		clickEventListeners.forEach(({ area, clickHandler }) => {
			area.removeEventListener('click', clickHandler);
		});
		clickEventListeners = [];
	});
</script>

<div class="bg-white pt-12 pb-6 px-6 md:px-12 md:pt-10 md:pb-6 lg:px-14 lg:pt-9 lg:pb-9">
	{#if data?.isTitleRequired}
		<div class="mb-8 flex flex-col gap-6 text-black">
			{#if data?.title}
				<h3 class="text-ng40 md:text-6xl font-light leading-normal title-font font-roboto">
					{data?.title}
				</h3>
			{/if}
			{#if data?.subTitle}
				<p class="text-ng22 leading-ng30 font-normal font-lato">
					{data?.subTitle}
				</p>
			{/if}
		</div>
	{/if}
	{#if data?.cardList?.length > 0}
		<div
			class="card-grid relative flex justify-between {data?.cardList?.length % 4 === 0
				? ''
				: 'lg:gap-6 lg:justify-start'} flex-row flex-wrap"
		>
			{#each data?.cardList as item, index}
				<div
					class="card-item w-full md:w-ngCal50P12px lg:w-ngCal25P18px group"
					class:is--active={item?.active}
				>
					<div class="w-full rounded-ng10 mb-6">
						<GenericImage
							Image={{
								class: `aspect-ng314by310 rounded-t-ng10 w-full object-cover`,
								src: item?.image?.src,
								alt: item?.image?.altText
							}}
						/>
						<div
							class="cursor-pointer card-item-content relative min-h-ng126 flex flex-row gap-10 justify-between items-center text-white bg-ng-black-400 px-4 py-6 rounded-b-ng10"
							bind:this={toggleButton[index]}
						>
							<div class="flex flex-col gap-3 items-start">
								{#if item?.name}
									<p class="card-item-name font-lato text-lg leading-ng18 font-semibold">
										{item?.name}
									</p>
								{/if}
								{#if item?.designation}
									<p
										class="card-item-title font-poppins text-sm leading-ng140P font-normal line-clamp-2"
									>
										{item?.designation}
									</p>
								{/if}
							</div>
							<div class="arrow-svg">
								{@html WhiteDownArrow}
							</div>
							<div
								class="card-item-brief-arrow opacity-0 h-ng39 absolute -bottom-ng58 left-1/2 -translate-x-1/2 pointer-events-none"
							>
								{@html BriefArrow}
							</div>
						</div>
					</div>
					{#if item?.active}
						<div
							class={contentContainerClassList}
							in:slide={{ delay: 150, duration: 600 }}
							out:slide={{ delay: 0, duration: 200 }}
						>
							{@html item?.content}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">
	.card-item.is--active {
		.card-item-content {
			background-color: var(--ng-yellow);
			color: var(--ng-black);
			margin-bottom: 56px;
		}

		.arrow-svg {
			transform: rotate(-180deg);

			:global(svg path) {
				fill: black;
			}
		}

		.card-item-description {
			display: block;
		}

		.card-item-brief-arrow {
			opacity: 1;
			transition: opacity 0.2s ease-in;
		}
	}
</style>
