import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  ReactNode,
} from 'react';

import { Accelerometer } from 'expo-sensors';

export type Alerta = {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;
};

type Aceleracion = {
  x: number;
  y: number;
  z: number;
};

type AidaContextType = {
  vigilancia: boolean;
  alertas: Alerta[];
  notificaciones: boolean;
  sensorDisponible: boolean;
  movimiento: boolean;
  estadoMovimiento: string;
  aceleracion: Aceleracion;
  cambiarVigilancia: () => void;
  registrarAlerta: (titulo: string, descripcion: string) => void;
  borrarAlertas: () => void;
  cambiarNotificaciones: () => void;
};

const AidaContext = createContext<AidaContextType | undefined>(undefined);

export function AidaProvider({ children }: { children: ReactNode }) {
  const [vigilancia, setVigilancia] = useState(false);
  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const [notificaciones, setNotificaciones] = useState(true);

  const [sensorDisponible, setSensorDisponible] = useState(false);
  const [movimiento, setMovimiento] = useState(false);
  const [estadoMovimiento, setEstadoMovimiento] = useState('Vigilancia apagada');

  const [aceleracion, setAceleracion] = useState<Aceleracion>({
    x: 0,
    y: 0,
    z: 0,
  });

  const registrarAlerta = useCallback(
    (titulo: string, descripcion: string) => {
      const nuevaAlerta: Alerta = {
        id: `${Date.now()}-${Math.random()}`,
        titulo,
        descripcion,
        fecha: new Date().toLocaleString(),
      };

      setAlertas((actuales) => [nuevaAlerta, ...actuales]);
    },
    []
  );

  const cambiarVigilancia = () => {
    setVigilancia((actual) => !actual);
  };

  const borrarAlertas = () => {
    setAlertas([]);
  };

  const cambiarNotificaciones = () => {
    setNotificaciones((actual) => !actual);
  };

  useEffect(() => {
    if (!vigilancia) {
      setMovimiento(false);
      setEstadoMovimiento('Vigilancia apagada');
      setSensorDisponible(false);
      return;
    }

    let activa = true;
    let suscripcion: ReturnType<typeof Accelerometer.addListener> | null = null;

    let anterior: Aceleracion | null = null;
    let ultimaAlerta = 0;

    setEstadoMovimiento('Comprobando sensor...');

    Accelerometer.setUpdateInterval(250);

    Accelerometer.isAvailableAsync()
      .then((disponible) => {
        if (!activa) return;

        setSensorDisponible(disponible);

        if (!disponible) {
          setEstadoMovimiento('Sensor no disponible en este dispositivo');
          return;
        }

        setEstadoMovimiento('Sensor conectado. Esperando movimiento...');

        suscripcion = Accelerometer.addListener((datos) => {
          if (!activa) return;

          const actual: Aceleracion = {
            x: Number(datos.x.toFixed(2)),
            y: Number(datos.y.toFixed(2)),
            z: Number(datos.z.toFixed(2)),
          };

          setAceleracion(actual);

          if (anterior !== null) {
            const diferencia = Math.sqrt(
              Math.pow(actual.x - anterior.x, 2) +
              Math.pow(actual.y - anterior.y, 2) +
              Math.pow(actual.z - anterior.z, 2)
            );

            const detectado = diferencia > 0.18;

            setMovimiento(detectado);

            if (detectado) {
              setEstadoMovimiento('Movimiento detectado');

              const ahora = Date.now();

              if (ahora - ultimaAlerta > 4000) {
                ultimaAlerta = ahora;

                registrarAlerta(
                  'Movimiento detectado',
                  'El acelerómetro del teléfono registró un cambio de movimiento.'
                );
              }
            } else {
              setEstadoMovimiento('Sin movimiento reciente');
            }
          }

          anterior = actual;
        });
      })
      .catch(() => {
        if (activa) {
          setSensorDisponible(false);
          setEstadoMovimiento('No se pudo acceder al sensor');
        }
      });

    return () => {
      activa = false;
      suscripcion?.remove();
    };
  }, [vigilancia, registrarAlerta]);

  return (
    <AidaContext.Provider
      value={{
        vigilancia,
        alertas,
        notificaciones,
        sensorDisponible,
        movimiento,
        estadoMovimiento,
        aceleracion,
        cambiarVigilancia,
        registrarAlerta,
        borrarAlertas,
        cambiarNotificaciones,
      }}
    >
      {children}
    </AidaContext.Provider>
  );
}

export function useAida() {
  const context = useContext(AidaContext);

  if (!context) {
    throw new Error('useAida debe usarse dentro de AidaProvider');
  }

  return context;
}