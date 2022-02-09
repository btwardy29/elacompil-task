
import { createContext, useEffect, useState } from 'react';
import './utilities/modal.ts'

// Components
import Avatar from './components/Avatar';
import Bulbs from './components/Bulbs';
import Button from './components/Button';
import Logo from './components/Logo';
import Outlets from './components/Outlets';
import TempSensors from './components/TempSensors';
import ModalBulbWindow from './components/ModalBulbWindow';
import ModalOutletWindow from './components/ModalOutletWindow';
import ModalTempSensorWindow from './components/ModalTempSensorWindow';

// Styles
import './styles/App.scss'

interface Device {
  type: string,
  id: string,
  name: string,
  connectionState: string
}

export const ModalContext = createContext({})

// Refresh time in ms
const refreshTime = 5000

function App() {
  const [scroll, setScroll] = useState(0)
  const [bulbs, setBulbs] = useState<Device[]>([])
  const [outlets, setOutlets] = useState<Device[]>([])
  const [tempSensors, setTempSensors] = useState<Device[]>([])
  const [showModal, setShowModal] = useState(false)
  const [id, setId] = useState('')
  const [deviceType, setDeviceType] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const query = await fetch('http://localhost:4000/api/v1/devices')
      const { data } = await query.json()
      let bulbs:Device[] = []
      let outlets:Device[] = []
      let tempSensors: Device[] = []

      data.forEach((device:Device) => {
        switch (device.type) {
          case "bulb":
            bulbs = [...bulbs, device]
            break;
          case "outlet":
            outlets = [...outlets, device]
            break;
          case "temperatureSensor":
            tempSensors = [...tempSensors, device]
            break;
          default: throw new Error('Nieznane urządzenie')
        }
      })
      setBulbs(bulbs)
      setOutlets(outlets)
      setTempSensors(tempSensors)
    }
    fetchData()
    setInterval(() => {
      fetchData()
      console.log('fetched');
    }, refreshTime)
  }, [])


  const buttonsList = [
    {
      count: bulbs.length,
      desc: 'Żarówki',
      icon: 'lightbulb',
      scrollCount: 0
    },
    {
      count: outlets.length,
      desc: 'Kontakty',
      icon: 'electrical_services',
      scrollCount: 1
    },
    {
      count: tempSensors.length,
      desc: 'Czujniki Temperatury',
      icon: 'thermostat',
      scrollCount: 2
    },
  ]

  return (
    <div className='appWrapper'>
      <ModalContext.Provider value={{ setShowModal, setId, setDeviceType }}>
        <div className={`modal ${!showModal && 'invisible'}`}>
          {deviceType === 'bulb' ? <ModalBulbWindow id={id} /> : deviceType === 'outlet' ? <ModalOutletWindow id={id} /> : deviceType === "tempSensor" ? <ModalTempSensorWindow id={id} /> : null}
          <button className='closeBtn'  onClick={() => setShowModal(false)}>Zamknij</button>
        </div>
        <div className="App">
          <div className='list'>
            <Logo />
            <Avatar />
            <p>Moje urządzenia:</p>
            <ul>
              {buttonsList.map(button => {
                return <li onClick={() => setScroll(button.scrollCount)} key={button.scrollCount}><Button count={button.count} desc={button.desc} icon={button.icon} /></li>
              })}
            </ul>
          </div>
          <div className='devices'>
            <div className={`overflowProtect ${scroll === 1 ? 'goDown1' : scroll === 2 ? 'goDown2' : null}  `}>
            <div className='devicesWindow'>
              <Bulbs bulbs={bulbs} />
            </div>
            <div className='devicesWindow'>
                <Outlets outlets={outlets} />
            </div>
            <div className='devicesWindow'>
              <TempSensors tempSensors={tempSensors}/>
            </div>
            </div>
          </div>
          </div>
        </ModalContext.Provider>
    </div>
  );
}

export default App;
