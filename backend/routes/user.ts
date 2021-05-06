import Koa from 'koa'
import Router from 'koa-router'
import bcrypt from 'bcrypt'
import User from '../models/user'

const userRouter: Router = new Router()

userRouter.post('/', async (ctx, next) => {
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
        console.log(error)
        return next()
    }
})

export default userRouter