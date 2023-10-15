import { Router } from 'express';
import { deleteEncuesta, getEncuesta, getEncuestas, postEncuesta, updateEncuesta } from '../controllers/encuesta';

const router = Router();

router.get('/', getEncuestas);
router.get('/:id', getEncuesta);
router.delete('/:id', deleteEncuesta);
router.post('/', postEncuesta);
router.put('/:id', updateEncuesta);

export default router;