import {Router, json} from 'express'
const router: Router = Router();
import {login, register, auth} from '../../controllers/user';

/*
*** User endpoints
*/

router.post('/login', login);
router.post('/register', register);

router.get('/capeta', auth, (req, res)=>{
    res.json({foi: req.body.id})
});

export = router;

