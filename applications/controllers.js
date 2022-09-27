'use strict'

const MongodbLibrary = require('../../my-libraries/mongodb')
const mongodbDSN = process.env.MONGO_DSN
const models = require('./models')

const mdb = new MongodbLibrary({dsn: mongodbDSN, models})
const { Apps } = mdb.start()

let controllers = {}
let routes = []

/**
 * My List App
 * @route / 
 * @method GET
 */
 routes.push({
    method: 'GET',
    path: '/',
    middlewares: [],
    controller: 'MyAppList'
})
controllers.MyAppList = async ({request, response, next}) => {
    try {
        const data = await Apps.find({})
        response.send(data)
    } catch (err) {
        next(err)
    }
}
/**
 * Register App
 * @method POST
 */
routes.push({
    method: 'POST',
    path: '/register',
    middlewares: [],
    controller: 'RegisterApp'
})
controllers.RegisterApp = async ({request, response, next}) => {
    try {
        const { appName } = request.body
        const isExists = await Apps.findOne({
            "$or": [ { username }, { email } ]
        })
        if (isExists) {
            if (isExists.username === username) throw new Error('username already taken')
            else if (isExists.email === email) throw new Error('email already taken')
        }
        response.send({'success': true})
    } catch (err) {
        next(err)
    }
}
/**
 * ForgotPassword App
 * @method POST
 */
routes.push({
    method: 'POST',
    path: '/forgot-password',
    middlewares: [],
    controller: 'ForgotPasswordApp'
})
controllers.ForgotPasswordApp = async ({request, response, next}) => {
    try {
        const { email } = request.body
        const isExists = await Apps.findOne({ email })
        if (!isExists) throw new Error('Email Not Found')
        response.send('Please Check Your Email')
    } catch (err) {
        next(err)
    }
}

module.exports = { routes, controllers }