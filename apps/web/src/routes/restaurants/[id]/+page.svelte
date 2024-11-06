<script lang="ts">
	import { page } from '$app/stores';
	import Detail from '$src/lib/restaurants/detail/Detail.svelte';

	const id = $page?.url?.pathname.split('/').pop();
</script>

<Detail restaurantId={Number(id)} />
