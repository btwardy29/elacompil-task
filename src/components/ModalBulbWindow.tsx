import { useEffect, useState } from 'react';
import styles from '../styles/ModalBulbWindow.module.scss'
const { io } = require("socket.io-client");

interface BulbDevice {
  type: string;
  id: string;
  name: string;
  connectionState: string;
  isTurnedOn: true;
  brightness: number;
  color: string;
}

const ModalBulbWindow = ({ id }: { id: string }) => {

  const [data, setData] = useState<BulbDevice | null>(null)
  
  useEffect(() => {
    // Second argument prevents CORS from error
    const socket = io(`ws://localhost:4040`, { transports: ['websocket'] });

    socket.on('connect', function () {
      socket.emit('fetchId', id)
      
      socket.on("message", (data: BulbDevice) => {
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
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="140px" height="140px">
          <defs>
          </defs>
          <circle cx="70" cy="70" r="60" strokeLinecap="round" style={{ 'stroke': `${data.color}` }}/>
            </svg>
            <span className={`material-icons ${data.connectionState}`}>lightbulb</span>
            <span className={styles.brightness}>{data.brightness}</span>
          </div>
        </div>
      }
    </>
  )
};

export default ModalBulbWindow;
