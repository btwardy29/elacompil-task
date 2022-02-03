import { useContext } from 'react';
import { ModalContext } from '../App';
import '../styles/SingleBulb.scss'

interface Device {
  id: string,
  name: string,
  connectionState: string
}

const SingleBulb = ({ bulb }: { bulb: Device }) => {

  //@ts-ignore
  const { setId, setShowModal, setDeviceType } = useContext(ModalContext)
  
  const handleClick = () => {
    setId(bulb.id)
    setShowModal(true)
    setDeviceType('bulb')
  }

  return <div className='singleDeviceCard' key={bulb.id} onClick={handleClick}>
    <span className={`sizeXl ${bulb.connectionState} material-icons power`}>emoji_objects</span>
    <p className='deviceTitle'>Żarówka</p>
    <p>{bulb.name}</p>
  </div>;
};

export default SingleBulb;
