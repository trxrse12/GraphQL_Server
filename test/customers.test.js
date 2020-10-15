import {Customers} from '../src/customers';

describe('customers', () => {
  const customer = {
      firstName: 'Ashley',
      lastName: 'Jones',
      phoneNumber: '123456789'
    };

  describe('add', () => {
    it('returns the same field as provided', () => {
      const result = new Customers().add(customer);
      expect(result.firstName).toBe('Ashley');
      expect(result.lastName).toBe('Jones');
      expect(result.phoneNumber).toBe('123456789');
    });

    it('generates different ids to each customer', () => {
      const customers = new Customers();
      const first = customers.add(customer);
      const second = customers.add(customer);
      expect(first.id).not.toBe(second.id);
    });
  });

  describe('all', () => {
    const one = {firstName: 'Ashley'};
    const two = {firstName: 'Sam'};

    it('returns all added customers', () => {
      const customers = new Customers();
      const oneId = customers.add(one).id;
      const twoId = customers.add(two).id;

      const result = customers.all();

      expect(result[oneId].firstName).toEqual(one.firstName);
      expect(result[twoId].firstName).toEqual(two.firstName);
    });
  });

  describe('errors', () => {
    let customers;
    const customer = {
      firstName: 'test',
      lastName: 'test',
      phoneNumber: '23456'
    };
    beforeEach(() => {
      customers = new Customers();
      customers.add({phoneNumber: '12345'})
    });
    it('returns no errors for an object with the correct params', () => {
      expect(customers.errors(customer)).toEqual({});
    });
    it('returns error if the phone number is already used', () => {
      const newCustomer = {...customer, phoneNumber: '12345'};
      expect(customers.errors(newCustomer)).toEqual({
        phoneNumber: 'Phone number already exists in the system'
      });
    });
    it('returns error if the first name is blank', () => {
      const newCustomer = {firstName: ''};
      expect(customers.errors(newCustomer)).toEqual({
        firstName: 'First name is required'
      })
    });
  });
});