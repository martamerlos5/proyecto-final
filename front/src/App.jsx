import { Routes, Route } from "react-router-dom";

import Index from "./components/Index";
import Login from "./components/Login";
import LoginAdmin from "./components/LoginAdmin";
import Registro from "./components/Registro";
import RegistroAdmin from "./components/RegistroAdmin";
import Eventos from "./components/Eventos";
import DetalleEvento from "./components/DetalleEvento";
import Cesta from "./components/Cesta";
import Contacto from "./components/Contacto";
import ContrasenaOlvidada from "./components/ContrasenaOlvidada";
import Dashboard from "./components/Dashboard";
import RutaProtegida from "./components/shared/RutaProtegida";
import Resultados from "./components/Resultados";
import EditarDireccion from "./components/dashboard/EditarDireccion";
import MisEntradas from "./components/dashboard/MisEntradas";
import CambiarPassword from "./components/dashboard/CambiarPassword";
import EliminarCuenta from "./components/dashboard/EliminarCuenta";
import EditarPerfil from "./components/dashboard/EditarPerfil";
import DashboardAdmin from "./components/DashboardAdmin";
import CrearEvento from "./components/dashboard-admin/CrearEvento";
import Estadisticas from "./components/dashboard-admin/Estadisticas";
import EditarEvento from "./components/dashboard-admin/EditarEvento";
import VerUsuarios from "./components/dashboard-admin/VerUsuarios";
import VerEventos from "./components/dashboard-admin/VerEventos";
import PasswordCambiar from "./components/PasswordCambiar";
import PoliticaPrivacidad from "./components/footer/PoliticaPrivacidad";
import Terminos from "./components/footer/Terminos";
import Pasarela from "./components/Pasarela";
import Cupones from "./components/dashboard/Cupones";
import CrearEntradas from "./components/dashboard-admin/CrearEntradas";
import VerEntradas from "./components/dashboard-admin/VerEntradas";
import EditarEntrada from "./components/dashboard-admin/EditarEntrada";




function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login-admin" element={<LoginAdmin />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="registro-admin" element={<RegistroAdmin />} />
      <Route path="/eventos" element={<Eventos />} />
      <Route path="/eventos/:id" element={<DetalleEvento />} />

      <Route path="/cesta" element={<Cesta />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/contrasenaOlvidada" element={<ContrasenaOlvidada />} />
      <Route path="/cambiar-password/:id" element={<PasswordCambiar />} />



      {/* rutas para el dashboard de cliente */}
      <Route path="/dashboard" element={<RutaProtegida rol="Cliente" />}>
        <Route element={<Dashboard />}>
          <Route index element={<EditarPerfil />} />
          <Route path="direccion" element={<EditarDireccion />} />
          <Route path="password" element={<CambiarPassword />} />
          <Route path="entradas" element={<MisEntradas />} />
          <Route path="cupones" element={<Cupones />} />
          <Route path="eliminar" element={<EliminarCuenta />} />
        </Route>
      </Route>

      {/* rutas para el dashboard de admin */}
      <Route path="/dashboard-admin" element={<RutaProtegida rol="Administrador" />}>
        <Route element={<DashboardAdmin />}>
          <Route index element={<EditarPerfil />} />
          <Route path="direccion" element={<EditarDireccion />} />

          <Route path="eventos">
            <Route index element={<VerEventos />} />
            <Route path="crear" element={<CrearEvento />} />
            <Route path="editar/:id" element={<EditarEvento />} />
            <Route path="editar/:id/entradas/ver" element={<VerEntradas />} />
            <Route path="editar/:id/entradas/ver/crear" element={<CrearEntradas />} />
            <Route path="editar/:id/entradas/ver/editar/:entradaId" element={<EditarEntrada />} />

          </Route>

          <Route path="estadisticas" element={<Estadisticas />} />
          <Route path="usuarios" element={<VerUsuarios />} />
          <Route path="eliminar" element={<EliminarCuenta />} />

        </Route>

      </Route>



      <Route path="/resultados" element={<Resultados />} />
      <Route path="/eventos/categoria/:id" element={<Resultados />} />
      <Route path="/eventos/localidad/:id" element={<Resultados />} />

      <Route path="politica-privacidad" element={<PoliticaPrivacidad />} />
      <Route path="terminos-condiciones" element={<Terminos />} />


      <Route path="pasarela" element={<Pasarela />} />

    </Routes>
  );
}

export default App;
