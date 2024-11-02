import React, { useState } from "react";
import styles from "@/styles/Settings.module.scss";
import Link from "next/link";
import { loginUserGoogle, loginUserManual } from "@/Utils/firebaseUser"; // Fixed import
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { push } = useRouter();

  const handleFormSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await loginUserManual({ email, password })) {
      push("/settings");
    }
  };

  const handleGoogleSignIn = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (await loginUserGoogle()) {
      push("/settings");
    }
  };

  return (
    <div className={`${styles.settingsPage} ${styles.authPage}`}>
      <div className={styles.logo}>
        <img
          src="/images/63d168593f214df1ae64b04babe19c89-free.png"
          alt="Noir+ Logo"
          data-tooltip-id="tooltip"
          data-tooltip-content="Noir+"
        />
        <p>Your Personal Streaming Oasis</p>
      </div>
      <div className={styles.settings}>
        <h1>Login</h1>
        <div className={styles.group2}>
          <>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button onClick={handleFormSubmission}>Submit</button>
          </>
        </div>
        <h4 className={styles.signin} onClick={handleGoogleSignIn}>
          Sign in with <span className={styles.highlight}>Google</span>
        </h4>
        <h4>
          Become a Noir+ member!{" "}
          <Link href="/signup" className={styles.highlight}>
            Signup
          </Link>
        </h4>
      </div>
    </div>
  );
};

export default LoginPage;
