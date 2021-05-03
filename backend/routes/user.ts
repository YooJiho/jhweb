import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as bcrypt from 'bcrypt'
import User from '../models/user'

const userRouter: Router = new Router()

userRouter.post('/', async (ctx: Koa.Context, next: () => Promise<any>) => {
    const { userId, password, nickname } = ctx.request.body
    const hash = await bcrypt.hash(password, 12)
    try {    
        const newUser = await User.create({
            userId,
            password: hash,
            nickname
        })

        ctx.status = 201
        ctx.body = newUser
    } catch (error) {
        console.error(error)
    }
})

export default userRouter