import {Request, Response, NextFunction, json} from 'express';
import {getRepository, getManager} from 'typeorm';
import {User} from '../../entity/User';
import * as jwt from 'jsonwebtoken';

//interfaces
import {TokenInterface, UserInterface} from '../../interfaces/user';


/*
*** User Controller
*/


export const register = async (req: Request, res: Response) =>{
    
    const {username, email, password} : UserInterface = req.body;
    const  userRepository = getManager().getRepository(User);
    const user = new User();
    
    user.email = email;
    user.password = password;
    user.username = username;

    await userRepository.save(user);

    res.json({msg: "user created"});
   
}

export const login = async (req: Request, res: Response) =>{
    const {email, password} : UserInterface = req.body;
    const userRepository = getManager().getRepository(User);

    try{
        const result = await userRepository.findOneOrFail({where: {email, password}});
        const token = jwt.sign({id: result.id}, process.env.secretkey);
        res.json({token});
    }catch(error){
        res.status(401).send();
    }
    
}

export const auth = async (req: Request,res: Response, next: NextFunction)=>{
    const {authorization} = req.headers;
    const [bearer, token] = authorization.split(' ');

    try{
        const decoded = jwt.verify(token, process.env.secretkey);
        req.body.id = (decoded as TokenInterface).id;
        next();
    }catch(error){
        res.status(401).send();
    }

}