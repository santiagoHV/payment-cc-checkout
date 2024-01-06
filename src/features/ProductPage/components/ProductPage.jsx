import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Button, Container, Grid } from "@mui/material"
import { fetchProduct } from "../actions"
import PaymentModal from "./PaymentModal"
import './ProductPage.css'

const ProductPage = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const product = useSelector(state => state.productReducer.product)
    const loading = useSelector(state => state.productReducer.loading)
    const error = useSelector(state => state.productReducer.error)
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)

    const handlePaymentModalOpen = () => {
        setIsPaymentModalOpen(true)
    }

    const handlePaymentModalClose = () => {
        setIsPaymentModalOpen(false)
    }

    const handleConfirmPayment = () => {
        //TODO: Send payment data to backend
        alert("Payment confirmed")
    }

    useEffect(() => {
       dispatch(fetchProduct(id))
    }, [dispatch, id])

    if (loading) return <div>Loading...</div>
    if (error) return <div>ERROR: {error}</div>

    return (
        <Container maxWidth="lg" className="product-page">
            <Grid container spacing={2}>
                <Grid item md={6}>
                    <img src={product.image} alt={product.name} />
                </Grid>
                <Grid item md={6}>
                    <h2>{product.name}</h2>
                    <p>{product.overview}</p>
                    <p>{product.details}</p>
                    <p>{product.price}</p>
                    <Button onClick={handlePaymentModalOpen}>Open modal</Button>
                </Grid>
            </Grid>
            <PaymentModal 
                open={isPaymentModalOpen} 
                onClose={handlePaymentModalClose}
                onConfirmPayment={handleConfirmPayment}
            />
        </Container>
        
    )
}

export default ProductPage