import { useEffect, useState } from 'react';

import styles from '../styles/ModalOutletWindow.module.scss'

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
            <span className={`material-icons ${data.connectionState}`}>bolt</span>
            <span className={styles.brightness}>{data.powerConsumption}Watts</span>
          </div>
        </div>
      }
    </>
  )
};

export default ModalOutletWindow;
