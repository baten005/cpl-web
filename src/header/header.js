import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./header.css";
import  Sidebar  from "../sideBar/sideBar";

function Amar() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid" id="header_text">
          <button
            class="btn btn-success"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasWithBackdrop"
            aria-controls="offcanvasWithBackdrop"
            style={{width:"40px",
            height:"40px",
            padding:"0",
            textAlign:"center"
          
          }}
          >
            <i
              className="fas fa-bars"
              style={{
                color: "white",
                fontSize: "30px",
                marginLeft:"5px",
                borderRadius: "0",
                float:"inline-start"
                
                
              }}
            ></i>
          </button>

          <h1>CPL Admin Panel.</h1>
        </div>
      </nav>
      <Sidebar></Sidebar>
    </div>
  );
}

export { Amar };
