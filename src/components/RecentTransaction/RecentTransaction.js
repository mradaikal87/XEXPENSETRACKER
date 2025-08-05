import React, { useState } from "react";
import styles from "../RecentTransaction/RecentTransaction.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faCircleXmark,
  faFilm,
  faPencil,
  faPizzaSlice,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

export default function RecentTransaction({
  expensesList,
  handleDeleteExpense,
  handleEditExpense,
}) {
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(expensesList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = expensesList.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case "food":
        return faPizzaSlice;
      case "entertainment":
        return faFilm;
      case "travel":
        return faCar;
      default:
        return faPencil;
    }
  };
  return (
    <div className={styles.recenttransation}>
      <h2 className={styles.title}>Recent Transactions</h2>

      <div className={styles.transactionList}>
        {currentItems.length > 0 ? (
          <div className={styles.expenseList}>
            {currentItems.map((expense, index) => (
              <div className={styles.expenseItem} key={expense.id}>
                <div className={styles.left}>
                  <div className={styles.iconCircle}>
                    <FontAwesomeIcon
                      className={styles.categoryIcon}
                      icon={getCategoryIcon(expense.category)}
                      style={{ fontSize: "24px" }}
                    />
                  </div>
                  <div>
                    <div className={styles.category}>{expense.title}</div>
                    {/* <div className={styles.category}>
                      {expense.category.charAt(0).toUpperCase() +
                        expense.category.slice(1)}
                    </div> */}
                    <div className={styles.date}>
                      {new Date(expense.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </div>
                <div className={styles.right}>
                  <div className={styles.amount}>₹{expense.amount}</div>
                  <button
                    className={`${styles.iconButton} ${styles.delete} red`}
                    onClick={() => handleDeleteExpense(startIndex + index)}
                  >
                    <FontAwesomeIcon
                      icon={faCircleXmark}
                      style={{ fontSize: "17px" }}
                    />
                  </button>
                  <button
                    className={`${styles.iconButton} ${styles.edit} orange`}
                    onClick={() => handleEditExpense(startIndex + index)}
                  >
                    <FontAwesomeIcon
                      icon={faPencil}
                      style={{ fontSize: "17px" }}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No transactions available.</p>
        )}
      </div>

      {/* Pagination Controls */}
      {expensesList.length > itemsPerPage && (
        <div className={styles.paginationControls}>
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={styles.pageButton}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <span className={styles.pageNumber}>{currentPage}</span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={styles.pageButton}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      )}
    </div>
  );
}
