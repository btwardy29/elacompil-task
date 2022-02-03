import { useContext } from 'react';
import { ModalContext } from '../App';

import '../styles/SingleSensor.scss'

interface Device {
  id: string,
  name: string,
  connectionState: string
}

const SingleSensor = ({ sensor }: { sensor: Device }) => {
  
    //@ts-ignore
  const { setId, setShowModal, setDeviceType } = useContext(ModalContext)

  const handleClick = () => {
    setId(sensor.id)
    setShowModal(true)
    setDeviceType('tempSensor')
  }

  
  return <div className='singleDeviceCard' key={sensor.id} onClick={handleClick}>
    <span className={`sizeXl ${sensor.connectionState} material-icons power`}>thermostat</span>
    <p className='deviceTitle'>Czujnik temperatury</p>
    <p>{sensor.name}</p>
  </div>;
};

export default SingleSensor;
