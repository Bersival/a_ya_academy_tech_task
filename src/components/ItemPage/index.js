import React, { useState, useEffect } from "react";
import { Card, Row, Col, Image, Typography, Button } from "antd";
import {
  getProduct,
  getProductColor,
  getSize,
  getSizes,
} from "../../services/api";
import styles from "./style.module.css";
import { useAppDispatch } from "../../hooks/redux";
import { addToCart } from "../../store/cartSlice";
const { Meta } = Card;
const { Title, Text } = Typography;
const ProductPage = ({ productId }) => {
  const dispatch = useAppDispatch();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [productColor, setProductColor] = useState(null);
  const [allSizes, setAllSizes] = useState([]);

  const handleColorChange = async (colorId) => {
    try {
      const color = await getProductColor(selectedProduct.id, colorId);
      setProductColor(color);
      setSelectedSize(null);
      try {
        const sizes = color.sizes.map(
          async (size) => await getSize(size?.id ?? size)
        );
        const sizeData = await Promise.all(sizes);
        color.sizes = sizeData;
      } catch (e) {
        console.error("Error fetching sizes:", color.sizes);
      }
      setSelectedColor(color);
    } catch (error) {
      console.error("Error fetching product color:", error);
    }
  };

  const handleSizeChange = async (sizeId) => {
    try {
      const sizeData = await getSize(sizeId);
      setSelectedSize(sizeData);
    } catch (error) {
      console.error("Error fetching size:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const product = await getProduct(productId);
        setSelectedProduct(product);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchData();
  }, [productId]);

  useEffect(() => {
    const fetchAllSizes = async () => {
      try {
        const sizes = await getSizes();
        setAllSizes(sizes);
      } catch (error) {
        console.error("Error fetching sizes:", error);
      }
    };
    fetchAllSizes();
  }, []);

  const handleAddToCart = () => {
    if (!selectedProduct) return null;
    if (!selectedColor) return null;
    if (!selectedSize) return null;
    const cartItem = {
      id: `${selectedProduct?.id}${productColor?.id}${selectedSize?.id}`,
      name: selectedProduct?.name,
      price: productColor?.price,
      color: selectedColor?.name,
      size: selectedSize?.label,
    };
    dispatch(addToCart(cartItem));
  };

  return (
    <div
      className={`${styles.cardPageContainer} w-screen top-0 left-0 h-screen absolute z-20 bg-black`}
    >
      <div className="p-4">
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card>
              <Row gutter={[16, 16]}>
                {selectedProduct &&
                  selectedProduct.colors.map((color) => (
                    <Col key={color.id} xs={24} sm={12} md={8} lg={6}>
                      <Card
                        hoverable
                        cover={
                          <Image
                            src={color.images[0]}
                            alt={color.name}
                            preview={false}
                          />
                        }
                        onClick={() => handleColorChange(color.id)}
                        className={`mr-5 cursor-pointer ${
                          selectedColor && selectedColor.id === color.id
                            ? "border border-blue-500"
                            : ""
                        }`}
                      >
                        <Meta title={color.name} />
                      </Card>
                    </Col>
                  ))}
              </Row>
            </Card>
          </Col>
          {selectedColor && (
            <Col span={24}>
              <Card>
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <Title level={4}>
                      Selected Color: {selectedColor.name}
                    </Title>
                    <Text>{selectedColor.description}</Text>
                  </Col>
                  {allSizes.map((size) => (
                    <Col key={size.id} xs={24} sm={12} md={8} lg={6}>
                      <Button
                        className={`${styles.sizeWrapper}`}
                        disabled={
                          selectedColor.sizes
                            .map((size) => size.id)
                            .indexOf(size.id) === -1
                        }
                      >
                        <Card
                          hoverable
                          onClick={() => handleSizeChange(size.id)}
                          className={`cursor-pointer ${
                            selectedSize && selectedSize.id === size.id
                              ? "border border-blue-500"
                              : ""
                          }`}
                        >
                          <Meta
                            title={size?.label}
                            description={`Number: ${size?.number}`}
                          />
                        </Card>
                      </Button>
                    </Col>
                  ))}
                </Row>
              </Card>
            </Col>
          )}
          {selectedSize && (
            <Col span={24}>
              <Card>
                <Meta
                  title="Product Details"
                  description={
                    <>
                      <Title level={3}>{selectedProduct.name}</Title>
                      <Text>Price: ${productColor.price}</Text>
                      <br />
                      <Text>Size: {selectedSize.label}</Text>
                      <br />
                      <Text>Description: {productColor.description}</Text>
                      <br />
                      <Button
                        onClick={handleAddToCart}
                        className="mt-5"
                        size="large"
                      >
                        Add to cart
                      </Button>
                    </>
                  }
                />
              </Card>
            </Col>
          )}
        </Row>
      </div>
    </div>
  );
};

export default ProductPage;
