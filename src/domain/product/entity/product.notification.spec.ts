import Product from "./product";
import NotificationError from "../../@shared/notification/notification.error";

describe("Product notification unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Product("", "Product 1", 100);
    }).toThrow(NotificationError);
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      new Product("123", "", 100);
    }).toThrow(NotificationError);
  });

  it("should throw error when price is less than or equal to zero", () => {
    expect(() => {
      new Product("123", "Product 1", 0);
    }).toThrow(NotificationError);
  });

  it("should throw error when name and price are invalid", () => {
    expect(() => {
      new Product("123", "", 0);
    }).toThrow(NotificationError);
  });

  it("should accumulate multiple errors", () => {
    let product = new Product("123", "Product 1", 100);
    
    try {
      // Attempt to create a product with multiple validation errors
      product = new Product("", "", 0);
    } catch (e) {
      const error = e as NotificationError;
      expect(error.errors.length).toBe(3);
      expect(error.errors[0].message).toBe("Id is required");
      expect(error.errors[1].message).toBe("Name is required");
      expect(error.errors[2].message).toBe("Price must be greater than zero");
    }
  });

  it("should throw error when name is changed to empty", () => {
    const product = new Product("123", "Product 1", 100);
    
    expect(() => {
      product.changeName("");
    }).toThrow(NotificationError);
  });

  it("should throw error when price is changed to less than or equal to zero", () => {
    const product = new Product("123", "Product 1", 100);
    
    expect(() => {
      product.changePrice(0);
    }).toThrow(NotificationError);
  });
});
