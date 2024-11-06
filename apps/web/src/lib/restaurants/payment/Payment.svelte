<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { loadStripe } from '@stripe/stripe-js';
	import { PUBLIC_STRIPE_KEY } from '$env/static/public';
	import { Elements, PaymentElement, LinkAuthenticationElement } from 'svelte-stripe';
	import { cartLength } from '$src/lib/common/store';
	import type { Order, OrderItem } from '../types';
	import { calculateTotal } from '$src/lib/common/utils/utils';
	import { Toast } from '$src/lib/common/components/toast';

	let stripe: any = null;
	let clientSecret: any = null;
	let error: any = null;
	let elements: any;
	let processing: any = false;
	let toastMessage: string;
	let toastBgColor: string;

	// Function to generate unique order ID
	const generateOrderId = (): string => {
		return 'ORD-' + Date.now() + '-' + Math.random().toString(36).substring(2, 9);
	};

	// Function to get current cart items
	const getCurrentCart = (): OrderItem[] => {
		try {
			const cartData = localStorage.getItem('cart');
			return cartData ? JSON.parse(cartData) : [];
		} catch (err) {
			console.error('Error parsing cart data:', err);
			return [];
		}
	};

	// Function to get order history
	const getOrderHistory = (): Order[] => {
		try {
			const orderData = localStorage.getItem('orderHistory');
			return orderData ? JSON.parse(orderData) : [];
		} catch (err) {
			console.error('Error parsing order history:', err);
			return [];
		}
	};

	// Function to save order
	const saveOrder = (cartItems: OrderItem[]) => {
		try {
			// Create new order object
			const newOrder: Order = {
				orderId: generateOrderId(),
				items: cartItems,
				totalAmount: calculateTotal(cartItems),
				orderDate: new Date().toISOString(),
				paymentStatus: 'completed'
			};

			// Get existing orders
			const existingOrders = getOrderHistory();

			// Add new order to the beginning of the array
			const updatedOrders = [newOrder, ...existingOrders];

			// Save updated orders to localStorage
			localStorage.setItem('orderHistory', JSON.stringify(updatedOrders));

			return newOrder;
		} catch (err) {
			console.error('Error saving order:', err);
			throw err;
		}
	};

	onMount(async () => {
		stripe = await loadStripe(PUBLIC_STRIPE_KEY);
		clientSecret = await createPaymentIntent();
	});

	async function createPaymentIntent() {
		const cartItems = getCurrentCart();
		const totalAmount = calculateTotal(cartItems);

		const response = await fetch('/api/payment-element/payment-intent', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				amount: totalAmount,
				items: cartItems
			})
		});
		const { clientSecret } = await response.json();

		return clientSecret;
	}

	async function submit() {
		if (processing) return;

		try {
			processing = true;

			// Get current cart items before clearing
			const cartItems = getCurrentCart();

			// Confirm payment with stripe
			const result = await stripe.confirmPayment({
				elements,
				redirect: 'if_required'
			});

			if (result.error) {
				error = result.error;
				processing = false;
			} else {
				// Payment succeeded
				try {
					// Save order to history
					const savedOrder = saveOrder(cartItems);
					console.log('Order saved successfully:', savedOrder);

					// Clear cart
					localStorage.setItem('cart', JSON.stringify([]));
					cartLength.set(0);

					toastMessage='Payment successful! Order ID: ' + savedOrder.orderId;
					toastBgColor='bg-ng-green-400';
					goto('/');
				} catch (err) {
					toastMessage='Payment successful but there was an error saving your order. Please contact support.';
					toastBgColor='bg-ng-red-400';
				}
			}
		} catch (err) {
			console.error('Error processing payment:', err);
			error = {
				message: 'There was an unexpected error processing your payment.'
			};
			processing = false;
		}
	}
</script>


<Toast bind:message={toastMessage} bind:bgColor={toastBgColor} textColor="white" />

{#if error}
	<p class="error">{error.message} Please try again.</p>
{/if}
<div class="common-padding">
	{#if clientSecret}
		<Elements
			{stripe}
			{clientSecret}
			theme="flat"
			labels="floating"
			variables={{ colorPrimary: '#7c4dff' }}
			rules={{ '.Input': { border: 'solid 1px #0002' } }}
			bind:elements
		>
			<form on:submit|preventDefault={submit}>
				<LinkAuthenticationElement />
				<PaymentElement />

				<button class="bg-blue-400" disabled={processing}>
					{#if processing}
						Processing...
					{:else}
						Pay
					{/if}
				</button>
			</form>
		</Elements>
	{:else}
		Loading...
	{/if}
</div>

<style lang="scss">
	.error {
		color: tomato;
		margin: 2rem 0 0;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin: 2rem 0;
	}

	button {
		padding: 1rem;
		border-radius: 5px;
		border: solid 1px #ccc;
		color: white;
		font-size: 1.2rem;
		margin: 1rem 0;
	}
</style>
