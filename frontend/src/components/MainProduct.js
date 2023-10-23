import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'
import { Card } from 'react-bootstrap'
import Slider from 'react-slick';
import ProductHomeScreen from '../components/ProductHomeScreen'

const MainProduct = ({ screenWidth, screenHeight, squaresPerRow }) => {
  
  const productList = useSelector((state) => state.productList)

  const { loading, error, products, page, pages } = productList

  const calculateGridSize = () => {
    const columns = squaresPerRow;
    const rows = Math.ceil(screenHeight / (screenWidth / squaresPerRow));
    return { rows, columns };
  };
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    adaptiveHeight: true, // Enable adaptive height
    style: { width: "350px", display: "block" }, // Set the height dynamically
    autoplay: true, // Enable autoplay
    autoplaySpeed: 2000,
    prevArrow: <></>, // Use empty fragment to hide previous arrow
    nextArrow: <></>,
  };
  const renderSquares = () => {
    const squares = [];

    for (let i = 0; i < squaresPerRow * calculateGridSize().rows; i++) {
      const squareStyle = {
        backgroundColor: 'red',
      };

      squares.push(        <Slider key={i} {...settings}>
        {products.map((product) => (
          <ProductHomeScreen key={product._id} product={product} />
        ))}
      </Slider>);
    }

    return squares;
  };

  const { rows, columns } = calculateGridSize();

  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gridTemplateRows: `repeat(${rows}, 1fr)`,
    height: '100vh',
  };

  return <div style={containerStyle}>{renderSquares()}</div>;
}
export default MainProduct
