const config = require("../config")
const models = require("../models")
const jwt = require("../utils/jwt")
var sha256 = require('js-sha256').sha256;

class UserMgmt {
    constructor() {
        return this
    }

    async createUser(params) {
        const { user_id, user_pw, user_name } = params;
        try {
            const findUser = await models.USER_LIST.findOne({
                where: {
                    user_id
                }
            })
            if (findUser != null) {
                return { success: false, error: "이미 존재하는 아이디 입니다.", message: "이미 존재하는 아이디 입니다." }
            }
            const hashPW = sha256.hmac(config.hashkey, user_pw);
            const crtUSer = await models.USER_LIST.create({
                user_id, user_pw: hashPW, user_name
            })
            return { success: true, message: "계정을 만들었습니다." }
        } catch (err) {
            return { success: false, error: JSON.stringify(err), message: "에러가 발생했습니다." }
        }
    }
    async login(params) {
        const { user_id, user_pw } = params;
        try {
            const hashPW = sha256.hmac(config.hashkey, user_pw);
            const findUser = await models.USER_LIST.findOne({
                where: {
                    user_id, user_pw: hashPW
                }
            })

            if (findUser == null) {
                return { success: false, message: "존재하지 않는 계정입니다." }
            }
            const login_token = await this.gen_jwt(findUser)
            return { success: true, message: "로그인 되었습니다.", token: login_token }
        } catch (err) {
            return { success: false, error: JSON.stringify(err), message: "에러가 발생했습니다." }
        }
    }
    async gen_jwt(user_info) {
        const { user_id, user_name } = user_info;
        const token_payload = {
            user_id, user_name
        }
        const token = await jwt.gen_token('jaewan_login_token', '30d', 'user_info', token_payload)
        return token
    }
    async login_verify(login_token) {
        return await jwt.check_token(login_token)
    }
}

module.exports = UserMgmt