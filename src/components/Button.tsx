import styles from '../styles/Button.module.scss'

const Button = ({ count, desc, icon }: { count: number, desc: string, icon: string }) => {
  return <button className={styles.wrapper}>
    <div className={styles.iconWrapper}>
      <span className="material-icons">{ icon }</span>
    </div>
    <span className={styles.description}>{desc}</span>
    <span className={styles.count}>{count}</span>
  </button>;
};

export default Button;
