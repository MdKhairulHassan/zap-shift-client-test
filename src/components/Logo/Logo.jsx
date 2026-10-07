import { Link } from 'react-router';
import logo from '../../assets/logo.png';

const Logo = () => {
  return (
    <Link to={'/'}>
      <div className="flex items-end">
        <img src={logo} alt={'logo'} />
        <h3 className="text-3xl font-bold -ms-4">zapShift</h3>
      </div>
    </Link>
  );
};

export default Logo;
