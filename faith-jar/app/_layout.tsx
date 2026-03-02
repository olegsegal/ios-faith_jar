import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SuperwallProvider } from 'expo-superwall';
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <SuperwallProvider
      apiKeys={{ ios: 'YOUR_SUPERWALL_IOS_API_KEY' }}
      onConfigurationError={(error) => {
        console.error('Superwall configuration failed:', error.message);
      }}
    >
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="dark" />
    </SuperwallProvider>
  );
}
