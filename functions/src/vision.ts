import { ImageAnnotatorClient } from '@google-cloud/vision';

const client = new ImageAnnotatorClient();

export const analyzeImageForGavin = async (imageUrl: string): Promise<boolean> => {
  try {
    const [faceResult] = await client.faceDetection(imageUrl);
    const faces = faceResult.faceAnnotations || [];
    if (faces.length === 0) return false;

    const [webResult] = await client.webDetection(imageUrl);
    const entries = webResult.webDetection?.webEntities || [];

    return entries.some((entity: any) =>
      entity.description?.toLowerCase().includes('gavin newsom') ||
      entity.description?.toLowerCase().includes('governor newsom') ||
      entity.description?.toLowerCase().includes('california governor')
    );
  } catch (error) {
    console.error('Vision AI error:', error);
    return false;
  }
};

export const isGavinInPhoto = async (imageUrl: string): Promise<'yes' | 'maybe' | 'no'> => {
  try {
    const [faceResult] = await client.faceDetection(imageUrl);
    const hasFace = (faceResult.faceAnnotations || []).length > 0;

    const [webResult] = await client.webDetection(imageUrl);
    const entries = webResult.webDetection?.webEntities || [];

    let score = 0;
    for (const e of entries) {
      const desc = (e.description || '').toLowerCase();
      if (desc.includes('gavin newsom')) score += 10;
      else if (desc.includes('newsom')) score += 5;
      else if (desc.includes('california governor')) score += 3;
    }

    if (score >= 10 && hasFace) return 'yes';
    if (score >= 5) return 'maybe';
    return 'no';
  } catch (error) {
    console.error('Scoring error:', error);
    return 'no';
  }
};
