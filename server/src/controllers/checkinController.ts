import { Request, Response } from 'express';
import { VENUES, USER_POINTS } from '../data/mockDb.js';
import { getDistanceInMeters } from '../utils/geo.js';

export const processCheckin = (req: Request, res: Response) => {
  const { venueId, userLat, userLng } = req.body;

  const venue = VENUES.find((v) => v.id === venueId);

  if (!venue) {
    return res.status(404).json({ success: false, message: 'Establecimiento no encontrado' });
  }

  const distanceMeters = getDistanceInMeters(userLat, userLng, venue.lat, venue.lng);
  const MAX_CHECKIN_DISTANCE = 100;

  if (distanceMeters <= MAX_CHECKIN_DISTANCE) {
    USER_POINTS.points += 50;
    return res.json({
      success: true,
      message: `¡Check-in verificado en ${venue.name}!`,
      pointsEarned: 50,
      totalPoints: USER_POINTS.points,
      distanceMeters
    });
  } else {
    return res.status(400).json({
      success: false,
      message: `Estás demasiado lejos de ${venue.name}. Debes estar a menos de ${MAX_CHECKIN_DISTANCE}m.`,
      distanceMeters
    });
  }
};