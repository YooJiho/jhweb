import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyParser'
import cors from '@koa/cors'
import passport from 'koa-passport'
import session from 'koa-session'
import cookie from 'koa-cookie'
import morgan from 'koa-morgan'
import { sequelize } from './models'
import passportConfig from './passport'

import userRouter from './routes/user'

const app: Koa = new Koa()
const router: Router = new Router()
const port: number = 8081

passportConfig()
app.use(morgan('dev'))
app.use(bodyParser())
app.use(cookie())
app.use(session({
    renew: false,
}, app))
app.use(passport.initialize())
app.use(passport.session()) 
app.use(cors({
    origin: 'localhost:8080',
    credentials: true
}))

router.get('/', async (ctx) => {
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