import './app-config'

import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import debugLib from 'debug'
import cors from 'cors'
import interceptor from 'express-interceptor'

import db from './models'

import {
  userHandler,
  electricMeterHandler,
  monthlyConsumptionHandler
} from './handler'

import authGuard from './lib/authGuard'
import {
  loginLib,
  monthlyConsumptionLib
} from './lib'

import {
  getHostname,
  getCommit,
  refreshToken
} from './utils'

const debug = debugLib('ems:server')

const app = express()

// middleware ==================================================================
app.use(cors())
app.use(bodyParser.json())
app.use(helmet())

// public routes ===============================================================
app.get('/api', (req, res) => {
  res.send('Welcome! You are now accessing the elmos api.')
})

// server information
app.get('/api/info', async (req, res) => {
  res.set('Content-Type', 'application/json')

  res.send({
    commit: commitHash,
    hostname,
    startTime
  })
})
app.post('/api/iot-status', monthlyConsumptionLib.getStatus)
app.post('/api/iot-update', monthlyConsumptionLib.update)
app.post('/api/login', loginLib.login)


// authentication middleware ===================================================
app.use(authGuard)

// inject new token if needed
app.use(interceptor(function(req, res) {
  const token = req.headers.authorization.split(' ')[1]
  return {
    isInterceptable: function(){
      return req.authorized && /application\/json/.test(res.get('Content-Type'))
    },
    intercept: async function(body, send) {
      const parsed = JSON.parse(body)
      if (typeof parsed === 'object') {
        parsed.token = await refreshToken(token)
      }
      send(JSON.stringify(parsed))
    }
  }
}))

// Guarded routes ==============================================================
app.use('/api/users', userHandler)
app.use('/api/electricMeters', electricMeterHandler)
app.use('/api/monthlyConsumptions', monthlyConsumptionHandler)


const port = process.env.PORT

let listener
let startTime
let hostname
let commitHash
export const startApp = (callback) => {
  db.connect(() => {
    listener = app.listen(port, process.env.HOST, async () => {
      if (callback) {
        callback(db)
      }
      startTime = new Date()
      hostname = await getHostname()
      commitHash = await getCommit()

      const address = listener.address().address
      debug(`Server listening on http://${address}:${port}/ (PID ${process.pid})`)
    })
  })
}

export const stopApp = (callback) => {
  return listener.close(callback)
}

export const getListener = () => {
  return listener
}

// start app if called directly
/* istanbul ignore if */
if (require.main === module) {
  startApp()
}

export default startApp
