import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
} from 'react-native';

import Header from '../components/header';
import { useAida } from '../components/aida-context';
import { Colors } from '../constants/theme';

export default function Configuracion() {
  const { notificaciones, cambiarNotificaciones } = useAida();

  return (
    <ScrollView style={styles.fondo} contentContainerStyle={styles.contenido}>
      <Header
        titulo="Configuración"
        subtitulo="Preferencias de la aplicación"
      />

      <View style={styles.opcion}>
        <View style={styles.textos}>
          <Text style={styles.titulo}>Avisos internos</Text>
          <Text style={styles.descripcion}>
            Activar o desactivar los avisos informativos de la aplicación.
          </Text>
        </View>

        <Switch
          value={notificaciones}
          onValueChange={cambiarNotificaciones}
          trackColor={{
            false: Colors.secondary,
            true: Colors.primary,
          }}
          thumbColor="#FFFFFF"
        />
      </View>

      <View style={styles.informacion}>
        <Text style={styles.informacionTitulo}>Información de A.I.D.A.</Text>

        <Text style={styles.informacionTexto}>
          A.I.D.A. es una aplicación de control y registro de alertas internas.
        </Text>

        <Text style={styles.version}>Versión 1.0.0</Text>
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
  opcion: {
    backgroundColor: Colors.card,
    borderRadius: 15,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  textos: {
    flex: 1,
    paddingRight: 12,
  },
  titulo: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  descripcion: {
    color: Colors.muted,
    fontSize: 12,
    marginTop: 7,
    lineHeight: 18,
  },
  informacion: {
    backgroundColor: Colors.card,
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
  },
  informacionTitulo: {
    color: Colors.primary,
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  informacionTexto: {
    color: Colors.muted,
    lineHeight: 22,
  },
  version: {
    color: Colors.muted,
    marginTop: 18,
    fontSize: 12,
  },
});