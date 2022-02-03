import '../styles/Bulbs.scss'
import SingleBulb from './SingleBulb';

interface Device {
  type: string,
  id: string,
  name: string,
  connectionState: string
}

const Bulbs = ({ bulbs }: { bulbs: Device[] }) => {
  return <>
      <h1 className='deviceHeader'>Dostępne żarówki:</h1>
      <div className='bulbsWrapper'>
      {bulbs.map(bulb => {
        return <SingleBulb bulb={bulb} key={bulb.id} />
      })}

    </div>
    </>;
};

export default Bulbs;
