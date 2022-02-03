import home from '../assets/home.jpg'
import '../styles/Avatar.scss'

const Avatar = () => {
  return <div className='avatar'>
    <img src={home} alt='avatar' />
    <h3>Jesionowa 3</h3>
    <h4>Ząbkowice Śląskie</h4>
  </div>;
};

export default Avatar;
