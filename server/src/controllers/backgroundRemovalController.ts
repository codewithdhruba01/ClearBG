import { Request, Response, NextFunction } from 'express';
import { backgroundRemovalService } from '../services/backgroundRemovalService';
import fs from 'fs';
import path from 'path';

export const removeBackground = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (!req.file) {
    res.status(400).json({ success: false, message: 'No image provided.' });
    return;
  }

  const tempFilePath = req.file.path;

  try {
    const processedImageBuffer = await backgroundRemovalService.processImage(tempFilePath);
    
    // Convert to base64 for easy consumption by the client
    const base64Image = processedImageBuffer.toString('base64');
    const dataUrl = `data:image/png;base64,${base64Image}`;

    res.status(200).json({
      success: true,
      image: dataUrl,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Unable to process this image.',
    });
  } finally {
    // Clean up temporary file
    if (fs.existsSync(tempFilePath)) {
      fs.unlink(tempFilePath, (err) => {
        if (err) console.error(`Failed to delete temp file: ${tempFilePath}`, err);
      });
    }
  }
};
