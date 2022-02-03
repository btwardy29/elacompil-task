import '../styles/Outlets.scss'
import SingleOutlet from './SingleOutlet';

interface Device {
  type: string,
  id: string,
  name: string,
  connectionState: string
}


const Outlets = ({ outlets }: { outlets: Device[] }) => {
  return <>
      <h1 className='deviceHeader'>Dostępne inteligentne wtyczki:</h1>
      <div className='bulbsWrapper'>
      {outlets.map(outlet => {
        return <SingleOutlet outlet={outlet} key={outlet.id} />
      })}

    </div>
    </>;
};

export default Outlets;
