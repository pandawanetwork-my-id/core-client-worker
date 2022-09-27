'use strict'

const moment = require('moment')
const MongodbLibrary = require('../../my-libraries/mongodb')
const mongodbDSN = process.env.MONGO_DSN
const models = require('./models')

const mdb = new MongodbLibrary({dsn: mongodbDSN, models})
const mongooseCtx = mdb.getContext()
const { TaskQueue } = mdb.start()
const ObjectId = mongooseCtx.Types.ObjectId

let controllers = {}
let routes = []

/**
 * List Tasks
 * @route / 
 * @method GET
 */
 routes.push({
    method: 'GET',
    path: '/list',
    middlewares: [],
    controller: 'TasksList'
})
controllers.TasksList = async ({request, response, next}) => {
    try {
        const data = await TaskQueue.find({}).sort({priority: 1, createdAt: -1})
        response.send(data)
    } catch (err) {
        next(err)
    }
}
/**
 * Create Tasks
 * @method POST
 */
routes.push({
    method: 'POST',
    path: '/create',
    middlewares: [],
    controller: 'CreateTask'
})
controllers.CreateTask = async ({request, response, next}) => {
    try {
        const {
            type,
            priority,
            data={}, // bebas, sesuai kebutuhan
        } = request.body
        const d = await TaskQueue.create({
            createdAt: new Date(),
            createdBy: 'anonimouse', // menunggu header dari api-gateway
            updatedAt: null,
            updatedBy: null,
            exiresDate: moment().add(1, 'd').toDate(),
            status: 'pending',
            type,
            data,
            priority
        })
        response.send(d)
    } catch (err) {
        next(err)
    }
}
/**
 * Delete Tasks
 * @method GET
 */
routes.push({
    method: 'GET',
    path: '/delete',
    middlewares: [],
    controller: 'DeleteTask'
})
controllers.DeleteTask = async ({request, response, next}) => {
    try {
        const { taskId } = request.query
        if (!taskId) throw new Error('Invalid Task Id')
        const taskIds = taskId.split(',').filter(x => x.length > 1).map(x => ObjectId(x))
        await TaskQueue.deleteMany({ _id: { $in: taskIds } })
        response.send({'success': true})
    } catch (err) {
        next(err)
    }
}
/**
 * Update Tasks
 * @method POST
 */
routes.push({
    method: 'POST',
    path: '/update',
    middlewares: [],
    controller: 'UpdateTasks'
})
controllers.UpdateTasks = async ({request, response, next}) => {
    try {
        const { taskId, data } = request.body
        await TaskQueue.updateOne({_id: ObjectId(taskId)}, { $set: { data, updatedAt: new Date(), updatedBy: 'anonim' } })
        response.send({'success': true})
    } catch (err) {
        next(err)
    }
}

module.exports = { routes, controllers }