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

