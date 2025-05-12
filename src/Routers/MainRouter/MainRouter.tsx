
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router";
import BancoHoras from "../../pages/BancoHoras";
import { Login } from "../../pages/Login";
import { NotFound } from "../../pages/NotFound";
import { Layout } from "../../pages/Layout";
import Home from "../../pages/Home";


export function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 1) ROTA DE LOGIN (fora do layout) */}
        <Route path="/login" element={<Login children={undefined} />} />

        {/* 2) ROTAS PROTEGIDAS DENTRO DO LAYOUT */}
        <Route path="/" element={<Layout />}>
          {/* ao chegar em “/”, redireciona para /home */}
          <Route index element={<Navigate to="home" replace />} />

          <Route path="home" element={<Home />} />
          <Route path="clientes" element={<div>Clientes</div>} />
          <Route path="grupos" element={<div>Grupos</div>} />
          <Route path="banco-de-horas" element={<BancoHoras />} />
          {/* …outras rotas filhas */}
        </Route>

        {/* 3) QUALQUER OUTRA → 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}
