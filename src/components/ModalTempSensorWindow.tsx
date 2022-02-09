import { useEffect, useState } from 'react';
import styles from '../styles/ModalTempSensorWindow.module.scss'
const { io } = require("socket.io-client");

interface TempSensorDevice {
  type: 'temperatureSensor';
  id: string;
  name: string;
  connectionState: string; // 'connected', 'disconnected' or 'poorConnection'
  temperature: number; // in Celsius
}

const ModalTempSensorWindow = ({ id }: { id: string }) => {

  const [data, setData] = useState<TempSensorDevice | null>(null)
  
  useEffect(() => {
    // Second argument prevents CORS from error
    const socket = io(`ws://localhost:4040`, { transports: ['websocket'] });

    socket.on('connect', function () {
      socket.emit('fetchId', id)
      
      socket.on("message", (data: TempSensorDevice) => {
        setData(data)
      })
    })
    return () => { socket.off() }
  }, [id])

  return (
    <>
      {data &&
        <div className={styles.wrapper} >
          <div className={styles.description}>
            <div>{data.name}</div>
            <div>{
              ((data.connectionState === 'connected') && 'Włączony') ||
              ((data.connectionState === 'disconnected') && 'Wyłączony') ||
              ((data.connectionState === 'poorConnection') && 'Słabe połączenie')
              }</div>
          </div>
          <div className={styles.circleBox}>
            <span className={`material-icons ${data.connectionState}`}>thermostat</span>
            <span className={styles.brightness}>{data.temperature}°C</span>
          </div>
        </div>
      }
    </>
  )
};

export default ModalTempSensorWindow;
