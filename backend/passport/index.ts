import passport from 'koa-passport'

const passportConfig = () => {
  passport.serializeUser(() => {
    
  })
  
  passport.deserializeUser(() => {
  
  })
}
export default passportConfig