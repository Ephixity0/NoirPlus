import React, { useState, useEffect } from "react";
import styles from "@/styles/Settings.module.scss";
import Link from "next/link";
import { signupUser Manual } from "@/Utils/firebaseUser ";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { push } = useRouter();

  const handleFormSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (await signupUser Manual({ username, email, password })) {
      push("/settings");
    }
  };

  return (
    <div className={`${styles.settingsPage} ${styles.authPage}`}>
      <div className={styles.logo}>
        <img
          src="/images/63d168593f214df1ae64b04babe19c89-free.png" // Updated logo image
          alt="Noir+ Logo" // Updated alt text
        />
        <p>Noir+</p> {/* Updated text */}
      </div>
      <div className={styles.settings}>
        <h1>Signup</h1>
        <div className={styles.group2}>
          <form onSubmit={handleFormSubmission}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
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
            <button type="submit">Submit</button> {/* Changed to type="submit" */}
          </form>
        </div>
        <h4>
          Already a Noir+ member!{" "}
          <Link href="/login" className={styles.highlight}>
            Login
          </Link>
        </h4>
      </div>
    </div>
  );
};

export default SignupPage;
