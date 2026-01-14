"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";

export default function LoginPage() {
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [remember, setRemember] = useState(false);
  const [err, setErr] = useState("");
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, pwd, remember }),
    });

    if (res.ok) router.push("/");
    else setErr("Fel användarnamn eller lösenord");
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Logga in</h1>

      <form className={styles.loginContainer} onSubmit={onSubmit}>
        <label htmlFor="user">Användarnamn</label>
        <input
          id="user"
          type="text"
          placeholder="Skriv användarnamn"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          required
        />

        <label htmlFor="pwd">Lösenord</label>
        <input
          id="pwd"
          type="password"
          placeholder="Skriv lösenord"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          required
        />

        <label style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className={styles.stayLogged}
          />
          Förbli inloggad
        </label>

        {err && <p>{err}</p>}
        <button type="submit">Logga in</button>
      </form>
    </div>
  );
}
