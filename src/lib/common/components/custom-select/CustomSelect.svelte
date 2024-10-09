<script lang="ts">
	// external dependencies
	import { createEventDispatcher, onMount } from 'svelte';

	// internal dependencies
	import { DisabledArrow, DownLightGrayArrow } from '$lib/assets/icons';
	import { openSelectId } from '$src/lib/common/store';

	export let options: { value: string; label: string }[];
	export let value: string | null | undefined = '';
	export let fieldName: string = '';
	export let placeholder: string = 'Select an option';
	export let name: string = '';
	export let customClass: string = 'border-ng-gray-280';
	export let disabled: boolean = false;
	export let id = '';
	export let background: string = 'bg-white border-ng-gray-280';

	let isOpen = false;
	let selectElement: HTMLDivElement;
	let dropdownElement: HTMLDivElement;
	const dispatch = createEventDispatcher();

	onMount(() => {
		document.addEventListener('click', handleClickOutside);

		const unsubscribe = openSelectId.subscribe((currentOpenId:any) => {
			if (currentOpenId !== id) {
				isOpen = false;
			}
		});

		return () => {
			document.removeEventListener('click', handleClickOutside);
			unsubscribe();
		};
	});

	/**
	 *
	 * @param event - mouse evnt to close the dropdown of select box on clicking outside
	 */
	function handleClickOutside(event: MouseEvent) {
		if (selectElement && !selectElement.contains(event.target as Node)) {
			isOpen = false;
		}
	}

	/**
	 *
	 * @param event - mouse event to toggle the dropdown
	 */
	function toggleDropdown(event: MouseEvent) {
		event.stopPropagation();
		if (!isOpen) {
			openSelectId.set(null);
			openSelectId.set(id);
		}
		isOpen = !isOpen;
	}

	/**
	 *
	 * @param option - selected option object containing value and label
	 * @param option.value - value of the selected option
	 * @param option.label - label of the selected option
	 */
	function selectOption(option: { value: string; label: string }) {
		value = option?.value;
		isOpen = false;
		dispatch('changedValue', { fieldName, value: option.value });
	}

	$: if (isOpen && dropdownElement) {
		// Calculate space available below and above
		const rect = selectElement.getBoundingClientRect();
		const dropdownRect = dropdownElement.getBoundingClientRect();
		const spaceBelow = window.innerHeight - rect.bottom;

		// Adjust dropdown position based on available space
		if (spaceBelow < dropdownRect.height) {
			dropdownElement.style.top = `-${dropdownRect.height * 1.03}px`;
			dropdownElement.style.bottom = 'auto';
		} else {
			dropdownElement.style.top = '100%';
			dropdownElement.style.bottom = 'auto';
		}
	}
</script>

<div class="relative" bind:this={selectElement}>
	<button
		type="button"
		on:click={disabled ? null : toggleDropdown}
		class="appearance-none border w-full {customClass} {disabled
			? 'bg-ng-gray-725 text-ng-gray-675 cursor-not-allowed'
			: background}  rounded-ng4 px-4 py-3 focus:outline-none font-poppins text-base leading-6 font-normal {!options?.find(
			(opt) => opt?.value == value
		)
			? 'text-ng-gray-675'
			: 'text-black'} text-ellipsis overflow-hidden text-left"
	>
		<span class="no-ellipsis"
			>{options?.find((opt) => opt?.value == value)?.label || placeholder}</span
		>
	</button>
	<div class="{disabled ? 'bg-ng-gray-725 ' : ''} absolute top-1/3 right-4">
		<img src={disabled ? DisabledArrow : DownLightGrayArrow} alt="down_arrow" class="" />
	</div>

	{#if isOpen && options?.length > 0}
		<div
			class="absolute z-10 w-full mt-1 bg-white border border-ng-gray-280 rounded-ng4 shadow-md max-h-60 overflow-auto"
			bind:this={dropdownElement}
		>
			{#each options as option}
				<button
					type="button"
					on:click={() => selectOption(option)}
					class="w-full text-left px-4 py-2 hover:bg-ng-gray-100"
				>
					{option.label}
				</button>
			{/each}
		</div>
	{/if}

	<select {name} bind:value class="hidden" {id}>
		<option value="">{placeholder}</option>
		{#if options?.length > 0}
			{#each options as option}
				<option value={option.value}>{option.label}</option>
			{/each}
		{/if}
	</select>
</div>

<style lang="scss">
	.no-ellipsis {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
		text-overflow: clip;
		word-break: break-all;
	}
</style>
