const stylists = ['Ashley', 'Jo', 'Pat', 'Sam'];
const services = ['Cut', 'Blow-dry', 'Extensions', 'Cut & color', 'Beard trim', 'Cut & beard trim', 'Extensions'];

export const randomInt = range => Math.floor(Math.random() * range);

export function getRandomInt(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min +1)) + min;
}

export class Appointments {

}

export function buildTimeSlots() {
  const startDate = new Date();
  const lastYearToday = startDate.setFullYear(startDate.getFullYear()-1);
  const times = [...Array(365+30)].map(day => {
    const daysToAdd = day * 24 * 60 * 60 * 1000;
    return [...Array(20).keys()].map(halfHour => {
      const halfHourToAdd = halfHour * 30 * 60 * 1000;
      return {startsAt: lastYearToday + daysToAdd + halfHourToAdd, stylists};
    })
  })
  return [].concat(...times);
}

Array.prototype.pickRandom = function(){
  return this[randomInt(this.length)];
}

/*
  @function that generates an array of random appointments, of length more then the length of timeslots array:
     [
        { customer: 58, startsAt: 234, stylist: 'Jo', service: 'Beard trim' },
        { customer: 80, startsAt: 234, stylist: 'Ashley', service: 'Cut' },
        { customer: 37, startsAt: 234, stylist: 'Jo', service: 'Blow-dry' },
      ]
  @params:
    customers: an array of random customers
    [
        { id: 50 }, { id: 22 },
        { id: 50 }, { id: 94 },
        { id: 83 }, { id: 5 },
        { id: 56 }, { id: 85 },
        { id: 80 }, { id: 66 }
      ]

    timeslots: [
        { startsAt: 234, stylists: [ 'Ashley', 'Jo' ] },
        { startsAt: 234, stylists: [ 'Ashley', 'Jo' ] },
        { startsAt: 234, stylists: [ 'Ashley', 'Jo' ] },
    ]

    services: ['Cut', 'Blow-dry', 'Extensions', 'Cut & color', 'Beard trim', 'Cut & beard trim', 'Extensions'];
 */
export function generateFakeAppointments(customers, timeslots) {
  let appointments = [];
  appointments = [...Array(timeslots.length).keys()]
    .slice(0, getRandomInt((timeslots.length)/2+1, timeslots.length))
    .map((v,i) => ({
      customer: customers.pickRandom().id,
      startsAt: timeslots[i].startsAt,
      stylist: timeslots[0].stylists.pickRandom(),
      service: services.pickRandom(),
    }));
  return appointments;
}
