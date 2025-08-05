import React from "react";
import styles from "../Expenses/Expenses.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Expenses({ expenses, setOpenExpenses }) {
  return (
    <section className={styles.Expenses}>
      <div className={styles.ExpensesColumn}>
        <h3 className={`h3 ${styles.title}`}>
          <span>Expenses</span>
          <span className={styles.amount}>
            <FontAwesomeIcon
              icon={faIndianRupeeSign}
              style={{ fontSize: "20px" }}
            />
            {expenses}
          </span>
        </h3>
        <button
          onClick={() => setOpenExpenses(true)}
          className={`button red ${styles.walletBtn}`}
        >
          + Add Expense
        </button>
      </div>
    </section>
  );
}
