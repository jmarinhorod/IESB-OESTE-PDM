import { View, Text, StyleSheet } from 'react-native';

function TodasDespesas() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>TodasDespesas</Text>
    </View>
  );
}

export default TodasDespesas;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});
