<script lang="ts">
	// internal dependencies
	import { DottedBg } from '$lib/assets/images';
	import GenericImage from '$lib/common/components/image/GenericImage.svelte';
	import type { SubList } from '$lib/common/types';

	/**
	 * An array of objects representing the sub-list items, where each object contains properties like `subHeading` and `subDescription`.
	 */
	export let subList: SubList[];

	/**
	 * The description text for the timeline card
	 */
	export let description: string;

	/**
	 * The URL or path to the image for the timeline card.
	 */
	export let image: string;

	/**
	 * The title text for the timeline card.
	 */
	export let title: string;

	/**
	 * The year or year range for the timeline card.
	 */
	export let year: string;

	/**
	 * The alignment of the text and image in the timeline card.
	 * Possible values: 'imageOnRight-textOnLeft', 'imageOnLeft-textOnRight'
	 */
	export let alignment: string;

	/**
	 * Variable to bind the particular section with the id
	 */
	export let sectionElements: { [key: string]: HTMLElement | null } = {};

	/**
	 * Index accepted as props
	 */
	export let index: number;

	/**
	 * The id accepted as the props
	 */
	export let id: string;

	/**
	 * The alt Text for an image
	 */

	export let altText: string;
</script>

<section id={id ? id + index : 'section_' + index} bind:this={sectionElements[index]}>
	<div class="text-black body-font overflow-hidden bg-ng-gradient-lightgray py-12 lg:py-ng60">
		<div class="block md:flex">
			<div
				class="w-full md:w-ng348 lg:w-ng592 md:mt-0 flex-shrink-0 relative {alignment !=
				'imageOnRight-textOnLeft'
					? 'order-1'
					: 'order-2'}"
				data-aos={alignment != 'imageOnRight-textOnLeft' ? 'fade-right' : 'fade-left'}
				data-aos-delay="100"
				data-aos-once="true"
			>
				<div
					class="flex items-center h-full relative {alignment != 'imageOnRight-textOnLeft'
						? 'justify-start md:justify-center'
						: 'justify-end md:justify-center'}"
				>
					<GenericImage
						Image={{
							src: DottedBg,
							alt: 'dotted-bg',
							class: `lg:w-ng592 absolute opacity-80 lg:opacity-50 ${
								alignment == 'imageOnRight-textOnLeft' ? 'right-0 rotate-180' : 'left-0'
							}`
						}}
					/>
					<GenericImage
						Image={{
							src: image,
							alt: altText,
							class: `w-full md:h-ng355 lg:h-ng476 z-10 md:object-contain`
						}}
					/>
				</div>
			</div>
			<div
				class="px-6 mt-12 md:mt-0 {alignment != 'imageOnRight-textOnLeft'
					? 'md:pr-12 md:pl-0 lg:pr-ng56 order-2 md:ml-6'
					: 'md:pl-12 md:pr-0 lg:pl-ng56 order-1 md:mr-6'}"
				data-aos={alignment != 'imageOnRight-textOnLeft' ? 'fade-left' : 'fade-right'}
				data-aos-delay="100"
				data-aos-once="true"
			>
				<p class="text-4xl font-roboto font-light leading-ng142P">{title}</p>
				<p class="text-ng font-lato text-lg font-bold leading-ng142P">{year}</p>
				<p class="mt-12 font-lato content-description text-base font-normal leading-ng142P">
					{@html description}
				</p>
				{#if subList?.length > 0}
					{#each subList as list}
						<div class="mt-8">
							<p class="font-lato text-lg content-description font-bold leading-ng142P">
								{@html list?.title}
							</p>
							<p class="font-lato text-base content-description font-normal leading-ng142P mt-6">
								{@html list?.description}
							</p>
						</div>
					{/each}
				{/if}
			</div>
		</div>
	</div>
</section>
