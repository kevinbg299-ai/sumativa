import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/theme';

type Props = {
  titulo: string;
  valor: string;
  descripcion: string;
};

export default function Tarjeta({
  titulo,
  valor,
  descripcion,
}: Props) {
  return (
    <View style={styles.tarjeta}>
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.valor}>{valor}</Text>
      <Text style={styles.descripcion}>{descripcion}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: Colors.card,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 14,
  },
  titulo: {
    color: Colors.muted,
    fontSize: 14,
  },
  valor: {
    color: Colors.text,
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  descripcion: {
    color: Colors.muted,
    fontSize: 12,
  },
});