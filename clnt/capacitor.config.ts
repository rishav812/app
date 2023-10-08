import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.rishav.app',
  appName: 'test',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
