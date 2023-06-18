import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { CartProvider } from "./context/CartContext"
import { AuthProvider } from "./context/AuthContext"
import "tailwindcss/tailwind.css"

ReactDOM.render(
  <AuthProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </AuthProvider>,
  document.getElementById("root")
)
