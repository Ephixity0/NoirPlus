import { useState, useEffect } from "react";
import styles from "@/styles/Settings.module.scss";

const LoginPage = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>();

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleDownload = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setDeferredPrompt(null);
      }
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
        <h1>Downloads</h1>
        <div className={styles.group2}>
          <h1>PWA</h1>
          <p>
            This will install the app for all devices with very low space and data.
          </p>
          <p>
            Download using Brave Browser or Chrome if you have an ad-blocker on the
            Chrome account, for an ad-free experience.
          </p>
          <p>If not downloading, refresh this page and try again.</p>
          {/* <p>To download movies/tv shows, go to its watch page, and use extensions like FetchV.</p> */}
          <h4
            className={styles.downloadButton}
            onClick={handleDownload}
            data-tooltip-id="tooltip"
            data-tooltip-content="Download PWA"
          >
            Download
          </h4>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
