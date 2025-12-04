import * as functions from 'firebase-functions';
import { analyzeImageForGavin } from './vision';

export const checkIfGavin = functions.https.onCall(async (data, context) => {
  const { imageUrl } = data;
  if (!imageUrl) return { valid: false, reason: 'No image URL' };

  const isGavin = await analyzeImageForGavin(imageUrl);
  return {
    valid: isGavin,
    message: isGavin ? 'Gavin confirmed!' : 'Not Gavin or unclear'
  };
});
