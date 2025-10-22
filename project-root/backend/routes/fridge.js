import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import Fridge from '../models/fridgeModel.js';

const router = express.Router();

// Add fridge entry
router.post('/add', protect, async (req, res) => {
  try {
    const fridge = await Fridge.create(req.body);
    res.status(201).json(fridge);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add fridge' });
  }
});

// Get all fridge entries
router.get('/all', async (req, res) => {
  try {
    const fridges = await Fridge.find();
    res.json(fridges);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch fridges' });
  }
});

export default router;