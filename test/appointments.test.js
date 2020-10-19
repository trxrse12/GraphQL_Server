import {Appointments, buildTimeSlots, generateFakeAppointments} from '../src/appointments';

describe('buildTimeSlots', () => {
  it('returns (365+30) * 20 timeslots', () => {
    expect(buildTimeSlots().length).toEqual((365+30)*20);
  });

  it('daily time slots are half an hour apart', () => {
    const result = buildTimeSlots();
    const expected = result[0].startsAt + 30 * 60 * 1000;
    expect(result[1].startsAt).toEqual(expected);
  });

  it('moves forward one day after 10 hours', () => {
    const result = buildTimeSlots();
    const expected = result[0].startsAt + 24 * 60 * 60 * 1000;
    expect(result[20].startsAt).toEqual(expected);
  });

  it('sets a random stylist', () => {
    const stylists = ['Ashley', 'Jo', 'Pat', 'Sam'];
    expect(buildTimeSlots()[0].stylists).toEqual(stylists);
  });
});


describe('generateFakeAppointments', () => {
  const customers = Array(10).fill(1).map(() => ({id: 123}));
  const timeSlots = Array(10).fill(1).map(() => ({startsAt: 234, stylists: ['Ashley', 'Jo']}));

  it('generates more than half of all the timeslots available', () => {
    const result = generateFakeAppointments(customers, timeSlots);
    expect(result.length).toBeLessThan(timeSlots.length);
    expect(result.length).toBeGreaterThan(timeSlots.length/2);
  });

  it('sets a customer id', () => {
    const result = generateFakeAppointments(customers, timeSlots);
    expect(result[0].customer).toEqual(123);
  });

  it('sets a startsAt time', () => {
    const result = generateFakeAppointments(customers, timeSlots);
    expect(result[0].startsAt).toEqual(234);
  });

  it('sets the stylist', () => {
    const result = generateFakeAppointments(customers, timeSlots);
    expect(['Ashley', 'Jo'].includes(result[0].stylist)).toBeTruthy();
  });

  it('picks a random service', () => {
    const services = ['Cut', 'Blow-dry', 'Extensions', 'Cut & color', 'Beard trim', 'Cut & beard trim', 'Extensions'];
    const result = generateFakeAppointments(customers, timeSlots);
    expect(services.includes(result[0].service)).toBeTruthy();
  });
});

