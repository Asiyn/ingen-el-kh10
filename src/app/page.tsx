import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>KH10 elen har gått</h1>

      <div className={styles.loginContainer}>
        <label htmlFor="user">Användarnamn</label>
        <input
          type="text"
          placeholder="Skriv användarnamn"
          name="user"
          required
        />

        <label htmlFor="pwd">Lösenord</label>
        <input
          type="password"
          placeholder="Skriv lösenord"
          name="pwd"
          required
        />
      </div>
    </div>
  );
}
