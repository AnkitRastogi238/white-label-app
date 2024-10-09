<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import CustomSelect from '../custom-select/CustomSelect.svelte';
    import MultiSelect from '../custom-select/MultiSelect.svelte';

    export let name = '';
    export let value: string | string[] = '';
    export let label = '';
    export let options: { value: string; label: string; checked: boolean }[] = [];
    export let multiple = false;
    export let error = '';
    export let isMandatory = false;
    export let placeholder: string = '';

    const dispatch = createEventDispatcher();

    function handleChange(event: CustomEvent<{ fieldName: string; value: string }>) {
        if (multiple) {
            return;
        }
        dispatch('input', { name, value: event.detail.value });
    }

    function handleMultiSelectChange(tags: string[]) {
        dispatch('input', { name, value: tags });
    }

    $: questionTags = Array.isArray(value) ? value : [];

    let showMenuList = false;

    function toggleMenuList() {
        showMenuList = !showMenuList;
    }

    function handleCheckBoxChange(subType: string, index: number) {
        const updatedOptions = [...options];
        updatedOptions[index].checked = !updatedOptions[index].checked;
        options = updatedOptions;

        const selectedTags = options
            .filter((option) => option.checked)
            .map((option) => option.value);

        handleMultiSelectChange(selectedTags);
    }

    // Export reset method to be called from parent
    export function reset() {
        if (multiple) {
            options = options.map(option => ({
                ...option,
                checked: false
            }));
            questionTags = [];
        }
        showMenuList = false;
    }
</script>

<div class="flex flex-col gap-1">
    {#if label}
        <label
            for={name}
            class="font-poppins text-xs font-normal leading-ng18 text-ng-gray-800 flex gap-1 items-center"
        >
            {label}
            {#if isMandatory}
                <span class="{error ? 'text-ng-red-300' : 'text-ng-gray-800'} font-poppins text-ng10 leading-ng14 font-normal">*</span>
            {/if}
        </label>
    {/if}
    <div class="relative flex flex-col gap-1">
        {#if multiple}
            <MultiSelect
                list={options}
                {handleCheckBoxChange}
                subType="label"
                {showMenuList}
                handleLabelClick={toggleMenuList}
                {questionTags}
                {placeholder}
                customClass={error ? 'border-ng-red-300' : 'border-ng-gray-280'}
            />
        {:else}
            <CustomSelect
                {options}
                {placeholder}
                {name}
                fieldName={name}
                id={name}
                on:changedValue={handleChange}
                value={String(value)}
                customClass={error ? 'border-ng-red-300' : 'border-ng-gray-280'}
            />
        {/if}
        {#if error}
            <p class="text-ng-red-300 font-poppins font-normal leading-ng14 text-ng10">
                {error}
            </p>
        {/if}
    </div>
</div>