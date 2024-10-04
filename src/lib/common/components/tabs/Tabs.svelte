<script lang="ts">
	// external dependencies
	import * as BuilderSDK from '@builder.io/sdk-svelte';

	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	import { page } from '$app/stores';
	// internal dependencies
	import type { Tab } from '$lib/common/types';

	/**
	 * Array to store ProductTabData objects representing different product tabs.
	 */
	export let tabData: Tab[];

	// tabButtonElement to bind the button to check the active tab
	let tabButtonElement: { [key: string]: HTMLElement | null } = {};
	let tabAnchor: { [key: string]: HTMLElement | null } = {};

	// for block padding
	export let isPaddingRequired: boolean;

	/**
	 * BuilderBlock
	 */
	export let builderBlock: BuilderSDK.Blocks;

	// title for the tabsection
	export let title: string;

	/**
	 * Index of the currently active tab.
	 */
	let activeTab = 0;

	/**
	 * Represents the bg color of the component.
	 */
	export let bgColor = 'white';

	// Tag Theme colors definition
	const themeColor: { [key: string]: string } = {
		White: 'white',
		PrimaryLightGrey: 'ng-gray-250'
	};

	/**
	 * @param index number
	 * function to change the tab
	 */
	const handleActiveTab = (index: number) => {
		activeTab = index;
		const active = tabButtonElement[tabData[activeTab]?.apiName];
		active?.scrollIntoView({ block: 'nearest' });
	};

	// Handles the logic of showing the tab active on the condition of matching the url params with the apiName
	onMount(() => {
		const hash = $page?.url?.hash?.slice(1);
		if (hash && tabData?.length > 0) {
			const index = tabData?.findIndex((tab) => tab?.apiName === hash);
			if (index !== -1) {
				activeTab = index;
				const active = tabButtonElement[tabData[activeTab]?.apiName];
				active?.scrollIntoView({ block: 'center' });
				const topSection = tabAnchor['tabular-anchor'];
				topSection?.scrollIntoView({ behavior: 'smooth' });
			}
		}
	});
</script>

<section
	class="pl-6 md:pl-12 lg:px-14 pt-12 lg:pt-ng60 {themeColor[bgColor]
		? `bg-${themeColor[bgColor]}`
		: 'bg-white'} {isPaddingRequired ? 'pb-6 lg:pb-12' : 'pb-0'}"
	bind:this={tabAnchor['tabular-anchor']}
>
	{#if title}
		<div
			class="text-ng40 md:text-ng60 leading-normal font-light font-roboto pb-6 text-center lg:text-left"
			data-testId="title"
		>
			{title}
		</div>
	{/if}
	<div class="document-tab relative">
		<div class="border-b-2 w-full absolute bottom-ng1 border-ng-gray-350"></div>
		<div class="flex scroll-smooth overflow-auto [scrollbar-width:none]">
			{#if tabData?.length > 0}
				{#each tabData as tab, index}
					<button
						class="font-poppins flex items-center gap-1.5 h-12 px-4 py-3 rounded-t-ng5 {activeTab ===
						index
							? 'bg-ng-gray-400  border-ng-blue-300 border-b-4 z-10'
							: 'bg-transparent'}
                {themeColor[bgColor] == 'ng-gray-250' && activeTab === index
							? 'bg-white'
							: 'bg-ng-gray-400'}"
						on:click={() => handleActiveTab(index)}
						data-testId="active-tab-{index + 1}"
						bind:this={tabButtonElement[tab?.apiName]}
						><span
							class="font-poppins text-base leading-ng30 whitespace-nowrap {activeTab === index
								? 'text-ng-blue-300 font-bold '
								: 'text-ng-gray-800 font-normal'}">{tab?.name}</span
						></button
					>
				{/each}
			{/if}
		</div>
	</div>
</section>
{#if builderBlock && builderBlock?.id && tabData?.length > 0}
	{#key activeTab}
		<div
			in:fade={{ duration: 800, delay: 100 }}
			class={isPaddingRequired ? 'px-6 md:px-12 lg:px-14 pb-12 lg:pb-ng60' : ''}
		>
			<BuilderSDK.Blocks
				parent={builderBlock?.id}
				path={`component.options.tabData.${activeTab}.children`}
				blocks={tabData[activeTab]?.children}
			/>
		</div>
	{/key}
{/if}
