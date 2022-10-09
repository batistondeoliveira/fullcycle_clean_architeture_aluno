import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const productA = ProductFactory.create("a", "Product A", 100);

const inputProductA = {
  id: productA.id,
  name: "Product AA",
  price: 200,
};

const MockRepositoryProductA = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(productA)),
    update: jest.fn(),
  };
};

describe("Unit test for product A update use case", () => {
  it("should update a product", async () => {
    const productRepository = MockRepositoryProductA();
    const updateProductUseCase = new UpdateProductUseCase(productRepository);

    const output = await updateProductUseCase.execute(inputProductA);

    expect(output).toEqual(inputProductA);
  });
})

const productB = ProductFactory.create("b", "Product B", 200);

const inputProductB = {
  id: productB.id,
  name: "Product BB",
  price: 400,
};

const outputProductB = {
  id: productB.id,
  name: "Product BB",
  price: 800,
};

const MockRepositoryProductB = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(productB)),
    update: jest.fn(),
  };
};

describe("Unit test for product B update use case", () => {
  it("should update a product", async () => {
    const productRepository = MockRepositoryProductB();
    const updateProductUseCase = new UpdateProductUseCase(productRepository);

    const output = await updateProductUseCase.execute(inputProductB);
    inputProductB.price = inputProductB.price * 2
    expect(output).toEqual(outputProductB);
  });
})