
import express from 'express'
import { config } from './config'
import initDb from './config/db'
import { userRouter } from './modules/users/users.route'
import { vehiclesRouter } from './modules/vehicles/vehicles.route'
import { bookingRouter } from './modules/bookings/booking.route'
import {  authRouter } from './modules/auth/auth.route'

const app = express()
const port = config.port

initDb()
app.use(express.json())

app.use('/api/v1/users',userRouter)
app.use('/api/v1/vehicles',vehiclesRouter)
app.use('/api/v1/bookings',bookingRouter)
app.use('/api/v1/auth',authRouter)



app.get('/', (req, res) => {
  res.send('Hello masum!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
