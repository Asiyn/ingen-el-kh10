"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";

export default function LoginPage() {
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [showPwd, setShowPwd] = useState(false);
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

        <div style={{ position: "relative", width: "100%", justifyContent: "start" }} className={styles.passwordInput}>
          <input
            id="pwd"
            type={showPwd ? "text" : "password"}
            placeholder="Skriv lösenord"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            style={{width: "87%"}}
            className={styles.passwordInput}
            required
          />

          <button
            type="button"
            onClick={() => setShowPwd((v) => !v)}
            style={{
              position: "absolute",
              right: "0rem",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              opacity: 0.7,
            }}
            className={styles.viewPWD}
            aria-label={showPwd ? "Dölj lösenord" : "Visa lösenord"}
          >
            {showPwd ? "🙈" : "👁️"}
          </button>
        </div>

        <label className={styles.stayRow}>
  <input
    type="checkbox"
    checked={remember}
    onChange={(e) => setRemember(e.target.checked)}
    className={styles.toggleSaveLogin}
  />
  <span style={{ fontSize: "0.9rem" }}>Förbli inloggad</span>
</label>

        {err && <p>{err}</p>}
        <button type="submit" className={styles.loginBtn}>Logga in</button>
      </form>
    </div>
  );
}
