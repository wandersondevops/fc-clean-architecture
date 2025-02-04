import CreateProductUseCase from "./create.product.usecase";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import Product from "../../../domain/product/entity/product";

const input = {
  name: "Product 1",
  price: 100,
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn(),
  };
};

describe("Unit test create product use case", () => {
  it("should create a product", async () => {
    const productRepository = MockRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);

    const output = await createProductUseCase.execute(input);

    expect(output).toHaveProperty("id");
    expect(output.name).toBe(input.name);
    expect(output.price).toBe(input.price);
  });

  it("should throw error when name is missing", async () => {
    const productRepository = MockRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);

    const invalidInput = { ...input, name: "" };

    await expect(createProductUseCase.execute(invalidInput)).rejects.toThrow(
      "Name is required"
    );
  });

  it("should throw error when price is less than or equal to zero", async () => {
    const productRepository = MockRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);

    const invalidInput = { ...input, price: 0 };

    await expect(createProductUseCase.execute(invalidInput)).rejects.toThrow(
      "Price must be greater than zero"
    );
  });
});
