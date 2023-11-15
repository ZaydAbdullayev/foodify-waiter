import { render } from "@testing-library/react";
import { PaymentCheck } from "./check";

describe("PaymentCheck", () => {
  it("renders the restaurant name", () => {
    const checkdata = { res_name: "Test Restaurant" };
    const { getByText } = render(<PaymentCheck checkdata={checkdata} />);
    expect(getByText("Test Restaurant")).toBeInTheDocument();
  });

  it("renders the order number", () => {
    const checkdata = { order_id: "123" };
    const { getByText } = render(<PaymentCheck checkdata={checkdata} />);
    expect(getByText("Buyurtma ID: 123")).toBeInTheDocument();
  });

  it("renders the product data", () => {
    const checkdata = {
      product_data: [
        { id: 1, name: "Product 1", quantity: 2, price: 100 },
        { id: 2, name: "Product 2", quantity: 1, price: 50 },
      ],
    };
    const { getByText } = render(<PaymentCheck checkdata={checkdata} />);
    expect(getByText("2x Product 1:")).toBeInTheDocument();
    expect(getByText("Product 2:")).toBeInTheDocument();
  });
});
