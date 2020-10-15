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
    if (Object.values(this.customers)
      .map(c => c.phoneNumber)
      .find(c => c===customer?.phoneNumber)
      ?.length>0){
      return {phoneNumber: 'Phone number already exists in the system'}
    }
    if (customer?.firstName.length ===0 || customer?.firstName.trim()===''){
        return {firstName: 'First name is required'}
      }
    return {}
  }
}