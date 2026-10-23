import { Request, Response } from 'express';
import { VENUES } from '../data/mockDb.js';
import { getDistanceInMeters } from '../utils/geo.js';

export const getNearbyVenues = (req: Request, res: Response) => {
  const userLat = parseFloat(req.query.lat as string) || 1.2136;
  const userLng = parseFloat(req.query.lng as string) || -77.2811; //Pasto, Nariño

  const venuesWithDistance = VENUES.map((venue) => {
    const distanceMeters = getDistanceInMeters(userLat, userLng, venue.lat, venue.lng);
    return {
      ...venue,
      distanceMeters,
      distanceText: distanceMeters > 1000 ? `${(distanceMeters / 1000).toFixed(1)}km` : `${distanceMeters}m`
    };
  });

  res.json({ success: true, data: venuesWithDistance });
};

export const spinRoulette = (req: Request, res: Response) => {
  const userLat = parseFloat(req.query.lat as string) || 1.2136;
  const userLng = parseFloat(req.query.lng as string) || -77.2811;

  const pool = VENUES.flatMap((venue) => (venue.isPromoted ? [venue, venue] : [venue]));
  const selected = pool[Math.floor(Math.random() * pool.length)];

  const distanceMeters = getDistanceInMeters(userLat, userLng, selected.lat, selected.lng);

  res.json({
    success: true,
    data: {
      ...selected,
      distanceMeters,
      distanceText: distanceMeters > 1000 ? `${(distanceMeters / 1000).toFixed(1)}km` : `${distanceMeters}m`
    }
  });
};