const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const config = require('./config')
const path = require('path')
const cors = require('cors')
var sequelize = require('./models').sequelize;   // mysql 시퀄라이저 모델

const init = async server => {

    server.use(bodyParser.json()) // support json encoded bodies
    server.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies
    server.use(cookieParser())

    server.use(cors(
        { origin: ["http://192.168.0.140:8080", "http://172.10.0.1", "http://localhost:8080", "https://treasure.jwmsg.kr"], credentials: true }
    ))

    server.use(async (req, res, next) => {
        const UserMgmt = require('./service/UserMgmt')
        const authService = new UserMgmt()
        tokenChk = await authService.login_verify(req.cookies.JWMSG_LGN_TOKEN)
        if (tokenChk)
            if (tokenChk.success) {
                req.user_info = tokenChk.data.tokenData
                req.is_login = tokenChk.data.login
            }
        next()
    })

    await sequelize.sync()    //서버가 실행될때 시퀄라이저의 스키마를 DB에 적용시킨다.

    const api = require("./api")
    server.use(`${config.api.prefix}`, api)
    if (config.env !== 'development') server.use(Sentry.Handlers.errorHandler());

    server.get('/', (req, res) => {
        res.json({ name: "JAEWAN_INTERACTIVE", version: '0.0.1' })
    })

    server.use((err, req, res, next) => {
        if (config.env !== 'development')
            res
                .status(500)
                .json({
                    message:
                        "예상치 못한 오류가 발생했습니다. 확인 후 빠르게 해결하겠습니다! 🙇‍",
                })
                .end()

        next(err)
    })



    return server;
}

const server = express();
const app = init(server);

// if (config.env === 'development') {
server.listen(config.port, () => {
    console.log(`> Ready on http://localhost:${config.port}`)
})
// }

module.exports = app;