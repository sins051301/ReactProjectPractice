export default function CartItem({
  name,
  mine,
  price,
  increaseItem,
  decreaseItem,
}) {
  return (
    <li className="cart-item">
      {name} - {mine}x ${price}
      <div className="cart-item-actions">
        <button onClick={decreaseItem}>-</button>
        {mine}
        <button onClick={increaseItem}>+</button>
      </div>
    </li>
  );
}
