<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

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

	let order: Order | null = null;

	onMount(() => {
		const orderId = $page.url.pathname.split('/').pop();
		const orderHistory = localStorage.getItem('orderHistory');
		const orders: Order[] = orderHistory ? JSON.parse(orderHistory) : [];
		order = orders.find((o) => o.orderId === orderId) || null;
	});

	function formatDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	function formatCurrency(amount: number): string {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD'
		}).format(amount);
	}
</script>

<div class="p-6 max-w-4xl mx-auto">
	<a href="/orders" class="text-blue-600 hover:text-blue-800 mb-6 inline-block">
		← Back to Orders
	</a>

	{#if order}
		<div class="bg-white rounded-lg shadow-sm border p-6">
			<div class="flex justify-between items-start mb-6">
				<div>
					<h1 class="text-2xl font-bold">Order #{order.orderId}</h1>
					<p class="text-gray-600">{formatDate(order.orderDate)}</p>
				</div>
				<span
					class="inline-block px-3 py-1 text-sm rounded-full {order.paymentStatus === 'completed'
						? 'bg-green-100 text-green-800'
						: 'bg-yellow-100 text-yellow-800'}"
				>
					{order.paymentStatus}
				</span>
			</div>

			<div class="border-t border-b py-4">
				<h2 class="font-semibold mb-4">Order Items</h2>
				<div class="space-y-4">
					{#each order.items as item}
						<div class="flex justify-between items-center">
							<div>
								<h3 class="font-medium">{item.name}</h3>
								<p class="text-gray-600">Quantity: {item.quantity}</p>
							</div>
							<div class="text-right">
								<p class="font-medium">₹{order.totalAmount}</p>
								<p class="text-sm text-gray-600">
									{item.price} each
								</p>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<div class="mt-4 text-right">
				<p class="text-gray-600">Total Amount</p>
				<p class="text-2xl font-bold">₹{order.totalAmount}</p>
			</div>
		</div>
	{:else}
		<div class="text-center py-8">
			<p class="text-gray-500">Order not found</p>
		</div>
	{/if}
</div>
