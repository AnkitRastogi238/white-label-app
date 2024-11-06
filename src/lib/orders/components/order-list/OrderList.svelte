<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	interface OrderItem {
		id: string;
		name: string;
		price: number;
		quantity: number;
	}

	interface Order {
		orderId: string;
		items: OrderItem[];
		totalAmount: number;
		orderDate: string;
		paymentStatus: string;
	}

	let orders: Order[] = [];

	onMount(() => {
		const orderHistory = localStorage.getItem('orderHistory');
		orders = orderHistory ? JSON.parse(orderHistory) : [];
	});

	function formatDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	function viewOrderDetails(orderId: string) {
		goto(`/orders/${orderId}`);
	}
</script>

<div class="common-padding">
	<h1 class="text-3xl font-bold mb-6 text-center">Order History</h1>

	{#if orders.length === 0}
		<div class="text-center py-8">
			<p class="text-gray-500">No orders found</p>
		</div>
	{:else}
		<div class="space-y-4 w-full">
			{#each orders as order}
				<button
					class="border w-full rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
					on:click={() => viewOrderDetails(order.orderId)}
				>
					<div class="flex justify-between items-start">
						<div>
							<h2 class="font-semibold">Order #{order.orderId}</h2>
							<p class="text-gray-600">{formatDate(order.orderDate)}</p>
						</div>
						<div class="text-right">
							<p class="font-bold">₹{order.totalAmount}</p>
							<span
								class="inline-block px-2 py-1 text-sm rounded-full {order.paymentStatus ===
								'completed'
									? 'bg-green-100 text-green-800'
									: 'bg-yellow-100 text-yellow-800'}"
							>
								{order.paymentStatus}
							</span>
						</div>
					</div>
					<div class="mt-2">
						<p class="text-gray-600">{order.items.length} items</p>
					</div>
				</button>
			{/each}
		</div>
	{/if}
</div>
