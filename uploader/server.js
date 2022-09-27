'use strict'

require('dotenv').config({})
const port = process.env.PORT
const host = process.env.HOST || '127.0.0.1'
// const Server = require('rohmanwebid-core-server')
const Server = require('../../core-server')
const { routes, controllers } = require('./controllers')
const multer = require('multer')

new Server({routes, controllers, middlewares: {multer}})
    .start({port, host}, (msg) => {
        console.log(msg)
    })