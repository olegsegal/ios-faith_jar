import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '@/lib/constants';

export default function EmotionSelectionScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Faith Jar</Text>
      <Text style={styles.subtitle}>Project initialized. Screens coming in Epic 2.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  text: {
    fontSize: 24,
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.explanationText,
    marginTop: 8,
  },
});
