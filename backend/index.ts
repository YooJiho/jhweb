import * as Koa from 'koa'
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyParser';
import { sequelize } from './models';

import User from './models/user'

const app: Koa = new Koa()
const router: Router = new Router()
const port: number = 8081

app.use(bodyParser())

router.get('/', async (ctx: Koa.Context) => {
    ctx.body = 'backend index page!'
})

router.post('/user', async (ctx: Koa.Context, next: () => Promise<any>) => {
    const { userId, password, nickname } = ctx.request.body

    try {    
        const newUser = await User.create({
            userId,
            password,
            nickname
        })

        ctx.status = 201
        ctx.body = newUser
    } catch (error) {
        console.error(error)
    }
})

app.use(router.routes())

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