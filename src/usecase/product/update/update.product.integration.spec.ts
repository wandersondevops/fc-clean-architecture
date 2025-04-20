import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";
import Product from "../../../domain/product/entity/product";

describe("Test update product use case integration", () => {
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

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new UpdateProductUseCase(productRepository);
    
    // Create a product in the repository
    const product = new Product("123", "Product 1", 100);
    await productRepository.create(product);

    const input = {
      id: "123",
      name: "Product Updated",
      price: 200,
    };

    const output = await usecase.execute(input);

    expect(output).toEqual(input);

    // Verify that the product was actually updated in the repository
    const updatedProduct = await productRepository.find("123");
    expect(updatedProduct.name).toBe("Product Updated");
    expect(updatedProduct.price).toBe(200);
  });

  it("should throw error when product not found", async () => {
    const productRepository = new ProductRepository();
    const usecase = new UpdateProductUseCase(productRepository);

    const input = {
      id: "non-existing-id",
      name: "Product Updated",
      price: 200,
    };

    await expect(usecase.execute(input)).rejects.toThrow();
  });
});
