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
    const modal_form = document.getElementById("add-payment-form");
    const modal = document.getElementById("add-payment-modal");
    modal.style.display = "block";
    modal_form.classList.add("fade-in");
  };

  const header = () => {
    if (props.location === "/main/dashboard") {
      return (
        <span id="content-page-name">
          <h1>Dashboard</h1>
        </span>
      );
    } else if (props.location === "/main/activity") {
      return (
        <span id="content-page-name">
          <h1>Recent Activity</h1>
        </span>
      );
    } else if (props.location === "/main/all") {
      return (
        <span id="content-page-name">
          <h1>All expenses</h1>
        </span>
      );
    } else {
      return (
        <span id="content-page-name">
          <img src={window.staticImages.avatar} />
          <h1>{props.friendName}</h1>
        </span>
      );
    }
  }

  return (
    <div className="content-header">
      {header()}
      <span id="content-btns">
        <Link id="add-bill-btn" to="/" onClick={handleAddBill}>Add Bill</Link>
        <Link id="settle-up-btn" to="/" onClick={handleSettleUp}>Settle Up</Link>
      </span>
    </div>
  );
};
