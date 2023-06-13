import {Router} from 'express';
import { authRequired } from '../middlewares/validateToken';
import { getGroups, createGroups, getGroup, deleteGroup } from '../controllers/groups.controller';

const router = Router();

router.get('/groups', authRequired, getGroups);
router.get('/groups/:id', authRequired, getGroup);
router.post('/groups', authRequired, createGroups);
router.delete('/groups/:id', authRequired, deleteGroup);

export default router;