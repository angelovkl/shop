import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'

import ProductHomeScreen from '../components/ProductHomeScreen'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import MainProduct from '../components/MainProduct'
import CartComponent from '../components/CartComponent'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { listProducts } from '../actions/productActions'
import { Container } from 'react-bootstrap'

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const cartIsOpen = useSelector((state) => state.cart)
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber]);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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

   const renderSliders = () => {
    const sliders = [];
    
    for (let i = 0; i < Math.round(window.innerWidth/300) * (Math.round(window.innerHeight/300) * 2) ; i++) {

      sliders.push(
        <Slider key={i} {...settings}>
          {products.map((product) => (
            <ProductHomeScreen key={product._id} product={product} />
          ))}
        </Slider>
      );
    }

    return sliders;
  };
  return (
    // <>
    //   <Meta />
    //   {!keyword ? (
    //     <></>
    //   ) : (
    //     <Link to='/' className='btn btn-light'>
    //       Go Back
    //     </Link>
    //   )}
    //   {/* <h1>Latest Products</h1> */}
    //   {loading ? (
    //     <Loader />
    //   ) : error ? (
    //     <Message variant='danger'>{error}</Message>
    //   ) : (
    //     <div style={{
    //       display: "flex",
    //       flexWrap: "wrap",
    //       justifyContent: "center",
    //       position: "relative",
    //       bottom: 50,
    //       zIndex: -1
    //     }}>

    //     {/* {renderSliders()} */}
    //     </div>
    //   )}
    // </>
<MainProduct
  screenWidth={window.innerWidth}
  screenHeight={window.innerHeight}
  squaresPerRow={10}
/>
  )
}

export default HomeScreen
