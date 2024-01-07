import api from "../../api/api";

const createPayment = async(paymentData) => {
    try {
        const response = await api.createPayment(paymentData)
        console.log(response);
        return response.body;
    
    } catch (error) {
        console.error(error);
        return {error: error.message};
    }
}

export default {
    createPayment
}