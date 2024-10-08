<script lang="ts">
	import Link from '../../link/Link.svelte';

	export let title: string;
	export let link: string;
	export let openInNewTab: boolean;
</script>

<span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400"
	><Link href={link} isOpenNewTab={openInNewTab} classList="hover:underline">{title}</Link></span
>
