import {Router, Request, Response} from 'express';
const router: Router = Router();
import * as user from './user';
import * as job from './job';

/*
** routes/index
** all generic endpoints will be joined here
*/

router.use('/user', user);
router.use('/job', job);

export = router;