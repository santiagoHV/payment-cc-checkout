import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchProduct } from "../actions"

const ProductPage = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const product = useSelector(state => state.productReducer.product)
    const loading = useSelector(state => state.productReducer.loading)
    const error = useSelector(state => state.productReducer.error)

    useEffect(() => {
       dispatch(fetchProduct(id))
    }, [dispatch, id])

    if (loading) return <div>Loading...</div>
    if (error) return <div>ERROR: {error}</div>

    return (
        <>
            <div>
                <h2>Product Page</h2>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>{product.price}</p>
            </div>
        </>
        
    )
}

export default ProductPage