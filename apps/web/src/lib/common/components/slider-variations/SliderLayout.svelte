<script lang="ts">
	// internal dependencies
	import Slider from '$lib/common/components/card-slider/Slider.svelte';
	import type { CardList } from '$lib/common/types';

	/**
	 * An object containing data for the regular card slider.
	 */
	export let slider: CardList;

	/**
	 * The subheading text to display for the regular card slider.
	 */
	export let title: string;

	/**
	 * The subheading text to display for the regular card slider.
	 */
	 export let description: string;

	/**
	 * The CSS style class for the arrow buttons in the regular card slider.
	 */
	export let arrowStyle: string;
</script>

<div class="min-h-ng43">
	{#if slider?.cardList?.length > 0}
		<div>
			<Slider cardList={slider?.cardList} {arrowStyle} {title} {description} />
		</div>
	{/if}
</div>
