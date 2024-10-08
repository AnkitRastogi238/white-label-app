<script lang="ts">
    // internal dependencies
    import type { DocType } from '$lib/common/types';
  
    /**
     * Represents a document item in the list.
     */
    export let docArray: DocType[];
  
    /**
     * Represents the index of the active tab.
     */
    export let activeTab: number = 0;
  
    /**
     * showPrivateDocuments holds the value boolean value
     */
    export let showPrivateDocuments: boolean;
  
    /**
     * Handles the switching between tabs index of activeTab gets assigned to variable activeTab.
     * @param index - The index of the active tab.
     */
    const handleTabSwitch = (index: number) => {
      activeTab = index;
    };
  </script>
  
  {#each docArray as document, index}
    <button
      class="flex items-center gap-1.5 md:mb-3 lg:mb-4 h-12 px-4 py-3 md:pl-4 md:pr-0 rounded-t-lk5 md:w-lk220 {activeTab ===
      index
        ? 'bg-lkea-gray-400 md:bg-transparent border-lkea-blue-300 border-b-4'
        : 'bg-transparent border-b-2 border-lkea-gray-350'}"
      on:click={() => handleTabSwitch(index)}
      data-testId="active-tab-{index + 1}"
    >
      <span
        class="font-poppins text-base md:text-sm leading-lk30 md:leading-5 whitespace-nowrap {activeTab ===
        index
          ? 'text-lkea-blue-300 font-bold md:font-semibold'
          : 'text-lkea-gray-800 font-normal'}"
      >
        {document?.docType}
      </span>
      <span
        class="text-white text-xs font-bold leading-3 rounded-full h-5 w-5 flex items-center justify-center {activeTab ===
        index
          ? 'bg-lkea-blue-300'
          : 'bg-lkea-gray-800'}"
      >
        {index === 2 || index === 3
          ? showPrivateDocuments
            ? document?.documents?.length
            : 0
          : document?.documents?.length}
      </span>
    </button>
  {/each}
  