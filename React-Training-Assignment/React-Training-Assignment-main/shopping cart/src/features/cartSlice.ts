import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice} from '@reduxjs/toolkit'

export interface Product {
  id: number
  name: string
  price: number
  image: string
}

export interface CartItem extends Product {
  quantity: number
}

interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Product>) => {
      const existing = state.items.find(i => i.id === action.payload.id)
      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(i => i.id !== action.payload)
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const item = state.items.find(i => i.id === action.payload.id)
      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter(i => i.id !== action.payload.id)
        } else {
          item.quantity = action.payload.quantity
        }
      }
    },
    clear: state => {
      state.items = []
    },
  },
})

export const { addItem, removeItem, updateQuantity, clear } = cartSlice.actions
export default cartSlice.reducer
