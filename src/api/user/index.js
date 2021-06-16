const router = require("express-promise-router")();
const UserMgmt = require("../../service/UserMgmt")
const usermgmt = new UserMgmt()
router.get('/', async (req, res, next) => {
    if (req.user_info == null) {
        return res.json({ success: false, message: "로그인검증실패" })
    }
    res.json({ success: true, message: "로그인검증 완료", user: req.user_info })
})
router.get('/logout', async (req, res, next) => {
    res.cookie('JWMSG_LGN_TOKEN', null, { maxAge: 0 })
    res.json({ success: true, message: "로그아웃 완료", user: req.user_info })
})
router.post('/join', async (req, res, next) => {
    const result = await usermgmt.createUser(req.body);
    res.json(result)
})
router.post('/login', async (req, res, next) => {
    const result = await usermgmt.login(req.body);
    if (result.success) {
        res.cookie('JWMSG_LGN_TOKEN', result.token, { maxAge: (1000 * 60 * 60 * 24) * 1 })
    }
    res.json(result)
})



module.exports = router