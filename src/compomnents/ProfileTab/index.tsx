// src/components/Layout/ProfileTab/ProfileTab.tsx
import React from "react";
import styles from "./styles.module.css";

export interface ProfileTabProps {
  name?: string;
  role?: string;
  avatarUrl?: string;
  collapsed?: boolean;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({
  name = "Nicolas Ferreira",
  role = "desenvolvedor",
  avatarUrl,
  collapsed = false,
}) => {
  return (
    <div
      className={`${styles.profileTab} ${
        collapsed ? styles.collapsed : ""
      }`}
    >
      <div className={styles.avatar}>
        {avatarUrl ? (
          <img src={avatarUrl} alt={`${name} avatar`} />
        ) : (
          <div className={styles.placeholder} />
        )}
      </div>
      <div className={styles.info}>
        <span className={styles.name}>{name}</span>
        <span className={styles.role}>{role}</span>
      </div>
    </div>
  );
};

export default ProfileTab;
