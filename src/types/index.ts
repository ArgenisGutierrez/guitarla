export type Guitar = {
  id: number
  name: string
  image: string
  description: string
  price: number
}

export type CartItem = Guitar & {
  quality: number
}

// export type GuitarId = Guitar['id']
// export type GuitarId = Pick<Guitar, 'id'>
