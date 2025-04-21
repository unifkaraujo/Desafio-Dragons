import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import logo from '../../assets/logo.png'
import './Header.css'

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('Autenticado');
    navigate('/login');
  };

  return (
    <section className="header-container">

        <div className='header-title'>
          <img src={logo} alt="Logo do Dragão" className="dragon-logo-header" />
          <h1>Dragons</h1>
        </div>
        <button className="btn red" onClick={handleLogout}>
          <FaSignOutAlt /> Sair
        </button>

    </section>
  );
};

export default Header;
