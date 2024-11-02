import styles from "@/styles/Settings.module.scss";

const Disclaimer = () => {
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
        <h1>Disclaimer</h1>
        <div className={styles.group2}>
          <p>
            Noir+ does not host any files; it merely links to 3rd party services.
          </p>
          <p>
            Legal issues should be taken up with the file hosts and providers.
          </p>
          <p>
            Noir+ is not responsible for any media files shown by the video
            providers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
