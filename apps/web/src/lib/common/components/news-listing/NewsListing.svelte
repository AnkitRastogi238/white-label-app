<script lang="ts">
	import { onMount } from 'svelte';

	import { logger } from '@white-label/ui/services';
	import { fetchNewsListing } from '$src/lib/services/news-listing';

	import { formatDate, scrollToTop } from '../../utils/utils';
	import { PageNotFoundImage } from '$src/lib/assets/images';
	import Pagination from '../pagination/Pagination.svelte';
	import { createPagination } from '../pagination/pagination.util';

	let allNewsList: any[] = [];
	let displayedNewsList: any[] = [];
	let currentPage: number = 1;
	let totalPages: number;
	let maxVisiblePages: number = 4;
	let limit = 9;
	let totalCount: number;
	let paginationList: Array<string | number>;
	let newslistingContainerRef: HTMLElement;

	const dateFormate: Intl.DateTimeFormatOptions = {
		month: 'short',
		day: '2-digit',
		year: 'numeric'
	};

	const fetchData = async () => {
		try {
			const data = await fetchNewsListing();
			allNewsList = data?.articles;
			totalCount = data?.articles?.length;
			totalPages = Math.ceil(totalCount / limit);
			updateDisplayedNews();
			paginationList = createPagination(currentPage, limit, maxVisiblePages, totalPages);
		} catch (error) {
			logger.log(error);
		}
	};

	const updateDisplayedNews = () => {
		const startIndex = (currentPage - 1) * limit;
		const endIndex = startIndex + limit;
		displayedNewsList = allNewsList.slice(startIndex, endIndex);
	};

	onMount(async () => {
		await fetchData();
	});

	/**
	 * Function for the navigation within pages in pagination
	 * @param page - page number
	 */
	const goToPage = (page: string | number) => {
		let pageNo = typeof page === 'string' ? parseInt(page) : page;
		if (pageNo >= 1 && pageNo <= totalPages) {
			currentPage = pageNo;
			updateDisplayedNews();
			scrollToTop(newslistingContainerRef);
			paginationList = createPagination(currentPage, limit, maxVisiblePages, totalPages);
		}
	};
</script>

<section class="py-24">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-ng30">
		<h2 class="font-manrope text-4xl font-bold text-gray-900 text-center mb-16">Our latest blog</h2>
		{#if displayedNewsList?.length > 0}
			<div
				class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
				bind:this={newslistingContainerRef}
			>
				{#each displayedNewsList as item}
					<div class="group w-full border border-gray-300 rounded-2xl">
						<div class="flex items-center w-full">
							<img
								src={item?.urlToImage ? `${item?.urlToImage}` : PageNotFoundImage}
								alt="blogs tailwind section"
								class="rounded-t-2xl w-full h-60 object-fit"
							/>
						</div>
						<div
							class="p-4 lg:p-6 transition-all duration-300 rounded-b-2xl group-hover:bg-gray-50"
						>
							<span class="text-indigo-600 font-medium mb-3 block"
								>{formatDate(item?.publishedAt, dateFormate)}</span
							>
							<h4 class="text-xl text-gray-900 font-medium leading-8 mb-5">
								{item?.title}
							</h4>
							<p class="text-gray-500 leading-6 mb-10 line-clamp-4">
								{item?.description}
							</p>
							<a href={item?.url} class="cursor-pointer text-lg text-indigo-600 font-semibold"
								>Read more..</a
							>
						</div>
					</div>
				{/each}
			</div>
			{#if totalPages > 1}
				<div class="lg:px-14 md:px-12 px-6 lg:w-fit lg:ml-auto">
					<Pagination {currentPage} {totalPages} {limit} {maxVisiblePages} {goToPage} />
				</div>
			{/if}
		{/if}
	</div>
</section>
