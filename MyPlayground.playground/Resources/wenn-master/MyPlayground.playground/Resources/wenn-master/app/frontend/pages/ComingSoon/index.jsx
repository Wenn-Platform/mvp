import React from 'react';
import styles from './styles.module.scss';
import artboardBackgroundSrc from '../../../assets/images/artboard-background.png';

const ComingSoon = () => {
return <div className={styles.wrapper}>
    <h1 className={`brand-font ${styles.header}`}>Coming soon...</h1>
    <div className={styles.animatedClipart}>
      <img className={styles.artboardBackground} src={artboardBackgroundSrc} />
      <iframe style={{border: 'none'}} width="600" height="600" src="https://rive.app/s/NBqL028fpUeaq9HQreZmWg/embed" allowFullScreen=""></iframe>
    </div>
  </div>
}

export default ComingSoon;