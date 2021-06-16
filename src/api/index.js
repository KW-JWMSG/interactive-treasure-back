const router = require("express-promise-router")();

router.get('/', async (req, res, next) => {
    res.json({ name: "JAEWAN_INTERACTIVE", version: '0.0.1' })
})

router.use('/user', require('./user'))

router.use((req, res, next) => {
    if (req.user_info == null) {
        return res.json({ success: false, message: "로그인검증실패", login: false })
    }
    next()
})

router.use('/hide', require('./hide'))
router.use('/game', require('./game'))

module.exports = router