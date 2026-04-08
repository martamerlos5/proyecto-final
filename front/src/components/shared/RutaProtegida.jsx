import { Navigate, Outlet } from 'react-router-dom';

const RutaProtegida = ({ rol }) => {
  let usuario = null;

  const userString = localStorage.getItem('usuario');

  if (userString) {
    try {
      usuario = JSON.parse(userString);
    } catch (error) {
      usuario = null; // si JSON está corrupto, el usuario pasa a ser nulo
      console.log(error)
    }
  }


  // si el usuario no está logueado -> le lleva al index
  if (!usuario || !usuario.id) {
    return <Navigate to="/" />
  }

  // si el usuario no tiene el rol correcto -> le lleva al index
  if (rol && usuario.rol !== rol) {
    return <Navigate to="/" />;
  }



  // solo se pasa si hay un id real
  return <Outlet />;

};

export default RutaProtegida;