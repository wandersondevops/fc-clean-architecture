import UpdateProductUseCase from "./update.product.usecase";
import Product from "../../../domain/product/entity/product";

const product = new Product("123", "Product 1", 100);

const input = {
  id: "123",
  name: "Product Updated",
  price: 200,
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    update: jest.fn(),
  };
};

describe("Unit test for product update use case", () => {
  it("should update a product", async () => {
    const productRepository = MockRepository();
    const usecase = new UpdateProductUseCase(productRepository);

    const output = await usecase.execute(input);

    expect(output).toEqual(input);
  });

  it("should throw error when product not found", async () => {
    const productRepository = MockRepository();
    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });
    const usecase = new UpdateProductUseCase(productRepository);

    await expect(usecase.execute(input)).rejects.toThrow("Product not found");
  });
});
