import { useState, useEffect } from "react"
import { db } from "../data/db"
import { useMemo } from "react"
export function useCart() {

  //State
  const initial = JSON.parse(localStorage.getItem('cart')) || []
  const [data] = useState(db)
  const [cart, setCart] = useState(initial)

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  //Fnciones
  function addToCart(item) {
    const itemExists = cart.findIndex(guitar => guitar.id === item.id)
    if (itemExists >= 0) {
      if (cart[itemExists].quality >= 5) return
      const updateCart = [...cart]
      updateCart[itemExists].quality++
      setCart(updateCart)
    } else {
      item.quality = 1
      setCart([...cart, item])
    }
  }

  function clearCart() {
    setCart([])
  }

  function removeFromCart(item) {
    setCart(updateCart => cart.filter(guitar => guitar.id !== item))
  }

  function addQuantity(item) {
    const updateCart = cart.map(guitar => {
      if (guitar.id === item && guitar.quality < 5) {
        return { ...guitar, quality: guitar.quality + 1 }
      }
      return guitar
    })
    setCart(updateCart)
  }

  function removeQuantity(item) {
    const updateCart = cart.map(guitar => {
      if (guitar.id === item && guitar.quality > 1) {
        return {
          ...guitar,
          quality: guitar.quality - 1
        }
      }
      return guitar
    })
    setCart(updateCart)
  }

  //state derivado
  const isEmpty = useMemo(() => cart.length === 0, [cart])
  const total = useMemo(() => cart.reduce((total, guitar) => total + guitar.price * guitar.quality, 0), [cart])

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
