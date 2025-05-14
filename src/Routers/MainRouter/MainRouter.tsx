// src/Routers/MainRouter.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router';
import Login from '../../pages/Login';

import Home from '../../pages/Home';
import BancoHoras from '../../pages/BancoHoras';

import NotAuthorized from '../../pages/NotAuthorized';  // crie este

import { Layout } from '../../pages/Layout';
import { NotFound } from '../../pages/NotFound';
import { RequireAuth } from '../RequireAuth';

export function MainRouter() {
  return (
    <Routes>
      {/* rota pública de login */}
      <Route path="/login" element={<Login />} />

      {/* rota para “não autorizado” */}
      <Route path="/not-authorized" element={<NotAuthorized />} />

      {/* Agrupa todas as rotas que exigem autenticação */}
      <Route element={<RequireAuth />}>
        {/* Dentro desse guard, monta o Layout com Header/Sidebar */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="home" replace />} />

          {/* rota livre para quem estiver logado */}
          <Route path="home" element={<Home />} />

          {/* rota só para admins, por exemplo */}
          <Route
            path="banco-de-horas"
            element={<RequireAuth allowedRoles={['Admin']} />}
          >
            <Route index element={<BancoHoras />} />
          </Route>

          {/* rota aberta para todos logados */}
          <Route path="clientes" element={<div>Clientes</div>} />
          <Route path="grupos" element={<div>Grupos</div>} />
        </Route>
      </Route>

      {/* qualquer outra → 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
