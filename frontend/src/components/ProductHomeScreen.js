import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { useDispatch, useSelector } from 'react-redux'
import { selectProduct } from '../actions/productActions'
import { setCartOpen } from '../actions/cartActions'

const ProductHomeScreen = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div>
        <img src={product.image} variant='top' style={{width: "100%"}}></img>
    </div>
  )
}

export default ProductHomeScreen
