const stylists = ['Ashley', 'Jo', 'Pat', 'Sam'];
const services = ['Cut', 'Blow-dry', 'Extensions', 'Cut & color', 'Beard trim', 'Cut & beard trim', 'Extensions'];

function getRandomInt(min, max){
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

function pickRandom(myArray){
  return Array.isArray(myArray) ? myArray[Math.floor(Math.random() * myArray.length)] : undefined;
}

export function generateFakeAppointments(customers, timeslots) {
  console.log('CCCCCCCCCCCCCCCCCCCCCCC customers=', customers);
  console.log('DDDDDDDDDDDDDDDDDDDDDDD timeslots=', timeslots);
  const res = [...Array(timeslots.length).keys()]
    .slice(0, getRandomInt((timeslots.length)/2+1, timeslots.length))
    .map((v) => ({
      customer: customers[0].id,
      startsAt: timeslots[0].startsAt,
      stylist: pickRandom(timeslots[0].stylists),
      service: pickRandom(services),
    }));
  console.log('AAAAAAAAAAAAAAAAAAAAAAAA res=',res);
  return res;
}
