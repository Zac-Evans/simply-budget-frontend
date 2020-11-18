import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css"

// Todo: Login/Logout Button
// Navigation Links
// // User account control
// Logo

// categories budgets purchases user_settings

const PageHeader = () => (
<div class="navbar navbar-expand-lg navbar-dark bg-dark ">
<div class="flex-row d-flex justify-content-between align-items-center">
    <img src="https://www.freelogodesign.org/file/app/client/thumb/ffd6f41f-b835-40e8-aa8a-286a98d9f197_200x200.png?1605370896563"></img>
<div class="align-center">
    <a class="navbar-brand" href="">Categories </a>
    <a class="navbar-brand" href="">Budgets </a>
    <a class="navbar-brand" href="">Purchases </a>
    <a class="navbar-brand" href="">User Settings </a>
</div>

<div>
    <a href="sign-in.html" class="btn btn-secondary sign-up-btn">Sign Out</a></div>   


 </div>

</div>
)

export default PageHeader;