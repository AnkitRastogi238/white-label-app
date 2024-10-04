<script lang="ts">
	export let href: string = '#'; // Default to '#' if no href is provided
	export let isOpenNewTab: boolean = false; // Determines if link should open in a new tab
	export let classList: string = '';
	export let rel: string = 'noopener noreferrer'; // Add 'rel' attribute when using target=_blank
	export let onClick: ((event: MouseEvent) => void) | undefined = undefined;
</script>

<a
	{href}
	{...isOpenNewTab ? { target: '_blank' } : {}}
	rel={isOpenNewTab ? rel : undefined}
	{...$$restProps}
	class={classList}
	on:click={onClick ? (event) => onClick(event) : undefined}
>
	<slot />
</a>
