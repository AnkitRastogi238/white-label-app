<!-- CartSidebar.svelte -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	export let isModalOpen: boolean = true;

	let cartItems: Array<{
		item_id: string;
		name: string;
		price: number;
		quantity: number;
	}> = [];

	let total: number = 0;

	// Load cart data from localStorage
	function loadCartData() {
		const savedCart = localStorage.getItem('cart');
		if (savedCart) {
			cartItems = JSON.parse(savedCart);
			calculateTotal();
		}
	}

	// Save cart data to localStorage
	function saveCartData() {
		localStorage.setItem('cart', JSON.stringify(cartItems));
		calculateTotal();
	}

	// Calculate total price
	export function calculateTotal() {
		total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
	}

	function updateQuantity(itemId: string, delta: number) {
		const itemIndex = cartItems.findIndex((item) => item.item_id === itemId);

		if (itemIndex !== -1) {
			const newQuantity = cartItems[itemIndex].quantity + delta;

			if (newQuantity <= 0) {
				// Remove item if quantity becomes 0
				cartItems = cartItems.filter((item) => item.item_id !== itemId);
			} else {
				// Update quantity
				cartItems[itemIndex].quantity = newQuantity;
				cartItems = [...cartItems]; // Trigger reactivity
			}
		}

		saveCartData();
	}

	// Load cart data when component mounts
	onMount(() => {
		loadCartData();
	});

	const handleCheckout = () => {
		isModalOpen = false;
		goto('/restaurants/checkout');
	};
</script>

<div class="flex flex-col h-full">
	<!-- Cart Items -->
	<div class="flex-1 overflow-y-auto p-4">
		{#if cartItems?.length === 0}
			<div class="text-center text-gray-500 mt-8">Your cart is empty</div>
		{:else}
			<div class="space-y-4">
				{#each cartItems as item (item.item_id)}
					<div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
						<div class="flex-1">
							<h3 class="font-medium">{item.name}</h3>
							<p class="text-sm text-gray-600">₹{item.price}</p>
						</div>

						<div class="flex items-center gap-3">
							<button
								on:click={() => updateQuantity(item.item_id, -1)}
								class="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600"
							>
								<span class="text-lg leading-none">-</span>
							</button>
							<span class="w-6 text-center font-medium">
								{item.quantity}
							</span>
							<button
								on:click={() => updateQuantity(item.item_id, 1)}
								class="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600"
							>
								<span class="text-lg leading-none">+</span>
							</button>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>

	<!-- Footer with Total -->
	<div class="border-t p-4">
		<div class="flex justify-between items-center mb-4">
			<span class="font-semibold">Total Amount:</span>
			<span class="text-xl font-bold">₹{total}</span>
		</div>
		<button
			on:click={handleCheckout}
			class="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
			disabled={cartItems.length === 0}
		>
			Proceed to Checkout
		</button>
	</div>
</div>
