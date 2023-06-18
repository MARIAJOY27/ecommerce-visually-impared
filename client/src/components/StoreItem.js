import { useState } from "react"
import formatCurrency from "../util/formatCurrency"
import StoreItemModal from "./StoreItemModal"
import './StoreItem.css'
export default function StoreItem({ item }) {
  // console.log(item)
  const [open, setOpen] = useState(false)

  function openModal() {
    setOpen(true)
  }

  function closeModal() {
    setOpen(false)
  }

  return (
    <>
      <div className="store-card">
        <div className="img-sec">
          <img src={item.img} alt="" />
        </div>
        <div className="store-item-details">
          <h3>{item.name}</h3>
          <h5>Category: {item.category}</h5>
          <h6>Price : {formatCurrency(item.priceCents / 100)}</h6>
          <button
            className="btn-view-product"
            onClick={openModal}
          >
            View Product
          </button>
        </div>
      </div>
      <StoreItemModal item={item} open={open} closeModal={closeModal} />
    </>
  )
}
