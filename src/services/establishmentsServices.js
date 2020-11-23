import Api from './api'

const establishmentsServices = {
  index: (latitude, longitude) => Api.get(`/google_barbershops?latitude=${latitude}&longitude=${longitude}`),
  show: (place_id) => Api.get(`/google_barbershops/${place_id}`)
}

export default establishmentsServices
