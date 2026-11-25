import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Header from '../components/header';
import Tarjeta from '../components/tarjeta';
import { useAida } from '../components/aida-context';
import { Colors } from '../constants/theme';

export default function Inicio() {
  const {
    vigilancia,
    alertas,
    movimiento,
    estadoMovimiento,
    cambiarVigilancia,
  } = useAida();

  return (
    <ScrollView style={styles.fondo} contentContainerStyle={styles.contenido}>
      <Header
        titulo="Panel principal"
        subtitulo="Sistema inteligente A.I.D.A."
      />

      <View style={styles.estado}>
        <View
          style={[
            styles.indicador,
            { backgroundColor: vigilancia ? Colors.success : Colors.danger },
          ]}
        />

        <View>
          <Text style={styles.estadoTitulo}>
            {vigilancia ? 'Sistema activo' : 'Sistema inactivo'}
          </Text>
          <Text style={styles.estadoTexto}>
            {estadoMovimiento}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.boton,
          { backgroundColor: vigilancia ? Colors.danger : Colors.primary },
        ]}
        onPress={cambiarVigilancia}
      >
        <Text style={styles.textoBoton}>
          {vigilancia ? 'Desactivar vigilancia' : 'Activar vigilancia'}
        </Text>
      </TouchableOpacity>

      <View style={styles.seccion}>
        <Text style={styles.seccionTitulo}>Resumen</Text>

        <Tarjeta
          titulo="Detección de movimiento"
          valor={movimiento ? 'DETECTADO' : 'SIN MOVIMIENTO'}
          descripcion="Lectura del acelerómetro del teléfono"
        />

        <Tarjeta
          titulo="Alertas registradas"
          valor={String(alertas.length)}
          descripcion="Alertas detectadas durante esta sesión"
        />
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
  estado: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  indicador: {
    width: 13,
    height: 13,
    borderRadius: 20,
    marginRight: 15,
  },
  estadoTitulo: {
    color: Colors.text,
    fontSize: 17,
    fontWeight: 'bold',
  },
  estadoTexto: {
    color: Colors.muted,
    fontSize: 12,
    marginTop: 5,
  },
  boton: {
    padding: 17,
    borderRadius: 13,
    alignItems: 'center',
  },
  textoBoton: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  seccion: {
    marginTop: 28,
  },
  seccionTitulo: {
    color: Colors.text,
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});