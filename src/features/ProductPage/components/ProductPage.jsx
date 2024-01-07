import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Button, CircularProgress, Container, Grid } from "@mui/material"
import { fetchProduct } from "../actions/productPageActions"
import { updateCardData, updateUserData, submitPayment } from "../actions/paymentActions"
import PaymentModal from "./PaymentModal"
import './ProductPage.css'
import { toast } from "react-toastify"
import PaymentSummaryModal from "../../../components/feature-specific/payment/PaymentSummaryModal"

const ProductPage = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const {product, loading: loadingProduct, error} = useSelector(state => state.productReducer)
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
    const [isPaymentSummaryModalOpen, setIsPaymentSummaryModalOpen] = useState(false)
    const [paymentStep, setPaymentStep] = useState(1)
    const paymentResponse = useSelector(state => state.paymentReducer.paymentResponse)
    const {userData : paymentUserData, cardData : paymentCardData} = useSelector(state => state.paymentReducer)
    const { loading : loadingPayment }  = useSelector(state => state.paymentReducer)

    useEffect(() => {
        dispatch(fetchProduct(id))

        const paymentUserData = JSON.parse(localStorage.getItem('userData'))
        const paymentCardData = JSON.parse(localStorage.getItem('cardData'))
        if (paymentUserData) dispatch(updateUserData(paymentUserData))
        if (paymentCardData) dispatch(updateCardData(paymentCardData))
     }, [dispatch, id])

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

    const handlePaymentSummaryModalOpen = () => {
        setIsPaymentSummaryModalOpen(true)
    }

    const handlePaymentSummaryModalClose = () => {
        setIsPaymentSummaryModalOpen(false)
    }

    const handleAddToCart = () => {
        toast.info("Lo sentimos, esta funcionalidad no está disponible aún")
    }

    const handleConfirmPayment = async() => {
        try{
            dispatch(submitPayment({paymentUserData, paymentCardData, product}))

            setIsPaymentModalOpen(false)
            setPaymentStep(1)
            setIsPaymentSummaryModalOpen(true)
            dispatch(updateUserData({
                fullName: "",
                email: "",
                phone: "",
                country: "",
            }))
            dispatch(updateCardData({
                cardNumber: "",
                cardHolder: "",
                expirationMonth: 1,
                expirationYear: 2025,
                cvc: "",
                indentificationType: "CC",
                identificationNumber: "",
                cuoteNumber: "",
            }))

        } catch (error) {
            console.log(error)
        }
    }


    if (loadingProduct) {
        return <CircularProgress
                    color="warning"
                    size={70}
                    sx={{
                        position: "fixed",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 2
                    }}
                />
    }
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
            <PaymentSummaryModal 
                open={isPaymentSummaryModalOpen}
                onClose={handlePaymentSummaryModalClose}
                data={paymentResponse}
            />
            <PaymentModal 
                open={isPaymentModalOpen} 
                loading={loadingPayment}
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