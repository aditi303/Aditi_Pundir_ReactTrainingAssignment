import { useState } from 'react'
import './App.css'

interface Product {
  id: number
  name: string
  price: number
  image: string
}

interface CartItem extends Product {
  quantity: number
}

const products: Product[] = [
  { id: 1, name: 'Laptop', price: 999, image: '💻' },
  { id: 2, name: 'Smartphone', price: 699, image: '📱' },
  { id: 3, name: 'Headphones', price: 199, image: '🎧' },
  { id: 4, name: 'Tablet', price: 499, image: '📱' },
  { id: 5, name: 'Smartwatch', price: 399, image: '⌚' },
  { id: 6, name: 'Camera', price: 1299, image: '📷' },
  { id: 7, name: 'Speaker', price: 149, image: '🔊' },
  { id: 8, name: 'USB Cable', price: 19, image: '🔌' },
  { id: 9, name: 'Gaming Console', price: 29999, image: '🎮' },
  { id: 10, name: 'Wireless Mouse', price: 799, image: '🖱️' },
  { id: 11, name: 'Keyboard', price: 1499, image: '⌨️' },
  { id: 12, name: 'External HDD', price: 3499, image: '💾' },
]

function App() {
  const [cart, setCart] = useState<CartItem[]>([])

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount)

  const addToCart = (product: Product) => {
    const existing = cart.find(item => item.id === product.id)
    if (existing) {
      setCart(
        cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      )
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id))
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
    } else {
      setCart(
        cart.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      )
    }
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <div className="app-container">
      <header className="app-header">
        <h2>Shopping Cart</h2>
      </header>

      <div className="shopping-layout">
        <div className="products-section">
          <h3>Products</h3>
          <div className="products-grid">
            {products.map(product => {
              const inCart = cart.some(item => item.id === product.id)

              return (
                <div key={product.id} className="product-card">
                  <div className="product-image">{product.image}</div>
                  <h3>{product.name}</h3>
                  <p className="product-price">
                    {formatPrice(product.price)}
                  </p>
                  <button
                    className="add-to-cart-btn"
                    onClick={() => addToCart(product)}
                    disabled={inCart}
                  >
                    {inCart ? 'Added' : 'Add to Cart'}
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        <div className="cart-section">
          <h3>Shopping Cart ({cart.length})</h3>

          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty</p>
          ) : (
            <>
              <div className="cart-items">
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-image">{item.image}</div>
                    <div className="cart-item-details">
                      <h4>{item.name}</h4>
                      <p>{formatPrice(item.price)}</p>
                    </div>
                    <div className="cart-item-quantity">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="qty-btn"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={e =>
                          updateQuantity(item.id, parseInt(e.target.value) || 1)
                        }
                        min="1"
                        className="qty-input"
                      />
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="qty-btn"
                      >
                        +
                      </button>
                    </div>
                    <div className="cart-item-total">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <div className="summary-row total-row">
                  <span>Total:</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default App

