import express from 'express'
import listAll from '../controllers/task/listAll.js'
import getById from '../controllers/task/getById.js'
import create from '../controllers/task/create.js'
import update from '../controllers/task/update.js'
// import remove from '../controllers/task/remove.js'
// import auth from '../middlewares/auth.js'

const router = express.Router()

router.get('/', listAll)
router.get('/:id', getById)
router.post('/', create)
router.put('/:id',  update)
// router.put('/:id', auth, update)
// router.delete('/:id', auth, remove)

export default router