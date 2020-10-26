import express from 'express';
import morgan from 'morgan';
import {Customers} from './customers';
import {Appointments} from './appointments';

export function buildApp(customerData, appointmentData, timeSlots) {
  const app = express();
  app.use(express.json()); // without this one, I cannot read JSON in my routes
  const customers = new Customers(customerData);
  const appointments = new Appointments([],timeSlots);

  app.use(morgan('dev'));
  app.get ('/', (req, res) => {
    res.status(200)
    return res.send('OK')
  });

  app.post('/customers', (req,res, next) => {
    const customer = req.body;
    if (customers.isValid(customer)){
      const customerWithId = customers.add(customer);
      return res.status(201).json(customerWithId);
    } else {
      const errors = customers.errors(customer);
      return res.status(422).json({errors});
    }
  })

  app.get('/availableTimeSlots', (req, res, next) => {
    return res.json(appointments.getTimeSlots());
  })

  app.post('/appointments', (req, res, next) => {
    const appointment = req.body;
    if (appointments.isValid(appointment)){
      appointments.add(appointment);
      return res.sendStatus(201);
    }
    return res.sendStatus(500);
  })
  return app;
}
