import { useState, useEffect } from "react"
import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { db } from "./data/db"
function App() {

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

  return (
    <>
      <Header cart={cart}
        removeFromCart={removeFromCart}
        addQuality={addQuantity}
        removeQuality={removeQuantity}
        clearCart={clearCart}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              addToCart={addToCart}
            />
          ))}
        </div>
      </main>


      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>
    </>
  )
}

export default App
