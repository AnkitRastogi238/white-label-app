<script lang="ts">
	import { onMount } from 'svelte';
	import * as restaurantsData from '../../data/Restaurant.json';
	import { cartLength } from '$src/lib/common/store';

	export let restaurantId: number | undefined;
	let restaurant: any = null;
	let error: any = null;
	let isCartOpen = false;
	let cartQuantities: { [key: string]: number } = {};

	function loadCartQuantities() {
		const savedCart = localStorage.getItem('cart');
		if (savedCart) {
			const cartItems = JSON.parse(savedCart);
			cartQuantities = cartItems.reduce((acc: any, item: any) => {
				acc[item.item_id] = item.quantity;
				return acc;
			}, {});
		}
	}
	function addToCart(item: any) {
		const savedCart = localStorage.getItem('cart') || '[]';
		const cartItems = JSON.parse(savedCart);

		const existingItemIndex = cartItems.findIndex(
			(cartItem: any) => cartItem.item_id === item.item_id
		);

		if (existingItemIndex !== -1) {
			cartItems[existingItemIndex].quantity += 1;
		} else {
			cartItems.push({
				item_id: item.item_id,
				name: item.name,
				price: item.price,
				quantity: 1
			});
		}

		localStorage.setItem('cart', JSON.stringify(cartItems));
		const count: string | null = localStorage.getItem('cart');
		cartLength.set(Number(JSON.parse(String(count))?.length));
		loadCartQuantities();
	}

	function removeFromCart(item: any) {
		const savedCart = localStorage.getItem('cart') || '[]';
		const cartItems = JSON.parse(savedCart);

		const existingItemIndex = cartItems.findIndex(
			(cartItem: any) => cartItem.item_id === item.item_id
		);

		if (existingItemIndex !== -1) {
			if (cartItems[existingItemIndex].quantity > 1) {
				cartItems[existingItemIndex].quantity -= 1;
			} else {
				cartItems.splice(existingItemIndex, 1);
			}

			localStorage.setItem('cart', JSON.stringify(cartItems));
			const count: string | null = localStorage.getItem('cart');		
            cartLength.set(Number(JSON.parse(String(count))?.length));

			loadCartQuantities();
		}
	}

	async function fetchRestaurantData() {
		try {
			restaurant = restaurantsData.restaurants.find((r) => r.id === restaurantId);
			if (!restaurant) {
				error = 'Restaurant not found';
			}
		} catch (err) {
			error = 'Error loading restaurant data';
		}
	}

	onMount(() => {
		fetchRestaurantData();
		loadCartQuantities();
	});
</script>

{#if error}
	<div class="flex items-center justify-center min-h-screen">
		<p class="text-gray-600 text-lg">{error}</p>
	</div>
{:else if restaurant}
	<div class="max-w-4xl mx-auto px-4 py-8 md:px-6">
		<!-- Restaurant Header -->
		<header class="mb-8">
			<h1 class="text-3xl font-bold text-gray-900 mb-2">{restaurant.name}</h1>
			<div class="flex flex-wrap gap-4 items-center mb-3">
				<span class="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
					{restaurant.category}
				</span>
				<span class="flex items-center text-amber-400">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
						/>
					</svg>
					<span class="ml-1">{restaurant.rating}</span>
				</span>
				<span class="text-sm text-gray-600">
					{restaurant.distance_km} km away
				</span>
			</div>
			<p class="text-gray-600">{restaurant.address}</p>
		</header>

		<!-- Menu Section -->
		<main>
			<h2 class="text-2xl font-semibold text-gray-900 mb-6">Menu</h2>
			<div class="space-y-4">
				{#each restaurant.menu as item}
					<div
						class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex justify-between items-center"
					>
						<div class="flex-1">
							<h3 class="font-medium text-gray-900 mb-1">{item.name}</h3>
							<p class="text-gray-600 text-sm mb-2">{item.description}</p>
							<span class="text-gray-900 font-semibold">₹{item.price}</span>
						</div>

						<div class="flex items-center gap-3">
							<button
								class="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center
                                     hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red-500
                                     transition-colors duration-200"
								on:click={() => removeFromCart(item)}
								disabled={!cartQuantities[item.item_id]}
							>
								<span class="text-lg leading-none">-</span>
							</button>

							<span class="w-6 text-center font-medium">
								{cartQuantities[item.item_id] || 0}
							</span>

							<button
								class="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center
                                     hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                                     transition-colors duration-200"
								on:click={() => addToCart(item)}
							>
								<span class="text-lg leading-none">+</span>
							</button>
						</div>
					</div>
				{/each}
			</div>
		</main>
	</div>
{:else}
	<div class="flex items-center justify-center min-h-screen">
		<div class="animate-pulse text-gray-600 text-lg">Loading...</div>
	</div>
{/if}
