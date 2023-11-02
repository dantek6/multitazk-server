import {Router} from 'express';
import { authRequired } from '../middlewares/validateToken';
import { getTasks, createTasks, getTask, updateTask, deleteTask } from '../controllers/tasks.controllers';
// import { updateGroup } from '../controllers/groups.controller';

const router = Router();

router.get('/tasks', authRequired, getTasks);
router.get('/tasks/:id', authRequired, getTask);
router.post('/groups/:groupId/tasks', authRequired, createTasks);
router.delete('/groups/:groupId/tasks/:taskId', authRequired, deleteTask);
router.put('/groups/:groupId/tasks/:taskId', authRequired, updateTask);

export default router;