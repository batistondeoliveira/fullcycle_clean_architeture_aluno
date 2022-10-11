import { Sequelize } from "sequelize-typescript"
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";

jest.useRealTimers();

describe("Test list product use case", () => {

  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory3",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should list products", async () => {

    const productRepository = new ProductRepository();
    const usecase = new ListProductUseCase(productRepository);

    const productA = ProductFactory.create("a", "Product A", 100);        
    await productRepository.create(productA)
    
    const productB = ProductFactory.create("b", "Product B", 200);        
    await productRepository.create(productB)    

    const output = {
      products: [
        {
          id: expect.any(String),
          name: "Product A",
          price: 100,
        },
        {
          id: expect.any(String),
          name: "Product B",
          price: 400,
        },
      ]
    }

    const result = await usecase.execute({});

    expect(result).toEqual(output);
  });  
})