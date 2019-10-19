import { writable } from 'svelte/store'

export const costList = writable(
  JSON.parse(localStorage.getItem('costList')) || []
)

export const shoppingList = writable([])
