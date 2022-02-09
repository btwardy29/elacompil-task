import { useEffect, useState } from 'react';
import styles from '../styles/ModalOutletWindow.module.scss'
const { io } = require("socket.io-client");

interface OutletDevice {
  type: string;
  id: string;
  name: string;
  connectionState: string;
  isTurnedOn: boolean;
  powerConsumption: number;
}

const ModalOutletWindow = ({ id }: { id: string }) => {


  const [data, setData] = useState<OutletDevice | null>(null)
  
  useEffect(() => {
    // Second argument prevents CORS from error
    const socket = io(`ws://localhost:4040`, { transports: ['websocket'] });

    socket.on('connect', function () {
      socket.emit('fetchId', id)
      
      socket.on("message", (data: OutletDevice) => {
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
            <span className={`material-icons ${data.connectionState}`}>bolt</span>
            <span className={styles.brightness}>{data.powerConsumption} watów</span>
          </div>
        </div>
      }
    </>
  )
};

export default ModalOutletWindow;
