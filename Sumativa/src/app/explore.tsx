import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import Header from '../components/header';
import { useAida } from '../components/aida-context';
import { Colors } from '../constants/theme';

export default function Control() {
  const {
    vigilancia,
    sensorDisponible,
    movimiento,
    estadoMovimiento,
    aceleracion,
  } = useAida();

  return (
    <ScrollView style={styles.fondo} contentContainerStyle={styles.contenido}>
      <Header
        titulo="Centro de control"
        subtitulo="Lecturas del sensor de movimiento"
      />

      <View style={styles.tarjeta}>
        <Text style={styles.titulo}>Estado del sensor</Text>

        <Text style={styles.estado}>
          {sensorDisponible ? 'CONECTADO' : 'NO DISPONIBLE'}
        </Text>

        <Text style={styles.descripcion}>
          {vigilancia
            ? estadoMovimiento
            : 'Activa la vigilancia para comenzar a leer el sensor.'}
        </Text>
      </View>

      <Text style={styles.subtitulo}>Datos del acelerómetro</Text>

      <View style={styles.eje}>
        <Text style={styles.nombreEje}>Eje X</Text>
        <Text style={styles.valor}>{aceleracion.x}</Text>
      </View>

      <View style={styles.eje}>
        <Text style={styles.nombreEje}>Eje Y</Text>
        <Text style={styles.valor}>{aceleracion.y}</Text>
      </View>

      <View style={styles.eje}>
        <Text style={styles.nombreEje}>Eje Z</Text>
        <Text style={styles.valor}>{aceleracion.z}</Text>
      </View>

      <View style={styles.tarjeta}>
        <Text style={styles.titulo}>Detección actual</Text>
        <Text
          style={[
            styles.estado,
            { color: movimiento ? Colors.success : Colors.muted },
          ]}
        >
          {movimiento ? 'MOVIMIENTO DETECTADO' : 'SIN MOVIMIENTO'}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contenido: {
    padding: 22,
    paddingTop: 55,
  },
  tarjeta: {
    backgroundColor: Colors.card,
    padding: 22,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 18,
  },
  titulo: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  estado: {
    color: Colors.primary,
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 14,
  },
  descripcion: {
    color: Colors.muted,
    lineHeight: 21,
  },
  subtitulo: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 14,
  },
  eje: {
    backgroundColor: Colors.card,
    padding: 18,
    borderRadius: 13,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nombreEje: {
    color: Colors.muted,
    fontSize: 15,
  },
  valor: {
    color: Colors.primary,
    fontSize: 17,
    fontWeight: 'bold',
  },
});