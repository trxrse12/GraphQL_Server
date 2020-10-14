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
  });
});