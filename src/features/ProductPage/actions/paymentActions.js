import api from "../../../api/api";

export const FETCH_PAYMENT_SUCCESS = "FETCH_PAYMENT_SUCCESS";
export const FETCH_PAYMENT_PENDING = "FETCH_PAYMENT_PENDING";
export const FETCH_PAYMENT_ERROR = "FETCH_PAYMENT_ERROR";

export const fetchPaymentSuccess = (payment) => ({
    type: FETCH_PAYMENT_SUCCESS,
    payload: payment
})

export const fetchPaymentError = (error) => ({
    type: FETCH_PAYMENT_ERROR,
    payload: error
})

export const fetchPaymentPending = () => ({
    type: FETCH_PAYMENT_PENDING
})

export const fetchPayment = (paymentId) => {
    return async (dispatch) => {
        dispatch(fetchPaymentPending());

        try{
            const payment = await api.fetchPaymentById(paymentId);
            dispatch(fetchPaymentSuccess(payment));
        } catch (error) {
            console.error(error);
            dispatch(fetchPaymentError(error));
        }
    }
}