export class Customers {
  constructor(){
    this.nextId = 0;
    this.customers = {};
    // this.add = this.add.bind(this);
    // this.errors = this.errors.bind(this);
  }

  add(customer) {
    const customerWithId = Object.assign({}, customer, {id: this.nextId++});
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
}