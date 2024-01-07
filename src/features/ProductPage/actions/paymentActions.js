import { toast } from "react-toastify";
import service from "../../../services/fakeApi/paymentService"

export const SUBMIT_PAYMENT_SUCCESS = "SUBMIT_PAYMENT_SUCCESS";
export const SUBMIT_PAYMENT_PENDING = "SUBMIT_PAYMENT_PENDING";
export const SUBMIT_PAYMENT_ERROR = "SUBMIT_PAYMENT_ERROR";
export const UPDATE_CARD_DATA = "UPDATE_CARD_DATA";
export const UPDATE_USER_DATA = "UPDATE_USER_DATA";

export const submitPaymentSuccess = (payment) => (dispatch) =>{
    dispatch({
        type: SUBMIT_PAYMENT_SUCCESS,
        payload: payment
    })

    toast.success("Payment Successful");
}

export const submitPaymentError = (error) => (dispatch) =>{
    dispatch({
        type: SUBMIT_PAYMENT_ERROR,
        payload: error
    })

    toast.error(error.message);
}

export const submitPaymentPending = () => ({
    type: SUBMIT_PAYMENT_PENDING
})

export const updateCardData = (cardData) => (dispatch) => {
    if(cardData.expirationMonth === '') cardData.expirationMonth = 1;
    if(cardData.expirationYear === '') cardData.expirationYear = 2020;
    if(cardData.identificationType === '') cardData.identificationType = 'CC';

    localStorage.setItem("cardData", JSON.stringify(cardData));

    dispatch({
        type: UPDATE_CARD_DATA,
        payload: cardData
    })
}

export const updateUserData = (userData) => (dispatch) => {
    dispatch({
        type: UPDATE_USER_DATA,
        payload: userData
    })  

    localStorage.setItem("userData", JSON.stringify(userData));
}

export const submitPayment = (paymentData) => {
    const data = {
        card: paymentData.paymentCardData,
        user: paymentData.paymentUserData,
        product: paymentData.product
    }
    return async (dispatch) => {
        dispatch(submitPaymentPending());

        try{
            const payment = await service.createPayment(data);
            dispatch(submitPaymentSuccess(payment));
        } catch (error) {
            console.error(error);
            dispatch(submitPaymentError(error));
        }
    }
}