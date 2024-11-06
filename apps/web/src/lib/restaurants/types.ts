
export interface OrderItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

export interface Order {
    orderId: string;
    items: OrderItem[];
    totalAmount: number;
    orderDate: string;
    paymentStatus: string;
}