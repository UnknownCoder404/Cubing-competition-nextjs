"use client";

import { useEffect, useState } from "react";
import { addToken } from "../utils/credentials";
import styles from "./AdvancedDashboard.module.css";
import { url } from "@/globals";

async function getFile(url: string): Promise<Blob> {
  if (!url) throw new Error("URL or fileName is not defined");
  const data = await fetch(url, {
    headers: addToken({}) || {},
  });
  const blob = await data.blob();
  return blob;
}

export default function Backup() {
  const [backup, setBackup] = useState<Blob | undefined>(undefined);
  useEffect(() => {
    const getAndSetBackup = async () => {
      const backupUrl = new URL(url);
      backupUrl.pathname = "backup";
      const backup = await getFile(backupUrl.toString());
      setBackup(backup);
    };
    getAndSetBackup();
  }, []);
  return (
    <div className={styles["backups-container"]}>
      <h2>Sigurnosna kopija</h2>
      <button
        onClick={() => {
          const url = window.URL.createObjectURL(backup!);

          const a = document.createElement("a");
          a.href = url;
          a.download = `Sigurnosna kopija - ${new Date().toLocaleDateString()}.zip`;

          document.body.appendChild(a);
          a.click();
        }}
        disabled={!backup}
        className={styles["backup-btn"]}
      >
        {backup ? "Sigurnosna kopija" : "Učitavanje..."}
      </button>
    </div>
  );
}
