import { db } from "../data/db";
import { CartItem, Guitar } from "../types";

export type CartActions =
  { type: 'add-to-cart', payload: { item: Guitar } } |
  { type: 'remove-from-cart', payload: { id: Guitar['id'] } } |
  { type: 'decrease-quantity', payload: { id: Guitar['id'] } } |
  { type: 'increase-quantity', payload: { id: Guitar['id'] } } |
  { type: 'clear-cart' }

export type CartState = {
  data: Guitar[]
  cart: CartItem[]
}

const localStorageCart = (): CartItem[] => {
  const cart = localStorage.getItem('cart')
  return cart ? JSON.parse(cart) : []
}

export const initialState: CartState = {
  data: db,
  cart: localStorageCart()
}

export const cartReducer = (
  state: CartState = initialState,
  action: CartActions
) => {
  const MAX_QUANTITY = 5
  const MIN_QUANTITY = 1

  if (action.type === 'add-to-cart') {

    const itemExist = state.cart.find(guitar => guitar.id === action.payload.item.id)
    let updatedCart: CartItem[] = []

    if (itemExist) {
      updatedCart = state.cart.map(item => {
        if (item.id === action.payload.item.id) {
          if (item.quantity < MAX_QUANTITY) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        } else {
          return item
        }
      })
    } else {
      const newItem = { ...action.payload.item, quantity: 1 }
      updatedCart = [...state.cart, newItem]
    }
    return {
      ...state,
      cart: updatedCart
    }
  }

  if (action.type === 'remove-from-cart') {

    const updatedCart = state.cart.filter(item => item.id !== action.payload.id)

    return {
      ...state,
      cart: updatedCart
    }
  }

  if (action.type === 'increase-quantity') {

    let updatedCart: CartItem[] = []
    updatedCart = state.cart.map(item => {
      if (item.id === action.payload.id) {
        if (item.quantity < MAX_QUANTITY) {
          return { ...item, quantity: item.quantity + 1 }
        } else {
          return item
        }
      } else {
        return item
      }
    })

    return {
      ...state,
      cart: updatedCart
    }
  }

  if (action.type === 'decrease-quantity') {

    let updatedCart: CartItem[] = []
    updatedCart = state.cart.map(item => {
      if (item.id === action.payload.id) {
        if (item.quantity > MIN_QUANTITY) {
          return { ...item, quantity: item.quantity - 1 }
        } else {
          return item
        }
      } else {
        return item
      }
    })

    return {
      ...state,
      cart: updatedCart
    }
  }

  if (action.type === 'clear-cart') {
    return {
      ...state,
      cart: []
    }
  }

  return state
}
