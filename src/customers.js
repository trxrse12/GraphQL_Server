export class Customers {
  constructor(){
    this.nextId = 0;
    this.customers = {};
    // this.add = this.add.bind(this);
  }

  add(customer) {
    const customerWithId = Object.assign({}, customer, {id: this.nextId++});
    this.customers[customerWithId.id] = customerWithId;
    return customerWithId;
  }

  all() {
    return Object.assign({}, this.customers);
  }
}