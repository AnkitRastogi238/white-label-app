<script lang="ts">
	import { CloseIcon } from '$src/lib/assets/icons';
	import Link from '../link/Link.svelte';

	export let isModalOpen = true;
	export let dataMessage: string = 'You need to sign in to view this information.';
	/**
	 * A boolean indicating whether the modal is open or not.
	 */
	let ModalOpen = true;
	const handleModalClose = () => {
		isModalOpen = false;
	};
</script>

{#if ModalOpen && isModalOpen}
	<div class="fixed z-60 inset-0 bg-black bg-opacity-60 backdrop-blur-ng8">
		<div class="fixed top-ng200 left-1/2 -translate-x-1/2">
			<div role="status" class="m-auto w-full flex items-center justify-center">
				<div
					class="relative flex w-ng360 md:w-ng540 lg:w-ng750 p-9 flex-col gap-6 bg-white rounded-lg border border-solid shadow-sm"
				>
					<button
						on:click={() => {
							handleModalClose();
						}}
						class="absolute top-ng10 right-ng10 w-6 h-6 bg-ng-gray-75 rounded-ng28 flex items-center justify-center px-1"
					>
						<span class="w-2.5 h-2.5">{@html CloseIcon}</span>
					</button>
					<p class="font-lato text-2xl font-semibold">
						{dataMessage}
					</p>
					<div class="flex justify-end gap-4 items-start self-stretch">
						<button
							class="border border-solid px-5 py-2 border-ng rounded-ng4 bg-white"
							on:click={() => {
								handleModalClose();
							}}
						>
							<span class="font-poppins text-ng-blue-400 text-sm leading-6 font-medium">Cancel</span
							></button
						>
						<Link
							href="/login"
							classList="border border-solid px-5 py-2 border-ng rounded-ng4 bg-ng"
						>
							<button
								on:click={() => ModalOpen = false}
								class="font-poppins text-white text-sm leading-6 font-medium text-nowrap"
								>Sign in</button
							></Link
						>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
