<script lang="ts">
    import './swiper.scss';
    import type { ICustomPagination } from '$lib/common/types';
  
    /**
     * Pagination configuration object.
     */
    export let pagination: ICustomPagination;
  
    /**
     * Selector for the pagination element.
     */
    export let paginationEl = '';
  
    /**
     *  pagination color
     */
    export let paginationBulletColor = 'white';
  </script>
  
  <div
    class="custom-pagination flex justify-center leading-4 {pagination?.wrapperClassList} "
    style="--pagination-color: {paginationBulletColor}"
  >
    <div
      class="{paginationEl?.split('.')?.[1]} paginate h-2 lg:h-2.5 {pagination?.paginationClassList ??
        ''}"
    ></div>
  </div>
  
  <style lang="scss">
    .custom-pagination {
      :global(.swiper-pagination-bullet) {
        background-color: var(--pagination-color);
      }
    }
  </style>
  