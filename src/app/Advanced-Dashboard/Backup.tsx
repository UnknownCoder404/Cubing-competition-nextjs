"use client";

import { useEffect } from "react";
import { addToken } from "../utils/credentials";
import styles from "./AdvancedDashboard.module.css";
import { url } from "@/globals";
import { useQuery } from "react-query";

async function getFile(url: string): Promise<Blob> {
  if (!url) throw new Error("URL or fileName is not defined");
  const data = await fetch(url, {
    headers: addToken({}) || {},
  });
  const blob = await data.blob();
  return blob;
}

export default function Backup() {
  const {
    data: backup,
    isLoading,
    refetch,
  } = useQuery(
    ["backup"],
    async () => {
      const backupUrl = new URL(url);
      backupUrl.pathname = "backup";
      return await getFile(backupUrl.toString());
    },
    { enabled: false },
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className={styles["backups-container"]}>
      <h2>Sigurnosna kopija</h2>
      <button
        onClick={() => {
          if (!backup) return;
          const url = window.URL.createObjectURL(backup);

          const a = document.createElement("a");
          a.href = url;
          a.download = `Sigurnosna kopija - ${new Date().toLocaleDateString()}.zip`;

          document.body.appendChild(a);
          a.click();
        }}
        disabled={isLoading}
        className={styles["backup-btn"]}
      >
        {isLoading ? "Učitavanje..." : "Sigurnosna kopija"}
      </button>
    </div>
  );
}
