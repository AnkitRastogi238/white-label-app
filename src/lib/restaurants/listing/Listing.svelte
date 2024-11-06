<script lang="ts">
	import { NotFoudIcon } from '$src/lib/assets/icons';
	import Link from '$src/lib/common/components/link/Link.svelte';
	import Pagination from '$src/lib/common/components/pagination/Pagination.svelte';
	import { createPagination } from '$src/lib/common/components/pagination/pagination.util';
	import { scrollToTop } from '$src/lib/common/utils/utils';
	import * as restaurantsData from '../../data/Restaurant.json';

	let search = '';
	let selectedCategory = 'all';
	let minRating = 3;
	let maxPrice = 1000;
	let maxDistance = 5;
	let currentPage: number = 1;
	let totalPages: number;
	let totalCount: number;
	let maxVisiblePages: number = 4;
	let limit = 9;
	let paginationList: Array<string | number>;
	let restaurantslistingContainerRef: HTMLElement;
	let displayedFilteredRestaurantsList: any[] = [];
	export let notFoundText: string =
		'We could not fetch the results for the selected filters. Please change the filter values or searched keyword';

	// Derive categories from restaurantsData.restaurants
	$: categories = ['all', ...new Set(restaurantsData.restaurants.map((r) => r.category))];

	// Separate search results from other filters
	$: searchResults = search 
		? restaurantsData.restaurants.filter((restaurant) => {
				const nameMatch = restaurant.name.toLowerCase().includes(search.toLowerCase());
				const categoryMatch = restaurant.category.toLowerCase().includes(search.toLowerCase());
				const menuMatch = restaurant.menu.some(item => 
					item.name.toLowerCase().includes(search.toLowerCase()) ||
					item.description.toLowerCase().includes(search.toLowerCase())
				);
				return nameMatch || categoryMatch || menuMatch;
			})
		: restaurantsData.restaurants;

	// Apply other filters separately
	$: filteredRestaurants = searchResults.filter((restaurant) => {
		const matchesCategory = selectedCategory === 'all' || restaurant?.category === selectedCategory;
		const matchesRating = restaurant.rating >= minRating;
		const matchesDistance = restaurant.distance_km <= maxDistance;
		const matchesPrice = Math.max(...restaurant.menu.map((item) => item.price)) <= maxPrice;

		return matchesCategory && matchesRating && matchesDistance && matchesPrice;
	});

	$: {
		totalCount = filteredRestaurants?.length;
		totalPages = Math.ceil(totalCount / limit);
		updateDisplayedNews();
	}

	const updateDisplayedNews = () => {
		const startIndex = (currentPage - 1) * limit;
		const endIndex = startIndex + limit;
		displayedFilteredRestaurantsList = filteredRestaurants.slice(startIndex, endIndex);
	};

	/**
	 * Function for the navigation within pages in pagination
	 * @param page - page number
	 */
	const goToPage = (page: string | number) => {
		let pageNo = typeof page === 'string' ? parseInt(page) : page;
		if (pageNo >= 1 && pageNo <= totalPages) {
			currentPage = pageNo;
			updateDisplayedNews();
			scrollToTop(restaurantslistingContainerRef);
			paginationList = createPagination(currentPage, limit, maxVisiblePages, totalPages);
		}
	};
</script>

