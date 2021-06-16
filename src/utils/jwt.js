const config = require("../config")
const jwt = require('jsonwebtoken')

const gen_token = async (iss, exp, subj, payload) => {
    var options = { expiresIn: exp, issuer: iss, subject: subj };
    const token = jwt.sign(payload, config.hashkey, options);
    return token;
}

const check_token = async (token) => {
    if (!token) return { success: false, message: "로그인하지 않았습니다.", data: { login: false } }
    try {
        const res = jwt.verify(token, config.hashkey)
        return { success: true, message: "성공적으로 데이터를 불러왔습니다.", data: { login: true, tokenData: res } }
    } catch (e) {
        if (e.name == 'TokenExpiredError') {
            return { success: false, message: "로그인이 만료되었습니다. 다시 로그인 해 주세요.", data: { login: false, relogin: true } }
        }
    }
}


module.exports = {
    gen_token: gen_token,
    check_token: check_token
}