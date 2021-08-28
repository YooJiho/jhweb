import passport from 'koa-passport'
import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from 'bcrypt'
import User from '../models/user'

const strategy = () => {
  passport.use(new LocalStrategy({
    usernameField: 'userId',
    passwordField: 'password'
  }, async (userId, password, done) => {
    try { 
      const exUser = await User.findOne({
        where: {
          userId
        }
      })
  
      if (!exUser) {
        return done(null, false, { message: '존재하지 않는 사용자입니다.' })
      }
  
      const result = await bcrypt.compare(password, exUser.password)
  
      if (result) {
        return done(null, exUser)
      } else {
        return done(null, false, { message: '비밀번호가 맞지 않습니다.' })
      }
      
    } catch(err) {
      console.error(err)
      return done(err)
    }
    
  }))
}

export default strategy