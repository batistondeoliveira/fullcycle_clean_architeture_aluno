import { app, sequelize } from '../express';
import request from 'supertest';

describe("E2E test for product", () => {

  beforeEach(async () => {
    await sequelize.sync({ force: true })
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product A", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        type: "a",
        name: "Product A",
        price: 100,
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Product A");
    expect(response.body.price).toBe(100);    
  });

  it("should create a product B", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        type: "b",
        name: "Product B",
        price: 200,
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Product B");
    expect(response.body.price).toBe(400);    
  });

  it("should not create a product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        type: "c",
        name: "Error",
        price: 1,
      });

    expect(response.status).toBe(500);    
  });

  it("should list all products", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        type: "a",
        name: "Product A",
        price: 100,
      });
    expect(response.status).toBe(200);

    const response2 = await request(app)
      .post("/product")
      .send({
        type: "b",
        name: "Product B",
        price: 200,
      });
    expect(response2.status).toBe(200);

    const listResponse = await request(app).get("/product").send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);
    const product = listResponse.body.products[0];
    expect(product.name).toBe("Product A");
    expect(product.price).toBe(100);
    const product2 = listResponse.body.products[1];
    expect(product2.name).toBe("Product B");
    expect(product2.price).toBe(400);
  });

  it("should find a product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        type: "a",
        name: "Product A",
        price: 100,
      });
    expect(response.status).toBe(200);

    const response2 = await request(app)
      .post("/product")
      .send({
        type: "b",
        name: "Product B",
        price: 200,
      });
    expect(response2.status).toBe(200);

    const listResponse = await request(app).get("/product").send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);
    const product = listResponse.body.products[0];    
    const product2 = listResponse.body.products[1];    
    
    const productResponse = await request(app).get(`/product/${product.id}`).send();
    expect(productResponse.body.name).toBe("Product A");
    expect(productResponse.body.price).toBe(100);

    const productResponse2 = await request(app).get(`/product/${product2.id}`).send();
    expect(productResponse2.body.name).toBe("Product B");
    expect(productResponse2.body.price).toBe(400);
  });
});