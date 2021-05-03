import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as bodyParser from 'koa-bodyParser'
import * as cors from '@koa/cors'
import { sequelize } from './models'

import userRouter from './routes/user'

const app: Koa = new Koa()
const router: Router = new Router()
const port: number = 8081

app.use(bodyParser())
app.use(cors({
    origin: 'localhost:8080',
    credentials: true
}))

router.get('/', async (ctx: Koa.Context) => {
    ctx.body = 'backend index page!'
})

router.use('/user', userRouter.routes())
app.use(router.routes()).use(userRouter.allowedMethods())

app.on('error', console.error)

app.listen(port, async () => {
    console.log(`Koa server is listening on port ${port}`)

    await sequelize.sync({force: false})
    .then(async () => {
        console.log('db connect success!!')
    })
    .catch((e) => {
        console.log('error: ' + e)
    })
})

export default app