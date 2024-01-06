import api from "../../api/api";

const createPayment = async(paymentData) => {
    try {
        const payment = await api.createPayment(paymentData);
        console.log("EL PAGO PASO GONORREA")
        console.log(payment)
        return payment;
    
    } catch (error) {
        console.error(error);
        return {error: error.message};
    }
}

export default {
    createPayment
}