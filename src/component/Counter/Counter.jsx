import React from 'react';
import styles from './Counter.module.css';

export default function Counter() {
  return <React.Fragment>
    <div className={styles.counter}>  Counter Component </div>
    <div className={styles.counter}>  Render from : {(typeof window !== 'undefined') ? 'Client' : 'Server'}</div>
    <div className={styles.counter}>  Environemnt : {process.env.NODE_ENV}</div>
  </React.Fragment>;
}
