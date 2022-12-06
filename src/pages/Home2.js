import "../asset/styles/Home2.css";
import baro from "../asset/img/baro.svg";
import React, { useState } from "react";

const Home2 = () => {
  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  let months = [
    "",
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayp",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const [opcion, setOpcion] = useState(0);
  const project = () => {
    switch (opcion) {
      case 0:
        return;
      case 1:
        return;
      default:
        return <h1>No project match</h1>;
    }
  };

  return (
    <div className="aux-container d-none d-md-block">
      <div className="container-Home2">
        <div className="aux-header-container">
          <header className="container-header">
            <div>
              <div className="date">

              </div>
              <div className="location">

              </div>
              <div className="estate">

              </div>
              <h3>Sabado</h3>
              <h3>{day + " " + months[month] + "2022"}</h3>
            </div>
          </header>
        </div>

        <main className="container-main-Home2 ">
          <div className="card-variables slide-in-bottom-1">
            <div className="card-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                class="bi bi-thermometer-half"
                viewBox="0 0 16 16"
              >
                <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415z" />
                <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0V2.5zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1z" />
              </svg>
            </div>
            <div className="card-info"></div>
            <div className="card-button"></div>
          </div>

          <div className="card-variables slide-in-bottom-2">
            <div className="card-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                class="bi bi-droplet-half"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.21.8C7.69.295 8 0 8 0c.109.363.234.708.371 1.038.812 1.946 2.073 3.35 3.197 4.6C12.878 7.096 14 8.345 14 10a6 6 0 0 1-12 0C2 6.668 5.58 2.517 7.21.8zm.413 1.021A31.25 31.25 0 0 0 5.794 3.99c-.726.95-1.436 2.008-1.96 3.07C3.304 8.133 3 9.138 3 10c0 0 2.5 1.5 5 .5s5-.5 5-.5c0-1.201-.796-2.157-2.181-3.7l-.03-.032C9.75 5.11 8.5 3.72 7.623 1.82z"
                />
                <path
                  fill-rule="evenodd"
                  d="M4.553 7.776c.82-1.641 1.717-2.753 2.093-3.13l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448z"
                />
              </svg>
            </div>
            <div className="card-info"></div>
            <div className="card-button"></div>
          </div>

          <div className="card-variables slide-in-bottom-3">
            <div className="card-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                class="bi bi-sun"
                viewBox="0 0 16 16"
              >
                <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
              </svg>
            </div>
            <div className="card-info"></div>
            <div className="card-button"></div>
          </div>

          <div className="card-variables slide-in-bottom-4">
            <div className="card-icon">
              <img src={baro}></img>
            </div>
            <div className="card-info"></div>
            <div className="card-button"></div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home2;
