import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload{
    id: string;
    iat: number;
    exp: number;
}

export default function authmiddleware(
    req : Request, res: Response, netx: NextFunction){
    
    const { authorization  }    = req.headers;

    if(!authorization){
        return res.json({
            'message':'Nao autorizado'
        });
    }

    const token = authorization.replace('Bearer','').trim();

    try{
        const data = jwt.verify(token,'secret');
        //console.log(data);
        const { id } = data as TokenPayload;

        req.userId = id;

        return netx();


    }catch{
        return res.json({ 'message':'Nao autorizado' });

    }

    



}