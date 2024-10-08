<script lang="ts">
    // external dependencies
    import * as BuilderSDK from '@builder.io/sdk-svelte';
    
    import 'swiper/swiper-bundle.css';
    import GenericImage from '$lib/common/components/image/GenericImage.svelte';
    import type { BuilderBlock } from '$lib/common/types';
    // Internal dependencies
    import type { Id } from '$lib/common/types';
  
    /**
     * Represents the ID of a Builder.io block.
     */
    export let builderBlock: Id;
  
    /**
     * Represents a child Builder.io block.
     */
    export let childBlocks: BuilderBlock;
  
    /**
     * The title of the item.
     */
    export let title: string;
  
    /**
     * The URL of the image associated with the item.
     */
    export let image: string;
  
    /**
     * The alt text for the image associated with the item.
     */
    export let altText: string;
  
    /**
     * The URL of the video associated with the item.
     */
    export let video: string;
  </script>
  
  <div class="flex flex-col relative bg-ng-blue-400">
    <!-- background video -->
    <video
      class="absolute
      inset-0
      w-full h-full
      object-cover
      opacity-30
      blur-sm"
      autoplay
      loop
      muted
      preload="none"
      playsinline
    >
      <source src={video} type="video/mp4" data-testId="bg-video" />
    </video>
    <div
      class=" relative
        mt-ng56 md:mt-ng96 lg:mt-ng168 mx-6 md:mx-12 lg:mx-ng56
        flex flex-col lg:flex-row lg:items-center lg:justify-around
        text-white"
    >
      {#if title}
        <h3
          class="text-ng64 md:text-ng80
          mr-0 md:mr-ng292 lg:mr-ng104 2xl:mr-ng284 mb-9 md:mb-12 lg:mb-0
        leading-ng64 md:leading-ng80
        break-words font-roboto font-bold"
          data-testId="title"
        >
          {title}
        </h3>
      {/if}
      <div class="h-ng170 md:h-ng334 lg:h-ng418 content-center">
        <GenericImage
          Image={{
            src: image,
            alt: altText,
            class: 'w-auto h-auto rounded-ng10 object-cover',
            'data-testid': 'mainImage',
            loading: 'lazy',
          }}
        />
      </div>
    </div>
    <!-- Builder block -->
    {#if builderBlock && builderBlock?.id}
      <div class="mt-ng74 md:mt-ng72 lg:mt-ng88 z-60" data-testId="builder-block">
        <BuilderSDK.Blocks
          parent={builderBlock?.id}
          path={`component.options.childBlocks`}
          blocks={childBlocks}
        />
      </div>
    {/if}
  </div>
  