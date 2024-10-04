<script lang="ts">
    // internal dependency
    import GenericImage from '../image/GenericImage.svelte';
  
    /**
     * A component that displays informative content with a heroBannerImage, altText.
     * @param {string} altText - The alt text for heroBanner image.
     * @param {string} bannerArcText - The richtext content for the arc.
     */
    export let image: string;
    export let altText: string;
  </script>
  
  <div data-testid="hero-banner" class="relative">
    <div
      class="absolute m-auto top-0 bottom-0 w-ng209 md:w-ng376 lg:w-ng606 h-ng118 md:h-ng200 lg:h-ng297 opacity-100 overflow-hidden"
    >
    </div>
    <GenericImage Image={{ class: `w-full h-full object-cover`, src: image, alt: altText }} />
  </div>
  