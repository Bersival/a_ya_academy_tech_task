import { Card, Carousel } from "antd";
import { useState } from "react";

import "./style.css";
import ProductPage from "../ItemPage";

const ItemCard = ({ product }) => {
  const [productPage, setProductPage] = useState(false);

  return (
    <div>
      {productPage && <ProductPage productId={product.id} />}
      <Card
        onClick={() => setProductPage(true)}
        title={product.name}
        className="mr-5 max-w-screen-2xl px-20 cursor-pointer"
      >
        <div className=" bg-black max-w-96 ">
          <Carousel autoplay>
            {product.colors.map((color) =>
              color.images.map((image, index) => (
                <img
                  key={index}
                  style={{
                    width: "50px !important",
                    height: "50px !important",
                  }}
                  src={image}
                  alt={`${product.name} ${color.name}`}
                />
              ))
            )}
          </Carousel>
        </div>
      </Card>
    </div>
  );
};

export default ItemCard;
