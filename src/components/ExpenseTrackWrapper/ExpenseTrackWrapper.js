import React, { useState, useEffect } from "react";
import styles from "../ExpenseTrackWrapper/ExpenseTrackWrapper.module.css";
import WalletBalance from "../walletBalance/walletBalance";
import RecentTransaction from "../RecentTransaction/RecentTransaction";
import ExpensePieChart from "../ExpensePieChart/ExpensePieChart";
import Expenses from "../Expenses/Expenses";
import TopExpenses from "../TopExpenses/TopExpences";

export default function ExpenseTrackWrapper() {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("walletAmount") === null) {
      localStorage.setItem("walletAmount", JSON.stringify(5000));
    }
    if (localStorage.getItem("expenses") === null) {
      localStorage.setItem("expenses", JSON.stringify([])); 
    }
    if (localStorage.getItem("totalExpenses") === null) {
      localStorage.setItem("totalExpenses", JSON.stringify(0));
    }
  }

  const [walletAmount, setWalletAmount] = useState(() => {
    const saved = localStorage.getItem("walletAmount");
    return saved ? JSON.parse(saved) : 5000;
  });

  const [expensesList, setExpensesList] = useState(() => {
    const saved = localStorage.getItem("expenses"); 
    return saved ? JSON.parse(saved) : [];
  });

  const [open, setOpen] = useState(false);
  const [amountInput, setAmountInput] = useState("");

  const [totalExpenses, setTotalExpenses] = useState(
    () => JSON.parse(localStorage.getItem("totalExpenses")) || 0
  );
  const [OpenExpenses, setOpenExpenses] = useState(false);

  const [expenseTitle, setExpenseTitle] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("food");
  const [expenseDate, setExpenseDate] = useState("");

  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("walletAmount", JSON.stringify(walletAmount));
  }, [walletAmount]);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expensesList)); 
    const total = expensesList.reduce(
      (sum, item) => sum + Number(item.amount),
      0
    );
    setTotalExpenses(total);
    localStorage.setItem("totalExpenses", JSON.stringify(total));
  }, [expensesList]);

  const handleAddBalance = (e) => {
    e.preventDefault();
    const amount = parseFloat(amountInput);
    if (!isNaN(amount) && amount > 0) {
      setWalletAmount((prev) => prev + amount);
      setAmountInput("");
      setOpen(false);
    }
  };

  const handleAddExpenses = (e) => {
    e.preventDefault();
    const amount = Number(expenseAmount);

    if (!expenseTitle || isNaN(amount) || amount <= 0 || !expenseDate) {
      alert("Please fill all fields correctly.");
      return;
    }

    if (!isEditMode && amount > walletAmount) {
      alert("Insufficient wallet balance to add this expense.");
      return;
    }

    if (isEditMode) {
      const oldAmount = Number(expensesList[editIndex].amount);
      const difference = amount - oldAmount;

      if (difference > walletAmount) {
        alert("Insufficient wallet balance to edit this expense.");
        return;
      }

      const updatedList = [...expensesList];
      updatedList[editIndex] = {
        ...updatedList[editIndex],
        category: expenseCategory,
        title: expenseTitle,
        amount,
        date: expenseDate,
      };
      setExpensesList(updatedList);
      setWalletAmount((prev) => prev - difference);
      setIsEditMode(false);
      setEditIndex(null);
    } else {
      const newExpense = {
        id: Date.now(),
        category: expenseCategory,
        title: expenseTitle,
        amount,
        date: expenseDate,
      };
      setExpensesList([...expensesList, newExpense]);
      setWalletAmount((prev) => prev - amount);
    }

    setExpenseTitle("");
    setExpenseAmount("");
    setExpenseCategory("food");
    setExpenseDate("");
    setOpenExpenses(false);
  };

  const handleEditExpense = (index) => {
    const expenseToEdit = expensesList[index];
    setExpenseTitle(expenseToEdit.title);
    setExpenseAmount(expenseToEdit.amount);
    setExpenseCategory(expenseToEdit.category);
    setExpenseDate(expenseToEdit.date);

    setIsEditMode(true);
    setEditIndex(index);
    setOpenExpenses(true);
  };

  const handleDeleteExpense = (indexToDelete) => {
    const deletedItem = expensesList[indexToDelete];
    if (!deletedItem) return;

    setExpensesList((prev) => prev.filter((_, i) => i !== indexToDelete));
    setWalletAmount((prev) => prev + Number(deletedItem.amount));
  };

  const categoryTotals = expensesList.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + Number(curr.amount);
    return acc;
  }, {});

  const foodPercentage = walletAmount
    ? ((categoryTotals.food || 0) / walletAmount) * 100
    : 0;

  const entertainmentPercentage = walletAmount
    ? ((categoryTotals.entertainment || 0) / walletAmount) * 100
    : 0;

  const travelPercentage = walletAmount
    ? ((categoryTotals.travel || 0) / walletAmount) * 100
    : 0;

  return (
    <section className={styles.expenseSection}>
      <div className={styles.container}>
        <h1 data-testid="main-heading" className={styles.title}>
          Expense Tracker
        </h1>
        <div className={styles.expenseBox}>
          <div className={styles.detailBox}>
            <WalletBalance
              setWalletAmount={setWalletAmount}
              walletAmount={walletAmount}
              setOpen={setOpen}
            />
          </div>
          <div className={styles.detailBox}>
            <Expenses
              expenses={totalExpenses}
              setOpenExpenses={setOpenExpenses}
            />
          </div>
          <div className={styles.categoryContainer}>
            <ExpensePieChart categoryTotals={categoryTotals} />
            <div className={styles.cateroryListitem}>
              <span className={`${styles.category} ${styles.food}`}>
                <span className={styles.box}></span>Food
              </span>
              <span className={`${styles.category} ${styles.entertainment}`}>
                <span className={styles.box}></span>Entertainment
              </span>
              <span className={`${styles.category} ${styles.travel}`}>
                <span className={styles.box}></span>Travel
              </span>
            </div>
          </div>
        </div>

        <div className={styles.ExpensesDetails}>
          <RecentTransaction
            expensesList={expensesList}
            handleDeleteExpense={handleDeleteExpense}
            handleEditExpense={handleEditExpense}
          />
          <TopExpenses
            food={foodPercentage}
            entertainment={entertainmentPercentage}
            travel={travelPercentage}
          />
        </div>
      </div>

      {open && (
        <div className={styles.addBalanceBox}>
          <form className={styles.addBalanceform} onSubmit={handleAddBalance}>
            <h3>Add Balance</h3>
            <input
              type="number"
              placeholder="Income Amount"
              data-testid="income-input"
              className={`inputField ${styles.inputField}`}
              value={amountInput}
              onChange={(e) => setAmountInput(e.target.value)}
            />
            <button type="submit" className="button orange">
              Add Balance
            </button>
            <button
              type="button"
              className="button gray"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {OpenExpenses && (
        <div className={styles.addBalanceBox}>
          <form className={styles.addBalanceform} onSubmit={handleAddExpenses}>
            <h3>{isEditMode ? "Edit Expense" : "Add Expense"}</h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}
            >
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={expenseTitle}
                onChange={(e) => setExpenseTitle(e.target.value)}
                className={`inputField ${styles.inputField}`}
              />
              <input
                type="number"
                name="price"
                placeholder="Amount"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
                className={`inputField ${styles.inputField}`}
              />
              <select
                name="category"
                value={expenseCategory}
                onChange={(e) => setExpenseCategory(e.target.value)}
                className={`inputField ${styles.inputField}`}
              >
                <option value="food">Food</option>
                <option value="entertainment">Entertainment</option>
                <option value="travel">Travel</option>
              </select>
              <input
                type="date"
                name="date"
                value={expenseDate}
                onChange={(e) => setExpenseDate(e.target.value)}
                className={`inputField ${styles.inputField}`}
              />
            </div>
            <div style={{ marginTop: "20px" }}>
              <button type="submit" className="button orange">
                {isEditMode ? "Update Expense" : "Add Expense"}
              </button>
              <button
                type="button"
                className="button gray"
                onClick={() => {
                  setOpenExpenses(false);
                  setIsEditMode(false);
                  setEditIndex(null);
                  setExpenseTitle("");
                  setExpenseAmount("");
                  setExpenseCategory("food");
                  setExpenseDate("");
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}
