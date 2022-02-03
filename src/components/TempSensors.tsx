import '../styles/TempSensors.scss'
import SingleSensor from './SingleSensor';

interface Device {
  type: string,
  id: string,
  name: string,
  connectionState: string
}


const TempSensors = ({ tempSensors }: { tempSensors: Device[] }) => {
  return <>
      <h1 className='deviceHeader'>Dostępne inteligentne wtyczki:</h1>
      <div className='bulbsWrapper'>
      {tempSensors.map(sensor => {
        return <SingleSensor sensor={sensor} key={sensor.id} />
      })}

    </div>
    </>;
};

export default TempSensors;
