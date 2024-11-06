<script lang="ts">
	// internal dependency
	import GenericImage from '../image/GenericImage.svelte';

	/**
	 * A component that displays informative content with a heroBannerImage, altText.
	 * @param {string} altText - The alt text for heroBanner image.
	 * @param {string} bannerArcText - The richtext content for the arc.
	 */
	export let image: string;
	export let altText: string;
	export let title: string;
	export let description: string;
</script>

<div data-testid="hero-banner" class="relative">
	<div class="w-full h-ng640 bg-black">
		<GenericImage Image={{ class: `w-full h-full opacity-70 object-cover`, src: image, alt: altText }} />
	</div>
	<div class="absolute flex flex-col gap-6 top-ng168 text-center w-full text-white px-ng308">
		<h3 class="text-6xl font-roboto font-bold">{title}</h3>
		<h4 class="text-2xl font-poppins font-medium">{description}</h4>
	</div>
</div>
