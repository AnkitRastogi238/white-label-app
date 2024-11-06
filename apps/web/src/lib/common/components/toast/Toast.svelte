<script lang="ts">
	import { fade } from 'svelte/transition';
	export let message: string = '';
	export let bgColor: string = '';
	export let textColor: string = '';
	export let duration: number = 12000; // Duration in milliseconds

	let visible: boolean = false;
	let timeout: number;

	/**
	 * Handles display of the toast message
	 */
	function showToast() {
		visible = true;
		timeout = setTimeout(() => {
			message = '';
			visible = false;
		}, duration);
	}
	/**
	 * Handles closing of toast message
	 */
	function closeToast() {
		clearTimeout(timeout);
		visible = false;
	}

	$: {
		if (message) {
			showToast();
		}
	}
</script>

{#if visible && message}
	<div
		class="gap-2 rounded z-ng999 flex items-center text-{textColor} {bgColor} p-3 fixed bottom-6 left-1/2 -translate-x-2/4"
		transition:fade
		data-testId="toast-container"
	>
		<span class="min-w-ng210 text-base font-poppins font-normal">{message}</span>
		<button type="button" class="cursor-pointer" on:click={closeToast}>&#10005;</button>
	</div>
{/if}
