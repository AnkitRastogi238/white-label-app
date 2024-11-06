<script lang="ts">
	// internal dependencies
	import { onMount } from 'svelte';

	import { EnquiryFloatingButtonIcon, FeedBackFloatingButtonIcon } from '$src/lib/assets/icons';
	import { SlidePopup } from '../side-popup';
	/**
	 * entityList: List of entities used in a dropdown or selection list.
	 * value: Flag to handle the opening of modal
	 */
	// let entityList: any;
	let value: boolean = false;
	let feedbackValue: boolean = false;
	// const fieldName = 'Entity List';
	// let toastMessage: string;
	// let toastBgColor: string;
	let isVisible: boolean = false;

	onMount(async () => {
		setTimeout(() => {
			isVisible = true;
		}, 10000);
	});

	// /**
	//  *
	//  * @param event- Event for toast msg
	//  * @param event
	//  */
	// function handleFormSubmit(event: CustomEvent) {
	//   const { message, bgColor } = event.detail;

	//   toastMessage = message;
	//   toastBgColor = bgColor;
	// }
</script>

<!--   
  <div class="z-ng99999 fixed">
    <Toast bind:message={toastMessage} bind:bgColor={toastBgColor} textColor="white" />
  </div> -->
{#if isVisible}
	<div class="fixed bottom-1/2 right-0 left-auto z-ng999 flex flex-col gap-4 items-end">
		<button
			data-testid="enquiry-button"
			class="rounded-l-ng50 bg-ng-blue-400 text-white w-full lg:w-ng72 py-3 px-6 flex gap-3 items-center lg:hover:w-ng152 transition-all duration-300 ease-in-out group"
			on:click={() => {
				value = true;
				feedbackValue = false;
			}}
		>
			<span>{@html EnquiryFloatingButtonIcon}</span>
			<span
				class="lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
				>Enquiry</span
			>
		</button>
		<button
			data-testid="feedback-button"
			class="rounded-l-ng50 bg-ng-blue-400 text-white w-full lg:w-ng72 py-3 px-6 flex gap-3 items-center lg:hover:w-ng152 transition-all duration-300 ease-in-out group"
			on:click={() => {
				feedbackValue = true;
				value = false;
			}}
		>
			<span>{@html FeedBackFloatingButtonIcon}</span>
			<span
				class="lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
				>Feedback</span
			>
		</button>
	</div>
{/if}
<SlidePopup bind:isModalOpen={value} title="Enquiry">
	<!-- <EnquireNow bind:isModalOpen={value} {entityList} on:formSubmitted={handleFormSubmit} /> -->
</SlidePopup>

<!-- <CommonLayout bind:isModalOpen={feedbackValue} title="Feedback">
    <Feedback {entityList} bind:isModalOpen={feedbackValue} on:formSubmitted={handleFormSubmit} />
  </CommonLayout> -->

<style lang="scss">
	@media (max-width: 1024px) {
		.fixed {
			position: fixed;
			left: auto;
		}
	}
</style>
