'use strict'

const ProfileController = ({models, mongooseCtx}) => {
    const { Profiles } = models
    const ObjectId = mongooseCtx.Types.ObjectId
    let controllers = {}
    let routes = []

    /* ******** ALL INFORMATION ****************************************************** */
    /**
     * All Information Of Profile
     * @route /info/all 
     * @method GET
     */
     routes.push({
        method: 'GET',
        path: '/info/all',
        middlewares: [],
        controller: 'getProfileAllInformation'
    })
    controllers.getProfileAllInformation = async ({request, response, next}) => {
        try {
            const { profileId } = request.query
            const data = await Profiles.findOne({_id: ObjectId(profileId)})
            response.send(data)
        } catch (err) {
            next(err)
        }
    }

    /* ******** BASIC INFORMATION **************************************************** */
    /**
     * Basic Information Of Profile
     * @route /info/basic 
     * @method GET
     */
    routes.push({
        method: 'GET',
        path: '/info/basic',
        middlewares: [],
        controller: 'getProfileBasicInformation'
    })
    controllers.getProfileBasicInformation = async ({request, response, next}) => {
        try {
            const { profileId } = request.query
            const data = await Profiles.findOne({_id: ObjectId(profileId)}, {data: 1})
            response.send(data)
        } catch (err) {
            next(err)
        }
    }
    /**
     * Insert New / Update Profile
     * @route /info/basic/update 
     * @method POST
     */
    routes.push({
        method: 'POST',
        path: '/info/basic/update',
        middlewares: [],
        controller: 'UpdateProfileBasicInformation'
    })
    controllers.UpdateProfileBasicInformation = async ({request, response, next}) => {
        try {
            const { accountId, status, data } = request.body
            let update = {
                updatedAt: new Date(),
                updatedBy: 'anonim'
            }
            if (status) update.status = status
            if (data) update.data = data
            await Profiles.updateOne({ accountId }, { $set: update }, {upsert: true})
            response.send({'success': true})
        } catch (err) {
            next(err)
        }
    }

    return {routes, controllers}
}

module.exports = ProfileController