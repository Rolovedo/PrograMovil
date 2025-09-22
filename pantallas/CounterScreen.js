import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

export default function CounterScreen() {
  const [count, setCount] = useState(0);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Contador: {count}</Text>
      <Button title="Sumar" onPress={() => setCount(count + 1)} />
      <Button title="Restar" onPress={() => setCount(count - 1)} />
        <Button title="Restaurar" onPress={() => setCount(0)} />
    </View>
  );
}