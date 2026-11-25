import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/theme';

type Props = {
  titulo: string;
  subtitulo: string;
};

export default function Header({ titulo, subtitulo }: Props) {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.logo}>A.I.D.A.</Text>
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.subtitulo}>{subtitulo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    marginBottom: 25,
  },
  logo: {
    color: Colors.primary,
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 3,
    marginBottom: 15,
  },
  titulo: {
    color: Colors.text,
    fontSize: 27,
    fontWeight: 'bold',
  },
  subtitulo: {
    color: Colors.muted,
    fontSize: 14,
    marginTop: 7,
  },
});