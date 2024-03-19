import React, { useEffect, useState } from "react";
import ItemCard from "../ItemCard";
import { getProducts } from "../../services/api";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const products = await getProducts();
    setProducts(products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="w-screen flex justify-center mt-14">
      {products.map((product) => (
        <ItemCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsList;
