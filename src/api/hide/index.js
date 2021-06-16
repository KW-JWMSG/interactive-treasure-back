const router = require("express-promise-router")();
const TreasureMgmt = require("../../service/TreasureMgmt")
const treasuremgmt = new TreasureMgmt()

router.post('/', async (req, res, next) => {
    const { user_id } = req.user_info
    req.body.user_id = user_id
    const result = await treasuremgmt.createTreasure(req.body)
    res.json(result)
})

router.get('/list', async (req, res, next) => {
    const result = await treasuremgmt.listTreasure( req.user_info)
    res.json(result)
})

module.exports = router