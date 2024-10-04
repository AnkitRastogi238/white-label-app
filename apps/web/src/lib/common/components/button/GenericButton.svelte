<script lang="ts">
	import Link from '../link/Link.svelte';

	/**
	 * The ctaText of the button is a prop to display button text it is of type string.
	 */
	export let ctaText: string | undefined;

	/**
	 * The ctaImage of the button is a prop to display image on the button it is a prop of type string
	 */
	export let ctaImage: string = '';

	/**
	 * The ctaLink of the button is a prop it is a url to redirect user on button click
	 */
	export let ctaLink: string | undefined;

	/**
	 * The ctaBgColor of the button is a prop to set the background color of the button.
	 */
	export let ctaBgColor: string = '';

	/**
	 * The ctaTextColor of the button is a prop to set the text color of the button.
	 */
	export let ctaTextColor: string = '';

	/**
	 * The ctaBorderColor of the button is a prop to set the border color of the button.
	 */
	export let ctaBorderColor: string = '';

	/**
	 * The rotate of the button is a prop it is a rotate degree to rotate image in degree
	 */
	export let rotate: string = '0deg';

	/**
	 * The ctaTarget of the button is a prop it is to open the tab in new window or in same window
	 */
	export let ctaTarget: string = '';

	/**
	 * The ctaClassList contains the css classes
	 */
	export let ctaClassList: string = '';

	/**
	 * The canBeDownloaded property of the button is a prop used to download a document.
	 */
	export let canBeDownloaded: boolean = false;

	export let btnBgColor: string = '';
	/**
	 * The iconSizeStyle of the button is a prop it contain the style related to height and width of icon
	 */
	export let iconSizeStyle: string = '';
	/**
	 * callback function if it can be downloaded
	 */
	export let handleDownload: (() => void) | undefined = () => {};

	/**
	 * handle Download option if canBeDownloaded passed prop is true
	 */
	const handleDownloadButton = () => {
		if (handleDownload && canBeDownloaded) handleDownload();
	};

	let isHashIncuded: boolean = false;
	if (ctaLink?.includes('#')) {
		isHashIncuded = true;
	}

	/**
	 * hnadleDocumentsLink is for scrolling documents
	 * @param event mouse event
	 */
	function handleDocumentsLink(event: MouseEvent) {
		event.preventDefault();
		const hashValue = ctaLink?.slice(1);
		const documentsElement = document.getElementById(String(hashValue));
		if (documentsElement) {
			documentsElement?.scrollIntoView({ behavior: 'smooth' });
		}
	}
</script>

<!-- @component cta Button -->

<Link
	href={typeof handleDownload === 'function' && canBeDownloaded ? undefined : ctaLink}
	isOpenNewTab={ctaTarget === '_blank' ? true : false}
	{...canBeDownloaded ? { download: ctaText } : {}}
	classList="test-btn cursor-pointer text-sm {ctaClassList
		? ctaClassList
		: 'px-3 py-2 !leading-ng30'} h-9 w-fit whitespace-nowrap flex align-middle rounded-ng5 lg:mx-0 {ctaBorderColor
		? `border border-${ctaBorderColor}`
		: ''}  {ctaBgColor ? `bg-${ctaBgColor}` : 'bg-ng-blue-400'} "
>
	{#if canBeDownloaded}
		<button
			class="cta-link flex items-center font-poppins gap-3 lg:text-sm font-medium {ctaTextColor
				? `text-${ctaTextColor}`
				: 'text-white'}"
			on:click={handleDownloadButton}
		>
			{ctaText}
			{#if ctaImage}
				<span
					class="cta-text rounded-full w-ng18 h-ng18 bg-ng-blue-900 flex justify-center items-center {rotate}"
					>{@html ctaImage}
				</span>
			{/if}
		</button>
	{:else}
		<button
			class="cta-link flex items-center font-poppins gap-3 lg:text-sm font-medium {ctaTextColor
				? `text-${ctaTextColor}`
				: 'text-white'}"
			on:click={isHashIncuded ? handleDocumentsLink : null}
			>{ctaText}{#if ctaImage}
				<span
					class="cta-text rounded-full {btnBgColor
						? `bg-${btnBgColor}`
						: 'bg-ng-blue-900'}  flex justify-center items-center {rotate} {iconSizeStyle
						? iconSizeStyle
						: 'w-ng18 h-ng18'}"
					>{@html ctaImage}
				</span>
			{/if}
		</button>
	{/if}
</Link>
