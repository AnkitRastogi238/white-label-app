<script lang="ts">
	import { onMount } from 'svelte';
	import Link from '../link/Link.svelte';
	import { getCookie, removeCookie } from '@white-label/ui';
	import GenericImage from '../image/GenericImage.svelte';
	import { CartIcon } from '$src/lib/assets/icons';
	import { SlidePopup } from '../side-popup';
	import Cart from '$src/lib/restaurants/cart/Cart.svelte';
	import ValidationPopup from '../validation-popup/ValidationPopup.svelte';
	import { cartLength } from '../../store';
	import { goto } from '$app/navigation';

	export let navData: {
		logo: {
			image: string;
			link: string;
		};
		navigationList: Array<{
			title: string;
			link: string;
		}>;
	};

	let isMenuOpen = false;
	let username: string | null = '';
	let value: boolean = false;
	let cartItems: any[] = [];
	let token: string | null = '';
	let isValidated: boolean = false;

	// Load cart data from localStorage
	function loadCartData() {
		const savedCart = localStorage.getItem('cart');
		cartLength.set(Number(JSON.parse(String(savedCart))?.length));
	}

	// Check token validity
	function isValidToken(token: string | null): boolean {
		return token !== null && token.length > 0;
	}

	onMount(() => {
		// Check for access token on component mount
		token = getCookie('access-token');
		if (isValidToken(token)) {
			username = token;
			// Load cart data only if user is authenticated
			loadCartData();
		}
	});

	function handleLogout() {
		removeCookie('access-token');
		username = '';
		token = null;
		// Close any open popups
		value = false;
		isValidated = false;
	}

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function openingCartMenu() {
		// Check if token exists and is valid
		if (!isValidToken(token)) {
			// Show validation popup if user is not authenticated
			isValidated = true;
			value = false; // Ensure cart popup is closed
		} else {
			// Show cart popup if user is authenticated
			value = true;
			isValidated = false; // Ensure validation popup is closed
		}
	}
</script>

<!-- Rest of your template code remains the same -->
<header>
	<nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
		<div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
			<!-- Logo -->
			<Link href={navData?.logo?.link} classList="flex items-center">
				<GenericImage
					Image={{ src: navData?.logo?.image, class: `mr-3 h-6 sm:h-9`, alt: 'Logo' }}
				/>
			</Link>

			<!-- Auth Section -->
			<div class="flex items-center lg:order-2">
				{#if username}
					<span class="text-gray-800 font-medium text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2">
						Welcome, {username}
					</span>
					<button
						on:click={handleLogout}
						class="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
					>
						Logout
					</button>
				{:else}
					<a
						href="/login"
						class="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
					>
						Log in
					</a>
					<a
						href="/"
						class="text-gray-800 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
					>
						Get started
					</a>
				{/if}
				<button
					on:click={openingCartMenu}
					class="flex flex-row text-gray-800 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
				>
					{@html CartIcon}
					{#if Number($cartLength) > 0}
						<div class="text-xs bg-ng rounded-full text-white leading-[4px]">
							<p class="p-1">
								{$cartLength}
							</p>
						</div>
					{/if}
				</button>

				<!-- Mobile menu button -->
				<button
					on:click={toggleMenu}
					type="button"
					class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
					aria-controls="mobile-menu-2"
					aria-expanded={isMenuOpen}
				>
					<span class="sr-only">Open main menu</span>
					<svg
						class={isMenuOpen ? 'hidden w-6 h-6' : 'w-6 h-6'}
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
							clip-rule="evenodd"
						></path>
					</svg>
					<svg
						class={isMenuOpen ? 'w-6 h-6' : 'hidden w-6 h-6'}
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
							clip-rule="evenodd"
						></path>
					</svg>
				</button>
			</div>

			<!-- Navigation Links -->
			<div
				class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
				class:hidden={!isMenuOpen}
				id="mobile-menu-2"
			>
				<ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
					{#if navData?.navigationList?.length > 0}
						{#each navData.navigationList as navItem}
							<li>
								{#if navItem.link !== '/orders'}
									<Link
										href={navItem.link}
										classList="block py-2 pr-4 pl-3 text-gray-800 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0"
										aria-current="page"
									>
										{navItem.title}
									</Link>
								{:else if isValidToken(token)}
									<button
										on:click={() => goto(navItem.link)}
										class="block py-2 pr-4 pl-3 text-gray-800 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0"
										aria-current="page"
									>
										{navItem.title}
									</button>
								{/if}
							</li>
						{/each}
					{/if}
				</ul>
			</div>
		</div>
	</nav>
</header>

<ValidationPopup bind:isModalOpen={isValidated} />

<SlidePopup bind:isModalOpen={value} title="Your Cart">
	<Cart bind:isModalOpen={value} />
</SlidePopup>
