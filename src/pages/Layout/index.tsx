// src/components/Layout/Layout.tsx
import React, { useState } from "react";
import { Outlet } from "react-router";

import styles from "./styles.module.css";
import { Header } from "../../compomnents/Header";
import Sidebar from "../../compomnents/Siderbar";

export function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className={styles.app}>
      <Header onToggleMobile={() => setMobileOpen(o => !o)} />
      <div className={styles.main}>
        <Sidebar
          collapsed={collapsed}
          mobileOpen={mobileOpen}
          onToggleCollapse={() => setCollapsed(c => !c)}
          onMobileClose={() => setMobileOpen(false)}
        />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
