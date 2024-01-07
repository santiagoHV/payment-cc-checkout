import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import ProductPage from "../../../../src/features/ProductPage";
import rootReducer from "../../../../src/store/rootReducer";

describe("ProductPage", () => {
    let store;

    beforeEach(() => {
        store = configureStore({
            reducer: rootReducer
        })
    });

    it("renders the ProductPage component", async() => {
        // const mockId = '1';
        
        // render(
        //     <Provider store={store}>
        //         <Router initialEntries={[`/product/${mockId}`]}>
        //             <Routes>
        //                 <Route path="/product/:id" element={<ProductPage />} />
        //             </Routes>
        //         </Router>
        //     </Provider>
        // );

        // await waitFor(() => screen.getByTestId('price'));

        // expect(screen.getByText("price")).toBeInTheDocument();
    });

    
    
});
