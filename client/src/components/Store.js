import StoreItem from "./StoreItem"
import './Store.css'

export default function Store({ items }) {
  return (
        <section>
          <h1 className="heading">Our Products</h1>
          <div className="store-container">
          {items.map(item => (
            <StoreItem key={item.id} item={item} />
          ))}
          </div>
        </section>
  )
}
