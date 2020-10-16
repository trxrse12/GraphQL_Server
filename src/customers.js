import * as faker from 'faker';
faker.locale = 'de';

Array.prototype.flatMap = function (f) {
  if (!f) return [];
  return Array.prototype.concat.apply([], this.map(f));
};

Array.prototype.unique = function() {
  return this.filter(function (value, index, self) {
    return self.indexOf(value) === index;
  });
};

export const generateFakeCustomer = (id) => ({
    id,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    phoneNumber: faker.phone.phoneNumber(),
  }
);

export const generateFakeCustomers = () => {
  const customers = [];
  for (let i=0; i<1500; i++){
    customers.push(generateFakeCustomer(i));
  }
  return customers;
};

export class Customers {
  constructor(initialCustomers = []){
    this.nextId = 0;
    this.customers = {};
    this.add = this.add.bind(this);
    initialCustomers.forEach(this.add);
    // this.errors = this.errors.bind(this);
  }

  add(customer) {
    const calculatedId = this.nextId++;
    const customerWithId = Object.assign({}, customer, {id: calculatedId});
    this.customers[customerWithId.id] = customerWithId;
    return customerWithId;
  }

  all() {
    return Object.assign({}, this.customers);
  }

  errors(customer) {
    let errors = {};
    errors = Object.assign(errors, this.requiredValidation(customer, 'firstName', 'First name is required'));
    errors = Object.assign(errors, this.requiredValidation(customer, 'lastName', 'Last name is required'));
    errors = Object.assign(errors, this.requiredValidation(customer, 'phoneNumber', 'Phone number is required'));
    errors = Object.assign(errors, this.uniqueValidation('phoneNumber', customer.phoneNumber, 'Phone number'));
    return errors;
  }

  requiredValidation(customer, field, fieldDescription){
    if ((!customer[field]) || (customer?.[field]?.length === 0) || (customer?.[field]?.trim()==='')){
      return {[field]: `${fieldDescription}`};
    }
    return {};
  }

  uniqueValidation(field, fieldValue, fieldDescription){
    if (Object.entries(this.customers).map(([_,c]) => c[field]).includes(fieldValue)){
      return {[field]: fieldDescription + ' already exists in the system'}
    }
    return {};
  }

  isValid(customer) {
    return Object.keys(this.errors(customer)).length === 0;
  }

  /*
    returns ['1','3'] ==> the indexes of the elements having a prop containing the term
   */
  searchForTerm(term) {
    if (!term) return [];
    const startsWith = new RegExp(`^${term}`, 'i');
    // console.log('KKKKKKKKKKKKKKKKKKKKKK term=',term )
    // console.log('KKKKKKKKKKKKKKKKKKKKKK startsWith=',startsWith )
    // console.log('KKKKKKKKKKKKKKKKKKKKKK this.customers=',this.customers )
    return Object.keys(this.customers).filter(customerId => {
      const customer = this.customers[customerId];
      return startsWith.test(customer.firstName)
        || startsWith.test(customer.lastName)
        || startsWith.test(customer.phoneNumber)
    })
  }

  search({searchTerms, orderBy, orderDirection}) {
    searchTerms = searchTerms || [''];
    const sorted = searchTerms
      .flatMap(term => this.searchForTerm(term)) // brings bag the customer indexes having
                                                  // at least a field in the corresp. customer
                                                  // equal to search value
      .unique()
      .map(id => this.customers[id])
      // .sort((l,r) => orderDirection === 'desc'
      //   ? r[orderBy].localeCompare()
      // )
    console.log('WWWWWWWWWWWWWWWWWWWWWWWWW sorted=', sorted)
    return sorted;
  }
}