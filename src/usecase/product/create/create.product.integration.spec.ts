import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";

describe("Test create product use case integration", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const input = {
      name: "Product 1",
      price: 100,
    };

    const output = await usecase.execute(input);

    expect(output).toHaveProperty("id");
    expect(output.name).toBe(input.name);
    expect(output.price).toBe(input.price);

    // Verify that the product was actually created in the repository
    const foundProduct = await productRepository.find(output.id);
    expect(foundProduct).toBeDefined();
    expect(foundProduct.id).toBe(output.id);
    expect(foundProduct.name).toBe(input.name);
    expect(foundProduct.price).toBe(input.price);
  });

  it("should throw error when name is missing", async () => {
    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const input = {
      name: "",
      price: 100,
    };

    await expect(usecase.execute(input)).rejects.toThrow(
      "Name is required"
    );
  });

  it("should throw error when price is less than or equal to zero", async () => {
    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const input = {
      name: "Product 1",
      price: 0,
    };

    await expect(usecase.execute(input)).rejects.toThrow(
      "Price must be greater than zero"
    );
  });
});
