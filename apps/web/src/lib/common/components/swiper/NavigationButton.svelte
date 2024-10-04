<script lang="ts">
    // internal dependency
    import Button from './Button.svelte';
    import type { ICustomNavigation } from '$lib/common/types';
  
    /**
     * Navigation configuration object.
     */
    export let navigation: ICustomNavigation;
  
    /**
     * Selector for the previous button element.
     */
    export let prevEl: string = '';
  
    /**
     * Selector for the next button element.
     */
    export let nextEl = '';
  </script>
  
  <div class={navigation?.navWrapperClassList}>
    <Button
      buttonStyles="{prevEl?.split('.')?.[1]} rotate-180"
      commonIconClass={navigation?.commonIconClassList}
      prevIconClass={navigation?.prevIconClassList}
      dataTestId={navigation?.prevTestId}
      iconStyles={navigation?.iconStyles}
    />
    <Button
      buttonStyles={nextEl?.split('.')?.[1]}
      commonIconClass={navigation?.commonIconClassList}
      nextIconClass={navigation?.nextIconClassList}
      dataTestId={navigation?.nextTestId}
      iconStyles={navigation?.iconStyles}
    />
  </div>
  