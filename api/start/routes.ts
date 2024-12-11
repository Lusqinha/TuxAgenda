import AppointmentReservedsController from '#controllers/appointment_reserveds_controller'
import AppointmentsController from '#controllers/appointments_controller'
import ColaboratorsController from '#controllers/colaborators_controller'
import ServicesController from '#controllers/services_controller'
import router from '@adonisjs/core/services/router'

router.group(() => {
  
  router.resource('appointment_reserveds', AppointmentReservedsController).apiOnly()

  router.resource('appointments', AppointmentsController).apiOnly()

  router.resource('colaborators', ColaboratorsController).apiOnly()

  router.resource('services', ServicesController).apiOnly()

}).prefix('/api/v1')


