<script lang="ts">
    // internal dependencies
    import GenericButton from '../button/GenericButton.svelte';
    import GenericImage from '$lib/common/components/image/GenericImage.svelte';
    import type { ILink, ImageData } from '$lib/common/types';
	import { PageNotFoundImage, ServiceBgImage } from '$src/lib/assets/images';
  
    export let icon: ImageData = { src: PageNotFoundImage, altText: 'pagenotfound' };
    export let title: string = 'Oops! Page not found';
    export let description: string = '';
    export let link: ILink = { href: '/', text: 'Back to Homepage', target: '' };
  </script>
  
  <div class="h-[450px] md:h-ng550 lg:h-[542px] flex justify-center items-center relative">
    <GenericImage
      Image={{
        src: ServiceBgImage,
        alt: 'bg-img',
        class: `absolute inset-0 w-full h-full object-cover opacity-70`,
      }}
    />
    <div class="flex items-center flex-col z-1 px-6 md:px-12 lg:px-14">
      <img
        src={icon?.src ? icon?.src : PageNotFoundImage}
        alt={icon?.altText}
        class="h-12 w-12 md:h-[72px] md:w-[72px]"
      />
      {#if title}
        <div class="mt-9 flex items-center pb-4 lg:pb-6 gap-3 md:gap-6">
          <hr class="text-blue-950 border-2 border-blue-950 w-9 md:w-[84px]" />
          <h3
            class="text-[32px] md:text-5xl lg:text-[60px] leading-normal font-light font-roboto text-center lg:text-left"
          >
            {title}
          </h3>
          <hr class="text-blue-950 border-2 border-blue-950 w-9 md:w-[84px]" />
        </div>
      {/if}
  
      {#if description}
        <h4 class="text-base md:text-xl leading-normal font-light font-poppins text-center">
          {description}
        </h4>
      {/if}
      {#if link?.text}
        <div class="mt-4 lg:mt-6 z-[1]">
          <GenericButton
            ctaText={link?.text}
            ctaLink={link?.href}
            ctaTarget={link?.target ? '_blank' : '_self'}
          />
        </div>
      {/if}
    </div>
  </div>
  