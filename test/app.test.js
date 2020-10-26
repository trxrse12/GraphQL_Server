import {buildApp} from '../src/app';
import request from 'supertest';
import {Customers} from '../src/customers';

let server;

describe('app', () => {
  let originalFunctions = {};

  function spyOn(object, method, spy){
    originalFunctions[object] = originalFunctions[object] || {};
    originalFunctions[object][method] = object[method];
    object[method] = spy;
  }

  function removeSpy(object, method){
    object[method] = originalFunctions[object][method]
  }

  function app() {
    return buildApp();
  };

  it('serves an index page', async () => {
    await request(app()).get('/').expect(200);
  });

  describe('POST customers', () => {
    let addSpy = jest.fn();
    let isValidSpy = jest.fn();
    beforeEach(() => {
      spyOn(Customers.prototype, 'add', addSpy);
      spyOn(Customers.prototype, 'isValid', isValidSpy);
      isValidSpy.mockReturnValue(true);
    });
    afterEach( () => {
      removeSpy(Customers.prototype,'add');
      removeSpy(Customers.prototype, 'isValid');
    });
    const customer = {
      firstName: 'Ashley',
      lastName: 'Jones',
      phoneNumber: '123456789',
    };

    it('saves a customer',async () => {
      await request(app()).post('/customers')
        .send(customer)
        .expect(201);
    });

    it('passes customer to the customer module', async () => {
      await request(app()).post('/customers')
        .send(customer);
      expect(addSpy).toHaveBeenCalledWith(customer);
    });

    it('returns the result of the add call', async () => {
      const result = {id: 123};
      addSpy.mockReturnValue(result);
      await request(app()).post('/customers')
        .send(customer)
        .then(response => {
          expect(response.body).toEqual(result);
        })
    });

    describe('invalid customer', () => {
      let error = {field: 'error'};
      let errorsSpy = jest.fn();
      beforeEach(() => {
        spyOn(Customers.prototype, 'errors', errorsSpy);
        isValidSpy.mockReturnValue(false);
        errorsSpy.mockReturnValue(error);
      });
      afterEach(() => {
        removeSpy(Customers.prototype, 'errors');
      })
      it('returns 422 for an invalid customer', async () => {
        await request(app()).post('/customers')
          .send(customer)
          .expect(422);
      });
      it('calls errors for an invalid customer',async () => {
        await request(app()).post('/customers')
          .send(customer)
        expect(errorsSpy).toHaveBeenCalledWith(customer);
      });
      it('returns errors',async () => {
        await request(app()).post('/customers')
          .send(customer)
          .then(response =>
            expect(response.body).toEqual({
              errors: {field: 'error'}
            })
          );
      });
    });
  });
});