import React from "react";
import styles from "../TopExpenses/TopExpenses.module.css";

export default function TopExpenses({ food, entertainment, travel }) {
  const getBarStyle = (percentage, color) => {
    return {
      backgroundColor: percentage > 0 ? color : "#ddd",
    };
  };

  return (
    <div className={styles.topTransaction}>
      <h2 className={styles.title}>Top Expenses</h2>
      <div className={styles.transationChart}>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <div>
              <p>Food:</p>
            </div>
            <div
              className={styles.barWrapper}
              style={getBarStyle(food, "#a020f0")}
            >
              <div
                className={styles.percentage}
                style={{
                  width: `${food}%`,
                }}
              ></div>
            </div>
          </li>

          <li className={styles.listItem}>
            <div>
              <p>Entertainment:</p>
            </div>
            <div
              className={styles.barWrapper}
              style={getBarStyle(entertainment, "#ff8c00")}
            >
              <div
                className={styles.percentage}
                style={{
                  width: `${entertainment}%`,
                }}
              ></div>
            </div>
          </li>

          <li className={styles.listItem}>
            <div>
              <p>Travel:</p>
            </div>
            <div
              className={styles.barWrapper}
              style={getBarStyle(travel, "#ffd700")}
            >
              <div
                className={styles.percentage}
                style={{
                  width: `${travel}%`,
                }}
              ></div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
