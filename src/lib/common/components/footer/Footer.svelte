<script lang="ts">
	import GenericImage from '../image/GenericImage.svelte';
	import Link from '../link/Link.svelte';

	export let logo: any;
	export let menuList: any;
</script>

<div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
	<div class="sm:flex sm:items-center sm:justify-between">
		<Link
			href={logo?.link}
			isOpenNewTab={logo?.openInNewTab}
			classList="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
		>
			<GenericImage Image={{ src: logo?.image?.src, class: `h-8 bg-white rounded-xl`, alt: logo?.image?.altText }} />
			{#if logo?.title}
				<span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
					>{logo?.title}</span
				>
			{/if}
		</Link>
		<ul
			class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400"
		>
			{#if menuList?.length > 0}
				{#each menuList as item}
					<li>
						<Link
							href={item?.link}
							isOpenNewTab={item?.openInNewTab}
							classList="hover:underline me-4 md:me-6">{item?.title}</Link
						>
					</li>
				{/each}
			{/if}
		</ul>
	</div>
</div>
