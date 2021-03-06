import * as jwt from 'jsonwebtoken';

import { createParamDecorator } from '@nestjs/common';

import auth from '../config/auth';

export const User = createParamDecorator((data, req) => {

    // if route is protected, there is a user set in auth.middleware
    if (req.user) {
        return data ? req.user[data] : req.user;
    }

    // in case a route is not protected, we still want to get the optional auth user from jwt
    const token = req.headers.authorization ? (req.headers.authorization as string).split(' ') : undefined;
    if (token && token[1]) {
        const decoded: any = jwt.verify(token[1], auth.secret);
        return data ? decoded[data] : decoded.user;
    }

});
