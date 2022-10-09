import { Sequelize } from "sequelize-typescript"
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import CustomerModel from "./customer.model";
import CustomerRepository from "./customer.repository";

describe("Customer repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true }
    });

    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "123" } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: "123",
      name: customer.name,
      active: customer.isActivate(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zipcode: address.zip,
      city: address.city
    })
  });

  it("should update a customer", async () => {

    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "123" } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: "123",
      name: customer.name,
      active: customer.isActivate(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zipcode: address.zip,
      city: address.city
    });

    customer.changeName("Customer 2");
    const addressChange = new Address("Street 2", 2, "Zipcode 2", "City 2");
    customer.changeAddress(addressChange);

    await customerRepository.update(customer);

    const customerModel2 = await CustomerModel.findOne({ where: { id: "123" } });

    expect(customerModel2.toJSON()).toStrictEqual({
      id: "123",
      name: customer.name,
      active: customer.isActivate(),
      rewardPoints: customer.rewardPoints,
      street: addressChange.street,
      number: addressChange.number,
      zipcode: addressChange.zip,
      city: addressChange.city
    });
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();    
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);

    await customerRepository.create(customer);
    
    const foundCustomer = await customerRepository.find(customer.id);

    expect(customer).toStrictEqual(foundCustomer);
  });

  it("should throw an error when customer is not found", async () => {
    const customerRepository = new CustomerRepository();    

    expect(async () => {      
      await customerRepository.find("1");
    }).rejects.toThrow("Customer not found");       
  });

  it("should find all customers", async () => {
    const customerRepository = new CustomerRepository();
    const customer1 = new Customer("123", "Customer 1");
    const address1 = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer1.changeAddress(address1);
    customer1.addRewardPoints(10);
    customer1.activate();
    
    const customer2 = new Customer("345", "Customer 2");
    const address2 = new Address("Street 2", 2, "Zipcode 2", "City 2");
    customer2.changeAddress(address2);
    customer2.addRewardPoints(20);

    await customerRepository.create(customer1);
    await customerRepository.create(customer2);    

    const foundCustomers = await customerRepository.findAll();
    const customers = [customer1, customer2];

    expect(foundCustomers).toHaveLength(2);
    expect(foundCustomers).toContainEqual(customer1);
    expect(foundCustomers).toContainEqual(customer2);
  });  
})