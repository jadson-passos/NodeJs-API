import { Request, Response} from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


import User from '../models/User';

class AuthController {
   async  authenticate(req: Request, res: Response){     
        const repository = getRepository(User);
        const { email, password }  = req.body;

        const user = await repository.findOne({ where: { email } });

        if(!user){
            return res.json({
                "message":"Usuario não encontrado"
            })
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword){
            return res.json({
                "message": "A senha nao confere"
            })
        }

        const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1d'});

        delete user.password;

        return res.json({
            user,
            token,
        });
       
   }
}

export default new AuthController();