"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [date, setDate] = useState("");
  const [time1, setTime1] = useState("");
  const [time2, setTime2] = useState("");
  const [comment, setComment] = useState("");

  const [toast, setToast] = useState<null | { type: "ok" | "err"; text: string }>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  function showToast(type: "ok" | "err", text: string) {
    setToast({ type, text });
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setToast(null), 2400);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date, time1, time2, comment }),
    });

    if (res.ok) {
      // reset inputs
      setDate("");
      setTime1("");
      setTime2("");
      setComment("");
      showToast("ok", "Skickat ✅");
    } else {
      showToast("err", "Något gick fel ❌");
    }
  }

  return (
    <div className={styles.container}>
      {/* Toast */}
      <div
        className={`${styles.toast} ${toast ? styles.toastShow : ""} ${
          toast?.type === "ok" ? styles.toastOk : styles.toastErr
        }`}
        role="status"
        aria-live="polite"
      >
        {toast?.text ?? ""}
      </div>

      <h1 className={styles.title}>KH10 elen har gått</h1>
      <h2>Rapportera in</h2>

      <form className={styles.loginContainer} onSubmit={submit}>
        <label htmlFor="date">Datum</label>
        <input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />

        <label htmlFor="time1">Tid</label>
        <input id="time1" type="time" value={time1} onChange={(e) => setTime1(e.target.value)} required />

        <label htmlFor="time2">Sluttid (optional)</label>
        <input id="time2" type="time" value={time2} onChange={(e) => setTime2(e.target.value)} />

        <label htmlFor="comment">Kommentar</label>
        <input
          id="comment"
          type="text"
          placeholder="t.ex. nån gång under natten"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button className={styles.loginBtn} type="submit">
          Skicka
        </button>
      </form>
    </div>
  );
}
