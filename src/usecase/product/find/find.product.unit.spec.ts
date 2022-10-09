import ProductFactory from "../../../domain/product/factory/product.factory";
import FindProductUseCase from "./find.product.usecase";

const productA = ProductFactory.create("a", "Product A", 100);

const MockRepositoryProductA = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(productA)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe("Unit Test find product A use case", () => {  

  it("should find a product", async () => {

    const productRepository = MockRepositoryProductA();
    const usecase = new FindProductUseCase(productRepository);    
    
    const input = {
      id: "123",
    }

    const output = {
      id: expect.any(String),
      name: "Product A",
      price: 100,
    }

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });

  it("should not find a Product", () => {
    const productRepository = MockRepositoryProductA();
    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found")
    })
    const usecase = new FindProductUseCase(productRepository);    
    
    const input = {
      id: "123",
    };

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Product not found");
  });
});

const productB = ProductFactory.create("b", "Product B", 200);

const MockRepositoryProductB = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(productB)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe("Unit Test find product B use case", () => {  

  it("should find a product", async () => {

    const productRepository = MockRepositoryProductB();
    const usecase = new FindProductUseCase(productRepository);    
    
    const input = {
      id: "123",
    }

    const output = {
      id: expect.any(String),
      name: "Product B",
      price: 400,
    }

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });

  it("should not find a Product", () => {
    const productRepository = MockRepositoryProductB();
    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found")
    })
    const usecase = new FindProductUseCase(productRepository);    
    
    const input = {
      id: "123",
    };

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Product not found");
  });
})