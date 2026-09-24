import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

export interface BackgroundRemovalProvider {
  removeBackground(imagePath: string): Promise<Buffer>;
}

export class RemoveBgProvider implements BackgroundRemovalProvider {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async removeBackground(imagePath: string): Promise<Buffer> {
    const formData = new FormData();
    formData.append('size', 'auto');
    formData.append('image_file', fs.createReadStream(imagePath), imagePath);

    try {
      const response = await axios({
        method: 'post',
        url: 'https://api.remove.bg/v1.0/removebg',
        data: formData,
        responseType: 'arraybuffer',
        headers: {
          ...formData.getHeaders(),
          'X-Api-Key': this.apiKey,
        },
      });

      return Buffer.from(response.data, 'binary');
    } catch (error: any) {
      console.error('RemoveBgProvider Error:', error.response?.data?.toString() || error.message);
      throw new Error('Failed to process image with background removal provider.');
    }
  }
}

export class MockProvider implements BackgroundRemovalProvider {
  async removeBackground(imagePath: string): Promise<Buffer> {
    console.log(`Mock processing image: ${imagePath}`);
    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // In a real mock, we might return a static transparent image
    // For this mock, we just return the original file to prevent errors
    // Alternatively, we can throw an error if this is truly a mock that we want to fail
    return fs.readFileSync(imagePath);
  }
}

export class BackgroundRemovalService {
  private provider: BackgroundRemovalProvider;

  constructor() {
    const apiKey = process.env.BACKGROUND_REMOVAL_API_KEY;
    if (apiKey) {
      console.log('Using RemoveBgProvider');
      this.provider = new RemoveBgProvider(apiKey);
    } else {
      console.warn('No BACKGROUND_REMOVAL_API_KEY found, using MockProvider');
      this.provider = new MockProvider();
    }
  }

  async processImage(imagePath: string): Promise<Buffer> {
    return this.provider.removeBackground(imagePath);
  }
}

export const backgroundRemovalService = new BackgroundRemovalService();
