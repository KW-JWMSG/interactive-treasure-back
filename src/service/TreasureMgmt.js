const config = require("../config")
const models = require("../models")

class TreasureMgmt {
    constructor() {
        return this
    }

    async createTreasure(params) {
        const {latitude, longitude, user_id} = params
        try {
            const user_info = await models.USER_LIST.findOne({
                where: {
                    user_id
                }
            })
            if (user_info == null) {
                throw "사용자가 존재하지 않음"
            }
            const result = await models.TREASURES_LIST.create({ 
                latitude, longitude, user_id
            })
            return { success: true, message: "보물을 등록했습니다." }
        } catch (err) {
            console.error(err)
            return { success: false, error: JSON.stringify(err) }
        }

    }

    async listTreasure(params) {
        const {user_id} = params
        const result = await models.TREASURES_LIST.findAll({
            where:{
                user_id:{
                    [models.Op.not]:user_id
                }
                
            }
        });
        return { success: true, data: result }
    }
}

module.exports = TreasureMgmt