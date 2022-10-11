import { Sequelize } from "sequelize-typescript"
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateCustomerUseCase from "./update.product.usecase";

jest.useRealTimers();

describe("Test update product use case", () => {

  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory4",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should update a product A", async () => {

    const productRepository = new ProductRepository();
    const usecase = new UpdateCustomerUseCase(productRepository);

    const product = ProductFactory.create("a", "Product A", 100);        
    await productRepository.create(product);
    
    product.changeName("Product AA");
    product.changePrice(150);

    const output = {
      id: expect.any(String),
      name: "Product AA",
      price: 150,
    }

    const result = await usecase.execute(product);

    expect(result).toEqual(output);
  });

  it("should update a product B", async () => {

    const productRepository = new ProductRepository();
    const usecase = new UpdateCustomerUseCase(productRepository);

    const product = ProductFactory.create("b", "Product B", 200);        
    await productRepository.create(product);
    
    product.changeName("Product BB");
    product.changePrice(300);

    const output = {
      id: expect.any(String),
      name: "Product BB",
      price: 600,
    }

    const result = await usecase.execute(product);

    expect(result).toEqual(output);
  });
})