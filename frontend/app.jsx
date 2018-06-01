import React from "react";
import SignUpFormContainer from "./components/session/signup_form_container";
import LoginFormContainer from "./components/session/login_form_container";
import HeaderContainer from "./components/header/header_container";
import HomepageContainer from "./components/homepage/homepage_container";
import FriendModalContainer from "./components/friend/friend_modal_container";
import CreateBillContainer from "./components/bill/create_bill_container";
import PaymentContainer from "./components/payment/payment_container";
import MainContentContainer from "./components/main_content/main_content_container";
import { Route } from "react-router-dom";

export const App = () => {
  return (
    <div>
      <Route path="/" component={FriendModalContainer} />
      <Route path="/" component={CreateBillContainer} />
      <Route path="/" component={PaymentContainer} />
      <Route path="/" component={HeaderContainer} />

      <Route path="/" exact component={HomepageContainer} />
      <Route path="/main" component={MainContentContainer} />
      <Route path="/signup" exact component={SignUpFormContainer} />
      <Route path="/login" exact component={LoginFormContainer} />
    </div>
  );
};
