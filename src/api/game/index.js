const router = require("express-promise-router")();
const GameMgmt = require("../../service/GameMgmt")
const gamemgmt = new GameMgmt();

router.get('/', async (req, res, next) => {
    const { user_id } = req.user_info
    const result = await gamemgmt.currentGame({ user_id })
    res.json(result)
})

router.post('/', async (req, res, next) => {
    const { user_id } = req.user_info
    req.body.user_id = user_id
    const result = await gamemgmt.createGame(req.body)
    res.json(result)
})

router.get('/success/:game_id', async (req, res, next) => {
    const result = await gamemgmt.successGame(req.params)
    res.json(result)
})

router.get('/fail/:game_id', async (req, res, next) => {
    const result = await gamemgmt.failGame(req.params)
    res.json(result)
})

router.get('/rank', async (req, res, next) => {
    const result = await gamemgmt.getRank()
    res.json(result)
})

module.exports = router