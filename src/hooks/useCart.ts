import { useState, useEffect } from "react"
import { db } from "../data/db"
import { useMemo } from "react"
import { Guitar, CartItem } from "../types"
export function useCart() {

  //State
  const initial = (): CartItem[] => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }
  const [data] = useState(db)
  const [cart, setCart] = useState(initial)

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  //Fnciones
  function addToCart(item: Guitar) {
    const itemExists = cart.findIndex(guitar => guitar.id === item.id)
    if (itemExists >= 0) {
      if (cart[itemExists].quantity >= 5) return
      const updateCart = [...cart]
      updateCart[itemExists].quantity++
      setCart(updateCart)
    } else {
      const newItem: CartItem = { ...item, quantity: 1 }
      setCart([...cart, newItem])
    }
  }

  function clearCart() {
    setCart([])
  }

  function removeFromCart(id:Guitar['id']) {
    const updateCart = cart.filter(guitar => guitar.id !== id)
    setCart(updateCart)
  }

  function addQuantity(id:Guitar['id']) {
    const updateCart = cart.map(guitar => {
      if (guitar.id === id && guitar.quantity < 5) {
        return { ...guitar, quantity: guitar.quantity + 1 }
      }
      return guitar
    })
    setCart(updateCart)
  }

  function removeQuantity(id:Guitar['id']) {
    const updateCart = cart.map(guitar => {
      if (guitar.id === id && guitar.quantity > 1) {
        return {
          ...guitar,
          quantity: guitar.quantity - 1
        }
      }
      return guitar
    })
    setCart(updateCart)
  }

  //state derivado
  const isEmpty = useMemo(() => cart.length === 0, [cart])
  const total = useMemo(() => cart.reduce((total, guitar) => total + guitar.price * guitar.quantity, 0), [cart])

  return {
    data,
    cart,
    addToCart,
    clearCart,
    removeFromCart,
    addQuantity,
    removeQuantity,
    isEmpty,
    total
  }
}
