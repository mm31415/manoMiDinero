import React from "react";
import { Link } from "react-router-dom";

export const ContentHeader = (props) => {
  const handleAddBill = (e) => {
    e.preventDefault();
    const modal_form = document.getElementById("add-bill-form");
    const modal = document.getElementById("add-bill-modal");
    modal.style.display = "block";
    modal_form.classList.add("fade-in");
  };

  const handleSettleUp = (e) => {
    e.preventDefault();
    // const modal_form = document.getElementById("add-bill-form");
    // const modal = document.getElementById("add-bill-modal");
    // modal.style.display = "block";
    // modal_form.classList.add("fade-in");
  };

  const header = () => {
    if (props.location === "/main/dashboard") {
      return "Dashboard";
    } else if (props.location === "/main/activity") {
      return "Recent activity";
    } else if (props.location === "/main/all") {
      return "All expenses";
    } else {
      return "Friend Name";
    }
  }

  return (
    <div className="content-header">
      <h1>{header()}</h1>
      <Link to="/" onClick={handleAddBill}>Add Bill</Link>
      <Link to="/" onClick={handleSettleUp}>Settle Up</Link>
    </div>
  );
};
