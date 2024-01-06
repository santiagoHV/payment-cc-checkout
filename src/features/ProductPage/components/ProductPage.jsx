import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Button, Container, Grid } from "@mui/material"
import { fetchProduct } from "../actions/productPageActions"
import { updateCardData, updateUserData, submitPayment } from "../actions/paymentActions"
import PaymentModal from "./PaymentModal"
import './ProductPage.css'
import { toast } from "react-toastify"

const ProductPage = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const {product, loading, error} = useSelector(state => state.productReducer)
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
    const [paymentStep, setPaymentStep] = useState(1)
    const paymentUserData = useSelector(state => state.paymentReducer.userData)
    const paymentCardData = useSelector(state => state.paymentReducer.cardData)

    const handleChangePaymentUserData = (event) => {
        dispatch(updateUserData({
            ...paymentUserData,
            [event.target.name]: event.target.value,
        }))
    }
    
    const handleChangePaymentCardData = (event) => {
        dispatch(updateCardData({
            ...paymentCardData,
            [event.target.name]: event.target.value,
        }))
    }

    const handleNextStep = () => {
        setPaymentStep(paymentStep + 1)
    }

    const handleBackStep = () => {
        setPaymentStep(paymentStep - 1)
    }

    const handlePaymentModalOpen = () => {
        setIsPaymentModalOpen(true)
    }

    const handlePaymentModalClose = () => {
        setIsPaymentModalOpen(false)
    }

    const handleAddToCart = () => {
        toast.info("Lo sentimos, esta funcionalidad no está disponible aún")
    }

    const handleConfirmPayment = async() => {
        try{
            const payment = await dispatch(submitPayment(paymentUserData, paymentCardData))
            setIsPaymentModalOpen(false)
        } catch (error) {
            console.log(error)
        }
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
                    <img 
                        src={product.image} 
                        alt={product.name} 
                        className="product-image"
                    />
                </Grid>
                <Grid item md={6}>
                    <h2 className="product-name">{product.name}</h2>
                    <h3>Overview</h3>
                    <p>{product.overview}</p>
                    <h3>Details</h3>
                    <p>{product.details}</p>
                    <p className="price-text">Price: ${product.price}</p>

                    <Grid container spacing={2}>
                        <Grid item>
                            <Button variant="contained"
                                onClick={handlePaymentModalOpen}
                            >
                                BUY NOW
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button 
                                variant="contained"
                                onClick={handleAddToCart}
                            >
                                ADD TO CART</Button>
                        </Grid>
                    </Grid>
                    
                </Grid>
            </Grid>
            <PaymentModal 
                open={isPaymentModalOpen} 
                onClose={handlePaymentModalClose}
                paymentStep={paymentStep}
                onBackStep={handleBackStep}
                onNextStep={handleNextStep}
                onChangePaymentUserData={handleChangePaymentUserData}
                onChangePaymentCardData={handleChangePaymentCardData}
                onConfirmPayment={handleConfirmPayment}
            />
        </Container>
        
    )
}

export default ProductPage