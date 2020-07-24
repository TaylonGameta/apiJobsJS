import {Router, json} from 'express';
const router: Router = Router();
import {create, read, update} from '../../controllers/job';
import {auth} from '../../controllers/user';

/*
*** Job endpoints
*/

router.post('/create', auth, create);
router.post('/read', auth, read);
router.post('/update', auth, update);

export = router;

