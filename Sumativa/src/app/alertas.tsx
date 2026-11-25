import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Header from '../components/header';
import { useAida } from '../components/aida-context';
import { Colors } from '../constants/theme';

export default function Alertas() {
  const { alertas, borrarAlertas } = useAida();

  return (
    <ScrollView style={styles.fondo} contentContainerStyle={styles.contenido}>
      <Header
        titulo="Historial de alertas"
        subtitulo="Movimientos registrados por A.I.D.A."
      />

      <View style={styles.resumen}>
        <Text style={styles.numero}>{alertas.length}</Text>
        <Text style={styles.textoResumen}>Alertas registradas</Text>
      </View>

      {alertas.length === 0 ? (
        <View style={styles.vacio}>
          <Text style={styles.vacioTitulo}>Sin alertas</Text>
          <Text style={styles.vacioTexto}>
            Activa la vigilancia y las detecciones aparecerán aquí.
          </Text>
        </View>
      ) : (
        alertas.map((alerta) => (
          <View key={alerta.id} style={styles.alerta}>
            <Text style={styles.alertaTitulo}>{alerta.titulo}</Text>
            <Text style={styles.alertaDescripcion}>
              {alerta.descripcion}
            </Text>
            <Text style={styles.fecha}>{alerta.fecha}</Text>
          </View>
        ))
      )}

      {alertas.length > 0 && (
        <TouchableOpacity style={styles.boton} onPress={borrarAlertas}>
          <Text style={styles.textoBoton}>Borrar historial</Text>
        </TouchableOpacity>
      )}
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
  resumen: {
    backgroundColor: Colors.card,
    padding: 22,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  numero: {
    color: Colors.primary,
    fontSize: 35,
    fontWeight: 'bold',
  },
  textoResumen: {
    color: Colors.muted,
    marginTop: 5,
  },
  vacio: {
    padding: 25,
    backgroundColor: Colors.card,
    borderRadius: 15,
    alignItems: 'center',
  },
  vacioTitulo: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  vacioTexto: {
    color: Colors.muted,
    marginTop: 10,
    textAlign: 'center',
  },
  alerta: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 18,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  alertaTitulo: {
    color: Colors.text,
    fontWeight: 'bold',
    fontSize: 16,
  },
  alertaDescripcion: {
    color: Colors.muted,
    marginTop: 8,
  },
  fecha: {
    color: Colors.primary,
    fontSize: 11,
    marginTop: 12,
  },
  boton: {
    backgroundColor: Colors.danger,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBoton: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});