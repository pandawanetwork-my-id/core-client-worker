'use strict'

const ProfileAddressController = ({models, mongooseCtx}) => {
    const { Profiles } = models
    const ObjectId = mongooseCtx.Types.ObjectId
    let controllers = {}
    let routes = []

    /**
     * All Addresses
     * @route /info/address/all 
     * @method GET
     */
     routes.push({
        method: 'GET',
        path: '/info/address/all',
        middlewares: [],
        controller: 'getProfileAddresses'
    })
    controllers.getProfileAddresses = async ({request, response, next}) => {
        try {
            const { profileId } = request.query
            const data = await Profiles.findOne({_id: ObjectId(profileId)})
            response.send(data)
        } catch (err) {
            next(err)
        }
    }
    return { controllers, routes }
}

module.exports = ProfileAddressController