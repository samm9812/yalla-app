import { Router } from 'express';
import { getNearbyVenues, spinRoulette } from '../controllers/venueController.js';
import { processCheckin } from '../controllers/checkinController.js';

const router = Router();

router.get('/venues/nearby', getNearbyVenues);
router.get('/roulette/spin', spinRoulette);
router.post('/checkin', processCheckin);

export default router;