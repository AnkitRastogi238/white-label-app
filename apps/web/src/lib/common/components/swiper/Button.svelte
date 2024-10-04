<script lang="ts">
    // internal dependency
    import GetIcon from '$src/lib/common/components/GetIcon.svelte';
  
    /**
     * CSS styles to apply to the icon element.
     */
  
    export let iconStyles: string = '';
  
    /**
     * CSS styles to apply to the button element.
     */
    export let buttonStyles: string = '';
  
    /**
     * Common icon class for the button.
     */
    export let commonIconClass = '';
  
    /**
     * Icon class for the previous button.
     */
    export let prevIconClass = '';
  
    /**
     * Icon class for the next button.
     */
    export let nextIconClass = '';
  
    /**
     * Data test ID for testing purposes.
     */
    export let dataTestId = '';
  
    /**
     * Default style for the button component.
     * @default "p-2 absolute z-10 rounded-full swiper-arrow border-none aspect-square absolute -translate-y-1/2 rounded-full flex justify-center items-center"
     */
  
    const defaultStyle =
      'p-2 absolute z-10 rounded-full swiper-arrow border-none aspect-square absolute -translate-y-1/2 rounded-full flex justify-center items-center';
  </script>
  
  <button
    class="{defaultStyle} {buttonStyles} {prevIconClass} {nextIconClass} {commonIconClass}"
    data-testid={dataTestId}
  >
    <GetIcon classList="w-6 h-6 {iconStyles}" />
  </button>
  