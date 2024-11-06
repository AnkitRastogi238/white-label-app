<script lang="ts">
	// external dependencies
	import { fade, fly } from 'svelte/transition';

	// internal dependencies
	import { BlueCloseIcon, CloseIcon } from '$lib/assets/icons';

	/**
	 * isModalOpen : Flag to control the opening of form modal
	 * title: Title for the form
	 */
	export let isModalOpen: boolean = false;
	export let title: string = 'Enquiry';

	/**
	 * Function to handle the closing of modal
	 */
	const handleModalClose = () => {
		isModalOpen = false;
	};
    
</script>

{#if isModalOpen}
	<!-- Desktop version -->
	<div class="fixed z-ng9999 inset-0 md:block hidden" transition:fade={{ duration: 300 }}>
		<div class="h-dvh relative">
			<button
				on:click={handleModalClose}
				class="absolute top-ng10 z-ng9999 right-ng10 w-6 h-6 bg-ng-gray-75 rounded-ng28 flex items-center justify-center px-1"
			>
				<span>{@html CloseIcon}</span>
			</button>
			<div
				role="status"
				class="w-fit h-dvh content-center ml-auto overflow-y-auto frame bg-ng-white-300 border-l rounded-l-lg border-ng-gray-390 shadow-nglightgray"
				in:fly={{ x: 500, duration: 1000 }}
				out:fly={{ x: 800, duration: 2000 }}
			>
				<div class="relative ml-auto w-ng414 p-9 flex flex-col gap-4">
					<p class="font-lato text-2xl font-semibold">
						{title}
					</p>
					<slot />
				</div>
			</div>
		</div>
	</div>

	<!-- Mobile version -->
	<div class="fixed block md:hidden inset-0 bg-black bg-opacity-60 z-ng9998"></div>
	<div
		class="fixed inset-x-0 md:hidden top-14 bottom-auto bg-white rounded-t-ng10 z-50 {isModalOpen
			? 'translate-y-0'
			: 'translate-y-full'} h-full overflow-hidden z-ng9999"
		data-testid="filter-values-container-mobile"
	>
		<div class="flex justify-between items-center mx-6 pt-6 pb-2 border-b-2 border-b-ng-gray-350">
			<h2 class="text-base text-ng-gray-975 font-poppins font-normal leading-5">{title}</h2>
			<button on:click={handleModalClose} class="text-gray-500 text-2xl" data-testid="close-button"
				>{@html BlueCloseIcon}</button
			>
		</div>
		<div class="flex h-full w-full">
			<div class="w-full overflow-y-auto frame h-full p-6 pb-32">
				<slot />
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	.frame::-webkit-scrollbar {
		-webkit-appearance: none;
	}
	.frame::-webkit-scrollbar:vertical {
		width: 8px;
	}
	.frame::-webkit-scrollbar:horizontal {
		height: 11px;
	}
	.frame::-webkit-scrollbar-thumb {
		border-radius: 8px;
		border: 2px solid white;
		background-color: rgba(0, 0, 0, 0.2);
	}
</style>
