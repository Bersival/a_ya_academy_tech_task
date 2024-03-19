import { Button } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks/redux";
import { removeFromCart } from "../../store/cartSlice";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  const handleDeleteItem = (item) => {
    console.log(item.id)
    dispatch(removeFromCart(item.id));
  };
  return (
    <div className="mt-20 min-h-96 h-1/2">
      <h1>Cart</h1>
      <ul className="w-screen bg-slate-600 h-full">
        {cartItems.map((item, index) => (
          <li
            className="text-white h-9 py-8 px-12 bg-slate-800 mb-2 flex items-center justify-between"
            key={index}
          >
            <div>
              {item.name} - {item.color} - {item.size} - ${item.price}
            </div>
            <Button onClick={() => handleDeleteItem(item)} type="dashed" danger>
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartPage;
