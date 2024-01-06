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

export const updateCardData = (cardData) => ({
    type: UPDATE_CARD_DATA,
    payload: cardData
})

export const updateUserData = (userData) => ({
    type: UPDATE_USER_DATA,
    payload: userData
})

export const submitPayment = (paymentData) => {
    return async (dispatch) => {
        dispatch(submitPaymentPending());

        try{
            const payment = await service.createPayment(paymentData);
            dispatch(submitPaymentSuccess(payment));
        } catch (error) {
            console.error(error);
            dispatch(submitPaymentError(error));
        }
    }
}