<div class="max-w-6xl mx-auto p-4" bind:this={restaurantslistingContainerRef}>
	<!-- Search and Filters -->
	<div class="mb-8 space-y-4">
		<!-- Search Bar -->
		<div class="relative">
			<svg
				class="absolute left-3 top-3 text-gray-400 w-5 h-5"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<circle cx="11" cy="11" r="8" />
				<line x1="21" y1="21" x2="16.65" y2="16.65" />
			</svg>
			<input
				type="text"
				placeholder="Search restaurants or cuisines..."
				class="w-full pl-10 py-2 border rounded-lg"
				bind:value={search}
			/>
		</div>

		<!-- Filter Controls -->
		<div class="grid grid-cols-1 md:grid-cols-4 gap-4">
			<!-- Category Filter -->
			<select class="p-2 border rounded-lg" bind:value={selectedCategory}>
				{#each categories as category}
					<option value={category}>
						{category.charAt(0).toUpperCase() + category.slice(1)}
					</option>
				{/each}
			</select>

			<!-- Rating Filter -->
			<div class="flex items-center border rounded-lg p-2">
				<svg
					class="text-yellow-400 mr-2 w-5 h-5"
					viewBox="0 0 24 24"
					fill="currentColor"
					stroke="none"
				>
					<path
						d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
					/>
				</svg>
				<input
					type="number"
					min="0"
					max="5"
					step="0.1"
					placeholder="Min Rating"
					class="w-full"
					bind:value={minRating}
				/>
			</div>

			<!-- Price Filter -->
			<div class="flex items-center border rounded-lg p-2">
				<span class="mr-2">₹</span>
				<input
					type="number"
					min="0"
					step="1"
					placeholder="Max Price"
					class="w-full"
					bind:value={maxPrice}
				/>
			</div>

			<!-- Distance Filter -->
			<div class="flex items-center border rounded-lg p-2">
				<svg
					class="mr-2 text-gray-400 w-5 h-5"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
					<circle cx="12" cy="10" r="3" />
				</svg>
				<input
					type="number"
					min="0"
					step="0.1"
					placeholder="Max Distance (km)"
					class="w-full"
					bind:value={maxDistance}
				/>
			</div>
		</div>
	</div>

	<!-- Restaurant Cards -->
	<div class="flex flex-col gap-6">
		{#if displayedFilteredRestaurantsList?.length > 0}
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each displayedFilteredRestaurantsList as restaurant (restaurant.id)}
					<Link
						href={`restaurants/${restaurant?.id}`}
						classList="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
					>
						<img
							src="https://cdn.builder.io/api/v1/image/assets%2F7953d2f708184128b6bfffe7ceb85eea%2Ff2fa3278bcf040be80d17a9407d478f1"
							alt="img"
							class="w-full h-44 bg-orange-300"
						/>
						<div class="p-4">
							<div class="flex justify-between items-start">
								<h3 class="text-lg font-semibold">{restaurant.name}</h3>
								<div class="flex items-center">
									<svg
										class="text-yellow-400 mr-1 w-4 h-4"
										viewBox="0 0 24 24"
										fill="currentColor"
										stroke="none"
									>
										<path
											d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
										/>
									</svg>
									<span>{restaurant.rating}</span>
								</div>
							</div>

							<div class="text-sm text-gray-600 mt-1">{restaurant.category}</div>

							<div class="flex items-center text-sm text-gray-500 mt-2">
								<svg
									class="mr-1 w-4 h-4"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
									<circle cx="12" cy="10" r="3" />
								</svg>
								<span>{restaurant.distance_km} km</span>
							</div>

							<div class="mt-4">
								<div class="text-sm font-medium">Menu:</div>
								<ul class="mt-2 space-y-2">
									{#each restaurant.menu as item (item.item_id)}
										<li class="text-sm">
											<div class="flex justify-between">
												<span>{item.name}</span>
												<span class="font-medium">₹{item.price}</span>
											</div>
											<div class="text-gray-500 text-xs">{item.description}</div>
										</li>
									{/each}
								</ul>
							</div>
						</div>
					</Link>
				{/each}
			</div>
		{:else}
			<div class="flex flex-col items-center gap-9 pt-ng152 pb-ng152 md:pt-ng120">
				{@html NotFoudIcon}
				<p class="text-black text-center font-lato font-normal text-xl leading-ng26">
					{notFoundText}
				</p>
			</div>
		{/if}
		{#if totalPages > 1}
			<div class="lg:px-14 md:px-12 px-6 lg:w-fit lg:ml-auto">
				<Pagination {currentPage} {totalPages} {limit} {maxVisiblePages} {goToPage} />
			</div>
		{/if}
	</div>
</div>
