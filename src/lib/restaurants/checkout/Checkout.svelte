<script lang="ts">
	import { goto } from '$app/navigation';
	import GenericForm from '$src/lib/common/components/generic-form/GenericForm.svelte';
	const addressFormFields = [
		{
			name: 'streetAddress',
			label: 'Street Address',
			placeholder: 'Enter your street address',
			type: 'text',
			isMandatory: true,
			errorMessage: 'Please enter your street address'
		},
		{
			name: 'apartment',
			label: 'Apartment/Suite/Unit',
			placeholder: 'Enter apartment number (if applicable)',
			type: 'text',
			isMandatory: false,
			errorMessage: 'Please enter a valid apartment number'
		},
		{
			name: 'city',
			label: 'City',
			placeholder: 'Enter your city',
			type: 'text',
			isMandatory: true,
			errorMessage: 'Please enter your city'
		},
		{
			name: 'state',
			label: 'State',
			placeholder: 'Select your state',
			type: 'select',
			isMandatory: true,
			errorMessage: 'Please select your state',
			options: [
				{
					label: 'Haryana',
					value: 'haryana'
				},
				{
					label: 'Uttar Pradesh',
					value: 'up'
				},
				{
					label: 'Delhi',
					value: 'delhi'
				}
			]
		},
		{
			name: 'zipCode',
			label: 'ZIP Code',
			placeholder: 'Enter ZIP code',
			type: 'text',
			isMandatory: true,
			errorMessage: 'Please enter a valid ZIP code'
		}
	];

	const handlePayment = async (event: any) => {
		console.log('Form submitted to :', event.detail);
		goto('/restaurants/checkout/payment');
	};
</script>

<div class="w-full common-padding">
	<div class="flex flex-col gap-6 text-center">
		<h3 class="text-ng64 font-roboto text-ng">Checkout</h3>
		<div
			class="grid grid-cols-2 bg-orange-300 gap-6 items-center justify-center border border-ng-gray-500 shadow-ngcardshadow"
		>
			<h3 class="text-white px-10 text-ng32 font-lato">Address Details</h3>
			<GenericForm
				handleSubmit={handlePayment}
				submitBtnText="Proceed to Payment"
				formFields={addressFormFields}
			/>
		</div>
	</div>
</div>
