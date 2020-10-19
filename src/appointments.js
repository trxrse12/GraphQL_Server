const stylists = ['Ashley', 'Jo', 'Pat', 'Sam'];

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

export function generateFakeAppointments() {
}
