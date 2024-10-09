<script lang="ts">
	import { onMount } from 'svelte';
	import { BlueCloseIcon, DownLightGrayArrow } from '$lib/assets/icons';
	import CheckBoxElement from './CheckBoxElement.svelte';

	export let placeholder: string;
	export let list: any;
	export let handleCheckBoxChange: (subType: string, index: number) => void;
	export let subType: string;
	export let showMenuList: boolean;
	export let handleLabelClick: (e: Event) => void;
	export let questionTags: string[] = [];
	export let customClass: string = 'border-ng-gray-280';

	let componentRef: HTMLElement;

	onMount(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			if (componentRef && !componentRef.contains(event.target as Node) && showMenuList) {
				showMenuList = false;
			}
		};

		document.addEventListener('click', handleOutsideClick);

		return () => {
			document.removeEventListener('click', handleOutsideClick);
		};
	});

	const removeTag = (tag: string, e: Event) => {
		e.stopPropagation();
		questionTags = questionTags.filter((t) => t !== tag);

		const tagIndex = list.findIndex((item: any) => item[subType] === tag);
		if (tagIndex !== -1) {
			list[tagIndex].checked = 'checked';
			handleCheckBoxChange(subType, tagIndex);
		}
	};
</script>

<main bind:this={componentRef}>
	<div class="">
		<div class="relative flex flex-col">
			<button
				class="border px-4 py-3 rounded {customClass} flex items-center justify-between"
				on:click={(e) => handleLabelClick(e)}
				type="button"
			>
				<div>
					{#if questionTags?.length > 0}
						<div class="flex flex-wrap p-1 px-3 justify-center items-center gap-1">
							{#each questionTags as tag}
								<span
									class="flex flex-row items-center gap-1 bg-white text-ng-blue-400 border border-ng-blue-400 p-1 px-3 font-poppins text-sm font-normal leading-5 rounded-full"
								>
									{tag}
									<button class="close-button cursor-pointer" on:click={(e) => removeTag(tag, e)}>
										{@html BlueCloseIcon}
									</button>
								</span>
							{/each}
						</div>
					{:else}
						<p
							class="text-ng-gray-675 font-poppins text-base font-normal leading-6 line-clamp-1 overflow-hidden"
						>
							{placeholder}
						</p>
					{/if}
				</div>
				<div><img src={DownLightGrayArrow} alt="down-arrow" /></div>
			</button>
			{#if showMenuList}
				<div
					class="absolute top-ng50 border rounded overflow-x-hidden overflow-scroll z-10 bg-white w-full max-h-[240px] border-ng-gray-475"
				>
					{#each list as item, index}
						<CheckBoxElement
							checked={item['checked']}
							name={item[subType]}
							isLastElement={list.length == index + 1 ? true : false}
							handleCheckBoxChange={() => handleCheckBoxChange(subType, index)}
						/>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</main>

<style lang="scss">
	.close-button {
		:global(svg) {
			height: 12px;
			width: 12px;
		}
	}
</style>
