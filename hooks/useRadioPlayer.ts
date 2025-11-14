// hooks/useRadioPlayer.ts
import { Audio } from 'expo-av'; // Módulo de audio de Expo para manejar reproducción de audio
import { useEffect, useRef, useState } from 'react'; // Hooks de React
import { RADIO_CONFIG } from '../constants/Config'; // Configuración de la estación de radio
// Hook personalizado para manejar la reproducción de radio
export const useRadioPlayer = () => {
 // Estado que indica si la radio está actualmente reproduciendo
 const [isPlaying, setIsPlaying] = useState(false);
 
 // Estado que indica si está cargando o conectando con el stream
 const [isLoading, setIsLoading] = useState(false);
 
 // Estado para almacenar mensajes de error
 const [error, setError] = useState<string | null>(null);
 
 // Estado para el nivel de volumen (0.0 a 1.0)
 const [volume, setVolume] = useState(0.8); // 80% de volumen por defecto
 
 // Referencia para almacenar la instancia del objeto Sound de Expo Audio
 const soundRef = useRef<Audio.Sound | null>(null);
 // Efecto para configurar el modo de audio cuando el componente se monta
 useEffect(() => {
    // Función asíncrona para configurar el comportamiento del audio
    const setupAudio = async () => {
    try {
        // Configura el modo de audio global para la aplicación
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false, // Deshabilita grabación en iOS
            staysActiveInBackground: true, // Permite que el audio continue en segundo plano
            playsInSilentModeIOS: true, // Reproduce audio incluso en modo silencio de iOS
            shouldDuckAndroid: true, // Reduce volumen de otras apps cuando esta app reproduce audio (Android)
            playThroughEarpieceAndroid: false, // Usa altavoz principal en lugar del auricular (Android)
            });
        } catch (err) {
            // Captura errores en la configuración pero no los muestra al usuario
            console.error('Error configurando audio:', err);
            }
        };
        // Ejecuta la configuración de audio
        setupAudio();
        
        // Función de cleanup que se ejecuta cuando el componente se desmonta
        return () => {
        // Si existe una instancia de Sound, la libera para evitar memory leaks
        if (soundRef.current) {
        soundRef.current.unloadAsync(); // Libera los recursos de audio
        }
    };
 }, []); // Se ejecuta solo una vez al montar el componente

 // Efecto para actualizar el volumen cuando cambia el estado 'volume'
 useEffect(() => {
    // Si existe una instancia de Sound activa
    if (soundRef.current) {
 // Actualiza el volumen del audio en reproducción
 soundRef.current.setVolumeAsync(volume);
 }
 }, [volume]); // Se ejecuta cada vez que 'volume' cambia

 // Función para iniciar la reproducción de la radio
 const playRadio = async () => {
 // Si ya está cargando, sale de la función para evitar múltiples llamadas
 if (isLoading) return;

 // Actualiza estados para indicar carga y limpiar errores previos
 setIsLoading(true);
 setError(null);

 try {
    // Si ya existe una instancia de Sound reproduciendo
    if (soundRef.current) {
        // Detiene la reproducción actual
        await soundRef.current.stopAsync();
        // Libera los recursos de la instancia anterior
        await soundRef.current.unloadAsync();
        }

 // Crea una nueva instancia de Sound con el stream de radio
 const { sound } = await Audio.Sound.createAsync(
    {
        uri: RADIO_CONFIG.station.streamURL // URL del stream de radio desde la configuración
    },
    {
    shouldPlay: true, // Inicia reproducción inmediatamente
    volume: volume // Establece el volumen inicial
    }
);

 // Almacena la referencia a la nueva instancia de Sound
 soundRef.current = sound;
 
 // Actualiza el estado para indicar que está reproduciendo
 setIsPlaying(true);

    // Configura un listener para cambios en el estado de reproducción
    sound.setOnPlaybackStatusUpdate((status) => {
        // Si el audio está cargado y acaba de terminar
        if (status.isLoaded && status.didJustFinish) {
        setIsPlaying(false); // Actualiza estado a "no reproduciendo"
        }
    });
 } catch (err) {
    // Manejo de errores durante la conexión/reproducción
    setError('Error al conectar con la radio'); // Mensaje de error para el usuario
    console.error('Error reproduciendo radio:', err); // Log para desarrollo
    } finally {
    // Este bloque siempre se ejecuta, haya error o no
    setIsLoading(false); // Quita el estado de carga
    }
};

    // Función para detener la reproducción de la radio
    const stopRadio = async () => {
        // Si existe una instancia de Sound activa
        if (soundRef.current) {
        // Detiene la reproducción
        await soundRef.current.stopAsync();
        // Libera los recursos de audio
        await soundRef.current.unloadAsync();
        // Limpia la referencia
        soundRef.current = null;
        }

    // Actualiza estados
    setIsPlaying(false); // Indica que no está reproduciendo
    setError(null); // Limpia cualquier error previo
    };

    // Función que alterna entre play y stop
    const togglePlayback = () => {
        if (isPlaying) {
        stopRadio(); // Si está reproduciendo, para
        } else {
        playRadio(); // Si no está reproduciendo, inicia
        }
    };

    // Retorna los estados y funciones para que el componente los use
    return {
    isPlaying, // Booleano: true si está reproduciendo
    isLoading, // Booleano: true si está cargando/conectando
    error, // String | null: mensaje de error o null
    volume, // Número: nivel de volumen actual (0-1)
    setVolume, // Función: para cambiar el volumen
    togglePlayback, // Función: alterna entre play/pause
    stopRadio, // Función: para detener la radio
    playRadio // Función: para iniciar la radio
    };
};