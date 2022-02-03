import { useContext } from 'react';
import { ModalContext } from '../App';

import '../styles/SingleBulb.scss'

interface Device {
  id: string,
  name: string,
  connectionState: string
}

const SingleOutlet = ({ outlet }: { outlet: Device }) => {

  //@ts-ignore
  const { setId, setShowModal, setDeviceType } = useContext(ModalContext)

  
  const handleClick = () => {
    setId(outlet.id)
    setShowModal(true)
    setDeviceType('outlet')
  }

  return <div className='singleDeviceCard' key={outlet.id} onClick={handleClick}>
    <span className={`sizeXl ${outlet.connectionState} material-icons power`}>electrical_services</span>
    <p className='deviceTitle'>Gniazdko elektryczne</p>
    <p>{outlet.name}</p>
  </div>;
};

export default SingleOutlet;
