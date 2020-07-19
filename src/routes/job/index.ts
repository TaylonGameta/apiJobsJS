import {Router, json} from 'express';
const router: Router = Router();
import {create, read} from '../../controllers/job';
import {auth} from '../../controllers/user';

/*
*** Product endpoints
*/

router.post('/create', auth, create);
router.post('/read', auth, read);

export = router;

