import { Strategy, ExtractJwt } from 'passport-jwt'
import UserModel from '../../models/user.model'

// export default const JwtStrategy = new Strategy({
//   jwtFromRequestL: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: `${process.env.JWT_SECRET}`
// }, function(){payload, done} => {})
