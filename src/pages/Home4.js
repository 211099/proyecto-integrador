import "../asset/styles/Home4.css";
import AnyChart from "anychart-react";
import anychart from "anychart";
import React, { useState, useEffect } from "react";

 


const Home4 = () => {

  
 

  const message = () => {
    fetch(
      `https://api.telegram.org/bot5811861089:AAGO5USZn0bx1VxlaLPyA7dCwTKXbPdqqYI/sendMessage?chat_id=-1001736949798&text=${"hace mucho firo pa brigate"}`,
      { method: "GET" }
    ).then(
      (sucess) => {
        console.log(sucess);
      },
      (error) => {
        console.log(Error);
      }
    );
  };

  let data = anychart.data.set([
    ["01:00", 14, 50],
    ["02:00", 23, 50],
    ["04:00", 11, 50],
    ["05:00", 39, 50],
    ["06:00", 8, 50],
    ["07:00", 10, 50],
    ["08:00", 10, 50],
    ["09:00", 23, 50],
    ["10:00", 76, 50],
    ["11:00", 0, 50],
    ["12:00", 0, 50],
    ["13:00", 0, 50],
    ["14:00", 22, 50],
    ["15:00", 23, 50],
    ["16:00", 11, 50],
    ["17:00", 1, 50],
    ["18:00", 14, 50],
    ["19:00", 0, 50],
    ["20:00", 19, 50],
    ["21:00", 10, 50],
    ["22:00", 0, 50],
    ["23:00", 0, 50],
    ["24:00", 10, 50],
    ["24:00", 11, 50],
  ]);
  let error = anychart.column();
  var Humedad = data.mapAs({ x: 0, value: 1 });

  let series1 = error.column(Humedad);
  series1.error().valueLowerError(1);
  series1.error().valueUpperError(1);

  return (
    <div className="container-fluid g-0 pb-5">
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container">
          <a className="navbar-brand" href="/">
            FireApp
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ms-auto">
              <a
                className=""
                href="t.me/Estationbot"
                target="_blank"
                data-bs-toggle="modal"
                data-bs-target="#signinModal"
              >
                aaa
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div className="row g-0 px-5">
        <header className="col-12 header my-3">
          <div className="row g-0 h-100 p-2">
            <div className="col-12 col-md-6">
              <h1 className="text-center">ESTACION METEOROLOGICA</h1>
              <h5 className="text-center">Saturday</h5>
              <h5 className="text-center">04 de noviembre del 2022</h5>
              <h5 className="text-center">Suchiapa Chiapas</h5>
            </div>
            <div className="col-12 col-md-6  d-flex justify-content-center align-items-center">
              <iframe
                className="w-100 mapa"
                title="myFrame"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2479.0474683336033!2d-93.09009737324462!3d16.616021661575694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ed29faf70c283b%3A0xff57a2e3d9c9bd10!2sUniversidad%20Polit%C3%A9cnica%20de%20Chiapas!5e0!3m2!1ses!2smx!4v1670177527668!5m2!1ses!2smx"
              ></iframe>
            </div>
          </div>
        </header>

        <div className="col-12 card mt-4 slide-in-bottom-1 ">
          <div className="row g-0 h-100">
            <div className="col-2  icon pt-1 d-flex justify-content-center align-items-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-droplet-half"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21.8C7.69.295 8 0 8 0c.109.363.234.708.371 1.038.812 1.946 2.073 3.35 3.197 4.6C12.878 7.096 14 8.345 14 10a6 6 0 0 1-12 0C2 6.668 5.58 2.517 7.21.8zm.413 1.021A31.25 31.25 0 0 0 5.794 3.99c-.726.95-1.436 2.008-1.96 3.07C3.304 8.133 3 9.138 3 10c0 0 2.5 1.5 5 .5s5-.5 5-.5c0-1.201-.796-2.157-2.181-3.7l-.03-.032C9.75 5.11 8.5 3.72 7.623 1.82z"
                />
                <path
                  fillRule="evenodd"
                  d="M4.553 7.776c.82-1.641 1.717-2.753 2.093-3.13l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448z"
                />
              </svg>
            </div>
            <div className="col-12 col-md-8 info  d-flex justify-content-center align-items-center flex-column">
              <h3 className="text-center">Temperatura</h3>
              <h5 className="text-center  m-0">32h</h5>
            </div>
            <div className="col-md-2 butt d-flex justify-content-center align-items-center py-2 py-md-0">
              <button
                className="btn btn-primary"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                Grafica
              </button>
            </div>
          </div>
        </div>

        <div className="collapse mt-2" id="collapseExample">
          <div className="card card-body overflow-auto">
            <AnyChart
              instance={error}
              id="firstdChart"
              width={900}
              height={300}
              charts={[data]}
              title="HUMEDAD"
            />
          </div>
        </div>

        <div className="col-12 card mt-4 slide-in-bottom-2">
          <div className="row g-0 h-100">
            <div className="col-2  icon pt-1 d-flex justify-content-center align-items-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                fill="currentColor"
                className="bi bi-thermometer-half"
                viewBox="0 0 16 16"
              >
                <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415z" />
                <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0V2.5zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1z" />
              </svg>
            </div>
            <div className="col-12 col-md-8 info  d-flex justify-content-center align-items-center flex-column">
              <h3 className="text-center">Humedad</h3>
              <h5 className="text-center  m-0">32h</h5>
            </div>
            <div className="col-md-2 butt d-flex justify-content-center align-items-center py-2 py-md-0">
              <button type="button" className="btn btn-primary">
                Grafica
              </button>
            </div>
          </div>
        </div>

        <div className="col-12 card mt-4 slide-in-bottom-3">
          <div className="row g-0 h-100">
            <div className="col-2  icon pt-1 d-flex justify-content-center align-items-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-sun"
                viewBox="0 0 16 16"
              >
                <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
              </svg>
            </div>
            <div className="col-12 col-md-8 info  d-flex justify-content-center align-items-center flex-column">
              <h3 className="text-center">Indice de rayos UV</h3>
              <h5 className="text-center  m-0">32h</h5>
            </div>
            <div className="col-md-2 butt d-flex justify-content-center align-items-center py-2 py-md-0">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  message();
                }}
              >
                menssage
              </button>
            </div>
          </div>
        </div>

        <div className="col-12 card mt-4 slide-in-bottom-4">
          <div className="row g-0 h-100">
            <div className="col-2  icon pt-1 d-flex justify-content-center align-items-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                fill="currentColor"
                className="bi bi-thermometer-half"
                viewBox="0 0 16 16"
              >
                <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415z" />
                <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0V2.5zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1z" />
              </svg>
            </div>
            <div className="col-12 col-md-8 info  d-flex justify-content-center align-items-center flex-column">
              <h3 className="text-center">Humedad</h3>
              <h5 className="text-center  m-0">32h</h5>
            </div>
            <div className="col-md-2 butt d-flex justify-content-center align-items-center py-2 py-md-0">
                <button type="button" className="btn btn-primary" onClick={() => {insert()}}>
                  Grafica
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home4;
