import React, { useState } from "react";
import styles from "../walletBalance/walletBalance.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function WalletBalance({
  walletAmount,
  setOpen,
  setWalletAmount,
}) {
  return (
    <section className={styles.walletBalance}>
      <div className={styles.balanceColumn}>
        <h3 className={`h3 ${styles.title}`}>
          <span>Wallet Balance</span>
          <span className={styles.amount}>
            <FontAwesomeIcon
              icon={faIndianRupeeSign}
              style={{
                fontSize: "20px",
              }}
            />
            {walletAmount}
          </span>
        </h3>
        <button
          data-testid="add-income-button"
          onClick={() => setOpen(true)}
          className={`button ${styles.walletBtn}`}
        >
          + Add Income
        </button>
      </div>
    </section>
  );
}
