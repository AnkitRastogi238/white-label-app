<script lang="ts">
    import type { IGenericImage } from '$lib/common/types';
  
    export let Image: IGenericImage;
  
    $: {
      let { src, alt, ...imageProps } = Image;
      const formattedSrc = src ? `${src}?format=webp` : '';
      imageSrc = formattedSrc;
      imageAltText = alt;
      restProps = imageProps;
    }
  
    let imageSrc: string | undefined;
    let imageAltText: string | undefined;
    let restProps: Record<string, any>;
  </script>
  
  <img src={imageSrc} alt={imageAltText} {...restProps} />
  