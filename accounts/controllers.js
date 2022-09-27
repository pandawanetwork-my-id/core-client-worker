'use strict'

const MongodbLibrary = require('../../my-libraries/mongodb')
const mongodbDSN = process.env.MONGO_DSN
const models = require('./models')

const mdb = new MongodbLibrary({dsn: mongodbDSN, models})
const { UserAccounts } = mdb.start()

let controllers = {}
let routes = []

/**
 * List Account
 * @route / 
 * @method GET
 */
 routes.push({
    method: 'GET',
    path: '/',
    middlewares: [],
    controller: 'AccountList'
})
controllers.AccountList = async ({request, response, next}) => {
    try {
        const data = await UserAccounts.find({})
        response.send(data)
    } catch (err) {
        next(err)
    }
}
/**
 * Login Account
 * @method POST
 */
routes.push({
    method: 'POST',
    path: '/login',
    middlewares: [],
    controller: 'LoginAccount'
})
controllers.LoginAccount = async ({request, response, next}) => {
    try {
        const { username, password } = request.body
        const d = await UserAccounts.findOne({
            $or: [{email: username}, {username}],
            password
        })
        if (!d) throw new Error('Invalid Username or Password')
        response.send(d)
    } catch (err) {
        next(err)
    }
}
/**
 * Register Account
 * @method POST
 */
routes.push({
    method: 'POST',
    path: '/register',
    middlewares: [],
    controller: 'RegisterAccount'
})
controllers.RegisterAccount = async ({request, response, next}) => {
    try {
        const { username, email, password } = request.body
        const isExists = await UserAccounts.findOne({
            "$or": [{username}, {email}]
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
 * ForgotPassword Account
 * @method POST
 */
routes.push({
    method: 'POST',
    path: '/forgot-password',
    middlewares: [],
    controller: 'ForgotPasswordAccount'
})
controllers.ForgotPasswordAccount = async ({request, response, next}) => {
    try {
        const { email } = request.body
        const isExists = await UserAccounts.findOne({ email })
        if (!isExists) throw new Error('Email Not Found')
        response.send('Please Check Your Email')
    } catch (err) {
        next(err)
    }
}

module.exports = { routes, controllers }