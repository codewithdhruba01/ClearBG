import fs from 'fs';

export interface BackgroundRemovalProvider {
  removeBackground(imagePath: string): Promise<Buffer>;
}

// Ye aapka khud ka Mock API hai jab tak aap Python ya aur kisi native module ka use nahi karte.
// Note: Asli AI processing abhi Frontend (browser) mein locally chal rahi hai.
export class MockProvider implements BackgroundRemovalProvider {
  async removeBackground(imagePath: string): Promise<Buffer> {
    console.log(`Processing image locally on server: ${imagePath}`);
    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return fs.readFileSync(imagePath);
  }
}

export class BackgroundRemovalService {
  private provider: BackgroundRemovalProvider;

  constructor() {
    console.log('Using local background removal service');
    this.provider = new MockProvider();
  }

  async processImage(imagePath: string): Promise<Buffer> {
    return this.provider.removeBackground(imagePath);
  }
}

export const backgroundRemovalService = new BackgroundRemovalService();
