import { useEffect, useState } from 'react';

import styles from '../styles/ModalBulbWindow.module.scss'

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
