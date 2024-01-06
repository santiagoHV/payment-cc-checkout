import {
    SUBMIT_PAYMENT_ERROR,
    SUBMIT_PAYMENT_PENDING, 
    SUBMIT_PAYMENT_SUCCESS,
    UPDATE_CARD_DATA,
    UPDATE_USER_DATA
} from "../actions/paymentActions";

const initialState = {
    payment: null,
    cardData: {
        cardNumber: "",
        cardHolder: "",
        expirationMonth: 1,
        expirationYear: 2025,
        cvc: "",
        indentificationType: "CC",
        identificationNumber: "",
        cuoteNumber: "",
    },
    userData: {
        fullName: "",
        email: "",
        phone: "",
        country: "",
    },
    loading: false,
    error: null
};

const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUBMIT_PAYMENT_SUCCESS:
            return {
                ...state,
                payment: action.payload,
                loading: false,
            };
        case SUBMIT_PAYMENT_PENDING:
            return {
                ...state,
                loading: true,
            };
        case SUBMIT_PAYMENT_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case UPDATE_CARD_DATA:
            return {
                ...state,
                cardData: action.payload
            };
        case UPDATE_USER_DATA:
            return {
                ...state,
                userData: action.payload
            };
        default:
            return state;
    }
}

export default paymentReducer