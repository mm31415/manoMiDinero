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

  return (
    <div className="content-header">
      <h1>Hey Guy this is the main header</h1>
      <Link to="/" onClick={handleAddBill}>Add Bill</Link>
      <Link to="/" onClick={handleSettleUp}>Settle Up</Link>
    </div>
  );
};
