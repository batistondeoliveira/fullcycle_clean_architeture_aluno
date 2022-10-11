import { Sequelize } from "sequelize-typescript"
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";

jest.useRealTimers();

describe("Test create product use case", () => {

  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory2",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product A", async () => {

    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository);                  

    const result = await usecase.execute({
      type: "a", 
      name: "Product A", 
      price: 100
    });

    const output = {
      id: expect.any(String),
      name: "Product A",
      price: 100,
    }

    expect(result).toEqual(output);
  });

  it("should create a product B", async () => {

    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository);                  

    const result = await usecase.execute({
      type: "b", 
      name: "Product B", 
      price: 200
    });

    const output = {
      id: expect.any(String),
      name: "Product B",
      price: 400,
    }

    expect(result).toEqual(output);
  });
})