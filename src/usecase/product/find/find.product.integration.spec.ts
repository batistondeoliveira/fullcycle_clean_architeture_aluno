import { Sequelize } from "sequelize-typescript"
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";

jest.useRealTimers();

describe("Test find product use case", () => {

  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory1",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a product A", async () => {

    const productRepository = new ProductRepository();
    const usecase = new FindProductUseCase(productRepository);

    const product = ProductFactory.create("a", "Product A", 100);        
    await productRepository.create(product)
    
    const input = {
      id: product.id,
    }

    const output = {
      id: expect.any(String),
      name: "Product A",
      price: 100,
    }

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });

  it("should find a product B", async () => {

    const productRepository = new ProductRepository();
    const usecase = new FindProductUseCase(productRepository);

    const product = ProductFactory.create("b", "Product B", 200);        
    await productRepository.create(product)
    
    const input = {
      id: product.id,
    }

    const output = {
      id: expect.any(String),
      name: "Product B",
      price: 400,
    }

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });
})