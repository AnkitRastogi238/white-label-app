<script lang="ts">
	// internal dependencies
	import { createPagination } from './pagination.util';
	import { BlackBoldDownArrowIcon } from '$src/lib/assets/icons';

	/**
	 * currentPages - current page value
	 * totalPages - Total number of Pages
	 * limit - Number of data present on the screen
	 * maxVisiblePage- Number of pages visble in pagination
	 * goToPage - function handling the navigation between pages
	 */
	export let currentPage: number;
	export let totalPages: number;
	export let limit: number;
	export let maxVisiblePages: number = 5;
	export let goToPage: (page: string | number) => void;
	export let isRegistrationScreen: boolean = false;
	export let isUserProfile: boolean = false;

	$: paginationList = createPagination(currentPage, limit, maxVisiblePages, totalPages);
</script>

{#if totalPages > 1}
	<div class="mt-12 {isRegistrationScreen ? 'md:mt-2' : 'lg:mt-ng30'} lg:ml-auto">
		<div
			class="justify-center text-ng14 font-poppins font-normal {isRegistrationScreen
				? isUserProfile
					? 'md:flex md:flex-col xl:flex-row'
					: 'md:flex lg:flex-col desktop1440:flex-row'
				: 'md:flex'}"
		>
			<div class="flex items-center justify-center">
				<label for="page-select">Page </label>
				<div class="relative w-ng61 mx-2">
					<select
						id="page-select"
						class="appearance-none w-full px-ng10 md:py-2 py-1 border border-ng-gray-350 rounded bg-white h-9 flex items-center flex-shrink-0 self-stretch"
						bind:value={currentPage}
						on:change={(event) => goToPage(parseInt(event?.target?.value))}
					>
						{#each Array(totalPages)
							.fill(0)
							.map((_, index) => index + 1) as page}
							<option value={page} selected={page === currentPage}>{page}</option>
						{/each}
					</select>
					<!-- Custom arrow icon -->
					<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
						{@html BlackBoldDownArrowIcon}
					</div>
				</div>
				<span> of {totalPages}</span>
			</div>
			<div
				class="lg:ml-9 md:ml-8 flex {isRegistrationScreen
					? isUserProfile
						? 'md:gap-3 xl:gap-2 md:pt-9 xl:pt-0'
						: 'md:gap-4 lg:gap-3 lg:pt-9 desktop1440:pt-0'
					: 'lg:gap-3'} gap-ng6 justify-center pt-9 md:pt-0"
			>
				<button
					type="button"
					class="px-ng10 py-2 {currentPage === 1 ? 'text-ng-gray-350' : ''}"
					on:click={() => goToPage(currentPage - 1)}
					disabled={currentPage === 1}
				>
					Prev
				</button>
				{#each paginationList || [] as page}
					{#if page === '...'}
						<span class="lg:px-3 px-1 h-9">...</span>
					{:else}
						<button
							type="button"
							class="h-9 w-9 border border-ng-gray-350 rounded {page === currentPage
								? 'bg-ng-blue-400 text-white'
								: ''}"
							on:click={() => goToPage(page)}
						>
							{page}
						</button>
					{/if}
				{/each}
				<button
					type="button"
					class="lg:px-4 px-ng10 py-2 {currentPage === totalPages ? 'text-ng-gray-350' : ''}"
					on:click={() => goToPage(currentPage + 1)}
					disabled={currentPage === totalPages}
				>
					Next
				</button>
			</div>
		</div>
	</div>
{/if}
