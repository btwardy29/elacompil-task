
import { createContext, useEffect, useState, useRef } from 'react';
import interact from 'interactjs'

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

const position = { x: 0, y: 0 }

interact('.modal')
  .resizable({
    // resize from all edges and corners
    edges: { left: true, right: true, bottom: true, top: true },

    listeners: {
      move (event) {
        var target = event.target
        var x = position.x || 0
        var y = position.y || 0

        // update the element's style
        target.style.width = event.rect.width + 'px'
        target.style.height = event.rect.height + 'px'

        // translate when resizing from top or left edges
        x += event.deltaRect.left
        y += event.deltaRect.top

        target.style.transform = 'translate(' + x + 'px,' + y + 'px)'

        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y)
      }
    },
    modifiers: [
      // keep the edges inside the parent
      interact.modifiers.restrictEdges({
        outer: 'parent'
      }),

      // minimum size
      interact.modifiers.restrictSize({
        min: { width: 100, height: 50 }
      })
    ],

    inertia: true
  })
  .draggable({
    listeners: {
      start (event) {
        console.log(position.y)
      },
      move (event) {
        position.x += event.dx
        position.y += event.dy
  
        event.target.style.transform =
          `translate(${position.x}px, ${position.y}px)`
      },
    }
  })

export const ModalContext = createContext({})

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
      // TODO: Change address
      const query = await fetch('https://smarthome.com/api/v1/devices')
      const res = await query.json()

      const bulbs:Device[] = []
      const outlets:Device[] = []
      const tempSensors: Device[] = []

      res.map((device:Device) => {
        switch (device.type) {
          case "bulb":
            bulbs.push(device)
            break;
          case "outlet":
            outlets.push(device)
            break;
          case "temperatureSensor":
            tempSensors.push(device)
            break;
        }
      })
      setBulbs(bulbs)
      setOutlets(outlets)
      setTempSensors(tempSensors)
    }
    fetchData()
  }, [])

  let useClickOutside = (handler:(() => void)) => {
    let domNode:any = useRef();
  
    useEffect(() => {
      // TODO: Fix any type
      let maybeHandler = (event:any) => {
        if (domNode.current && !domNode.current.contains(event.target)) {
          handler();
        }
      };
      document.addEventListener("mousedown", maybeHandler);
  
      return () => document.removeEventListener("mousedown", maybeHandler);
    });
  
    return domNode;
  };

  let domNode = useClickOutside(() => {
    setShowModal(false);
  });

  return (
    <>
      <ModalContext.Provider value={{ setShowModal, setId, setDeviceType }}>
        <div ref={domNode} className={`modal ${!showModal ? 'invisible' : null}`}>
          {deviceType == 'bulb' ? <ModalBulbWindow id={id} /> : deviceType == 'outlet' ? <ModalOutletWindow id={id}/> : deviceType == "tempSensor" ? <ModalTempSensorWindow id={id} /> : null}
          
        </div>
        <div className="App">
          <div className='list'>
            <Logo />
            <Avatar />
            <p>Moje urządzenia:</p>
            <ul>
              <li onClick={() =>setScroll(0)}><Button count={bulbs.length} desc={'Żarówki'} icon={'lightbulb'} /></li>
              <li onClick={() =>setScroll(1)}><Button count={outlets.length} desc={'Kontakty'} icon={'electrical_services'} /></li>
              <li onClick={() => setScroll(2)}><Button count={tempSensors.length} desc={'Czujniki temperatury'} icon={'thermostat'} /></li>
            </ul>
          </div>
          <div className='devices'>
            <div className={`overflowProtect ${scroll == 1 ? 'goDown1' : scroll == 2 ? 'goDown2' : null}  `}>
            <div className='devicesWindow'>
              <Bulbs bulbs={bulbs} />
            </div>
            <div className='devicesWindow'>
                <Outlets outlets={outlets}/>
            </div>
            <div className='devicesWindow'>
              <TempSensors tempSensors={tempSensors}/>
            </div>
            </div>
          </div>
          </div>
        </ModalContext.Provider>
    </>
  );
}

export default App;
