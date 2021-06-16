const config = require("../config")
const models = require("../models")

class GameMgmt {
    constructor() {
        return this
    }

    async createGame(params) {
        const { user_id, treasure_id } = params
        try {
            const lastSameGame = await models.GAME_LIST.findOne({
                where: {
                    user_id, treasure_id
                }
            })
            if (lastSameGame != null) {
                throw "이미 진행한 보물 입니다."
            }
            const newGame = await models.GAME_LIST.create({
                user_id, treasure_id, is_success: 0
            })
            return { success: true, message: "게임을 시작합니다.", data: newGame }
        } catch (err) {
            return { success: false, error: JSON.stringify(err) }
        }

    }

    async currentGame(params) {
        const { user_id } = params
        try {
            const nowgame = await models.GAME_LIST.findOne({
                where: {
                    user_id,
                    is_success: 0
                },
                include:{
                    model:models.TREASURES_LIST
                }
            })
            if (nowgame == null) {
                throw "아직 게임을 실행하지 않았습니다."
            }
            return { success: true, data: nowgame };
        } catch (err) {
            return { success: false, error: JSON.stringify(err) }
        }
    }

    async successGame(params) {
        const { game_id } = params
        try {
            const nowgame = await models.GAME_LIST.update({
                is_success: 1
            }, {
                where: {
                    game_id,
                }
            })
            return { success: true, data: nowgame };
        } catch (err) {
            return { success: false, error: JSON.stringify(err) }
        }
    }

    async failGame(params) {
        const { game_id } = params
        try {
            const nowgame = await models.GAME_LIST.update({
                is_success: 2
            }, {
                where: {
                    game_id,
                }
            })
            return { success: true, data: nowgame };
        } catch (err) {
            return { success: false, error: JSON.stringify(err) }
        }
    }

    async getRank() {
        try {
            const ranks = await models.sequelize.query(`SELECT UL.user_name user_name,  count(*) FROM USER_LIST UL, GAME_LIST GL WHERE UL.user_id = GL.user_id AND GL.is_success = 1 GROUP BY  UL.user_name`, { type: models.sequelize.QueryTypes.SELECT });
            return { success: true, data: ranks };
        } catch (err) {
            console.log(err)
            return { success: false, error: JSON.stringify(err) }
        }
    }


}

module.exports = GameMgmt