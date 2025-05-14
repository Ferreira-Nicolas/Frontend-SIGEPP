// src/Routers/MainRouter.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Login from "../../pages/Login"; // default export

import Home from "../../pages/Home"; // default export
import BancoHoras from "../../pages/BancoHoras"; // default export
import { Layout } from "../../pages/Layout";
import { NotFound } from "../../pages/NotFound";

export function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1) ROTA DE LOGIN (fora do layout) */}
        <Route path="/login" element={<Login />} />

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
