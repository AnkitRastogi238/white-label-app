<script lang="ts">
	export let value = '';
	export let label = '';
	export let error = '';
	export let isMandatory = false;
	export let placeholder: string = '';
</script>

<div class="flex flex-col gap-1">
	{#if label}
		<label
			for={label}
			class="font-poppins text-xs font-normal leading-lk18 text-lkea-gray-800 flex gap-1 items-center"
		>
			{label}
			{#if isMandatory}<span
					class="{error
						? 'text-ng-red-300'
						: 'text-ng-gray-800'} font-poppins text-ng10 leading-ng14 font-normal">*</span
				>
			{/if}
		</label>
	{/if}
	<textarea
		id={label}
		class="h-lk78 flex-1 focus:outline-none w-full text-base placeholder:text-lkea-gray-675 font-normal rounded border border-lkea-gray-475 px-4 py-3 font-poppins"
		{placeholder}
		bind:value
	></textarea>
	{#if error}
		<p class="text-ng-red-300 font-poppins font-normal leading-ng14 text-ng10">
			{error}
		</p>
	{/if}
</div>
