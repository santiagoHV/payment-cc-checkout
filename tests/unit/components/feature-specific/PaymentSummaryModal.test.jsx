import { render, screen, fireEvent } from "@testing-library/react";
import PaymentSummaryModal from "../../../../src/components/feature-specific/payment/PaymentSummaryModal";
import { vi } from "vitest";

describe("PaymentSummaryModal", () => {
    it("renders without errors", () => {
        render(<PaymentSummaryModal onClose={() => {}} open={true} data={{}} />);
        
        expect(screen.getByText('RESUMEN DE COMPRA')).toBeDefined()
    });

    it("displays the correct data", () => {
        const testData = {
            product: "test product",
            basePrice: 100,
            iva: 21,
            total: 121
        };

        render(<PaymentSummaryModal onClose={() => {}} open={true} data={testData} />);
        
        expect(screen.getByText("Product: test product")).toBeDefined()
    });
});
