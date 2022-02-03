import { useEffect, useState } from 'react';

import styles from '../styles/ModalTempSensorWindow.module.scss'

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
    // TODO: Change address
    let smartSocket = new WebSocket("wss://smarthome.com/api/v1/refresh");

    smartSocket.addEventListener('message', async function (event) {
      const response = await (event.data).json()
      setData(response)
    })
    return () => smartSocket.close()
  }, [id])

  return (
    <>
      {data &&
        <div className={styles.wrapper} >
          <div className={styles.description}>
            <div>{data.name}</div>
            <div>{data.connectionState ? 'Włączony' : 'Wyłączony'}</div>
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
