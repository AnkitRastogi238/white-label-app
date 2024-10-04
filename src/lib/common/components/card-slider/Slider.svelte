<script lang="ts">
    // external dependencies
    import 'swiper/swiper-bundle.css';
    import GenericImage from '../image/GenericImage.svelte';
    import Link from '$lib/common/components/link/Link.svelte';
    // internal dependencies
    import CustomSwiper from '$lib/common/components/swiper/CustomSwiper.svelte';
    import type { ICard } from '$lib/common/types';
    import type { ICustomNavigation, ICustomPagination, ISwiperStyle } from '$lib/common/types';
  
    /**
     * @param {CardData[]} cardList - CardData of slider component.
     * @param {string} arrowStyle - it contain an icon rendering property.
     * @param {string} title - it contain title.
     */
    export let title: string = '';
    export let cardList: ICard[];
    export let arrowStyle: string;
    /**
     * Executes cleanup operations when the component or element is destroyed.
     * @param {() => void} cleanupCallback - The callback function containing cleanup operations to be executed.
     * @returns {void}
     */
  
    let options = {
      loop: true,
      pagination: {
        el: '.paginate-innovation',
        clickable: true,
      },
      navigation: {
        nextEl: '.next-slide-button-slider-with-pagination',
        prevEl: '.prev-slide-button-slider-with-pagination',
      },
      breakpoints: {
        768: {
          slidesPerView: 3,
          slidesPerGroup: 1,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 5,
          slidesPerGroup: 1,
          spaceBetween: 40,
        },
      },
    };
  
    let swiperStyles: ISwiperStyle = {
      containerClassList: 'innovation-card overflow-hidden relative md:!w-ng124P lg:!w-ng110P',
      wrapperClassList: 'py-ng30 md:pl-6',
    };
  
    let navigation: ICustomNavigation = {
      prevIconClassList: 'border-none left-6 md:left-0',
      nextIconClassList: 'border-none right-6 md:right-ng30',
      commonIconClassList: `${arrowStyle === 'black' ? 'bg-black' : 'bg-white'} ${arrowStyle === 'black' ? 'md:shadow-ngshadowwhite' : 'md:shadow-ngshadowblue'}`,
      isDefaultNav: true,
      iconStyles: `${arrowStyle === 'black' ? 'text-white' : 'text-black'}`,
    };
  
    const pagination: ICustomPagination = {
      isDefaultPagination: true,
      wrapperClassList: 'mt-ng20 z-ng1 flex mb-ng48 lg:mb-ng50 mx-auto',
      paginationClassList: `${arrowStyle === 'black' ? 'black-dots' : ''}`,
    };
  </script>
  
  <div class="flex flex-col">
    {#if title}
      <h2
        class="
        mb-ng10 mx-ng18 md:mx-ng56 lg:mx-ng64
        text-2xl md:text-ng40 tracking-wide
        leading-6 md:leading-10
        font-light font-roboto
        {arrowStyle === 'black' ? 'hidden' : 'block'}
        {arrowStyle === 'white' ? 'text-white' : 'text-black'}
        z-ng1"
        data-testId="title"
      >
        {title}
      </h2>
    {/if}
    <div class="md:pl-6 lg:pl-8 overflow-hidden">
      <CustomSwiper
        swiperName="innovation-card"
        {options}
        {swiperStyles}
        {navigation}
        {pagination}
        onSwiperInit={undefined}
        onBeforeTransitionStart={undefined}
        onSlideChange={undefined}
        onSlideChangeTransitionEnd={undefined}
      >
        <!-- Mapping the cardList -->
        {#each cardList as item, index}
          <Link
            href={item?.link?.href}
            isOpenNewTab={Boolean(item?.link?.target)}
            classList="swiper-slide"
          >
            <div
              class="group
                  relative after:absolute
                  after:bottom-0 after:left-0 after:rounded-b-ng10
                  rounded-ng10
                  mx-20 md:mx-0
                  lg:duration-600 lg:ease
                  lg:hover:scale-x-ng1dt14 lg:hover:scale-y-ng1dt08
                  lg:hover:brightness-125
                  transition-none lg:[transition:transform_0.6s_ease,_filter_0.6s_ease]
                  after:content-ngempty after:h-1/2 after:w-full
                  aspect-ng280by342
                text-white after:bg-ng-gradient-black"
              data-testId="carousel-data"
            >
              <GenericImage
                Image={{
                  src: item?.image?.src,
                  alt: item?.image?.altText,
                  class: `absolute top-0 left-0 object-cover w-full h-full rounded-ng10`,
                  loading: 'lazy',
                }}
              />
              <div class="card-content">
                <h2
                  class="card-data
                     mt-0 mb-3 mr-5 lg:group-hover:mb-0
                     lg:group-hover:top-auto lg:group-hover:right-auto lg:group-hover:bottom-ng84 lg:group-hover:left-ng20
                     lg:group-hover:[transition:inset_0.6s_ease]
                     text-2xl
                     leading-6
                     font-light font-roboto"
                  data-testId="{index}-title"
                >
                  {item?.title}
                </h2>
                <p
                  class="absolute
                    my-0 mr-5 mb-ng10
                    top-auto bottom-8 left-ng20 right-auto
                    opacity-0 lg:group-hover:opacity-100
                    [transition:opacity_0.6s_ease] lg:group-hover:[transition:opacity_0.3s_0.1s_ease-in]
                    lg:group-hover:z-50
                    text-base
                    lg:leading-4
                    font-light font-roboto
                    lg:h-8
                    line-clamp-2
                    "
                  data-testId="{index}-desc"
                >
                  {item?.description}
                </p>
                {#if item?.link?.text}
                  <Link
                    href={item?.link?.href}
                    classList="
                    card-data
                    top-auto bottom-ng18 right-auto left-ng20
                    lg:group-hover:opacity-100 lg:group-hover:[transition:opacity_0.3s_0.1s_ease-in] lg:group-hover:z-10
                    text-base
                    leading-4
                    font-light font-roboto
                    text-ng-secondary underline"
                    data-testId="{index}-CTAtext"
                    isOpenNewTab={Boolean(item?.link?.target)}
                  >
                    {item?.link?.text}
                  </Link>
                {/if}
              </div>
            </div>
          </Link>
        {/each}
      </CustomSwiper>
      <!--Prev and Next button for the carousel sliding -->
    </div>
  </div>
  