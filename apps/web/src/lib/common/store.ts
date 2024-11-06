import { writable } from "svelte/store";


export const openSelectId = writable<string | null>(null);
export const cartLength = writable<number | null>(null);