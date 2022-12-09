import "../asset/styles/Home4.css";
import AnyChart from "anychart-react";
import anychart from "anychart";
import React, { useState, useEffect } from "react";

const Home4 = () => {
  const [temperatura1, SetTempera1] = useState(0);
  const [lluvia1, SetLluvia1] = useState(0);
  const [humedad1, SetHumedad1] = useState(0);
  const [presionA1, SetPresionA1] = useState(0);
  const [metros1, setMetros1] = useState(0);
  const [rayosUv1, setRayosUv1] = useState(0);
  const [fotoResistencia1, setFotoResistencia1] = useState(0);
  const [intervalId, setIntervalID] = useState(0);
  const [intervalId1, setIntervalID1] = useState(0);
  const [estadosol, setEstadoSol] = useState("");
  let stage1 = anychart.graphics.create();

  const handleActive = () => {
    const newintervalId = setInterval(() => {
      peticonFechFire();
      EstadeSol();
      message();
    }, 5000);
    setIntervalID(newintervalId);
  };

  const handleActive2 = () => {
    const newintervalId = setInterval(() => {
      datosFech();
    }, 310000);
    setIntervalID1(newintervalId);
  };

  const peticonFechFire = async () => {
    const response = await fetch(
      "https://aaaa-f8429-default-rtdb.firebaseio.com/.json?print=pretty"
    );
    const data = await response.json();

    SetTempera1(data.test.temperatura);
    SetLluvia1(data.test.lluvia);
    SetHumedad1(data.test.humedad);
    SetPresionA1(data.test.presionA);
    setMetros1(data.test.metros);
    setRayosUv1(data.test.rayosUv);
    setFotoResistencia1(data.test.fotoResistencia);
  };

  const [temperaturaG, SetTempera1G] = useState(0);
  const [lluviaG, SetLluvia1G] = useState(0);
  const [humedadG, SetHumedad1G] = useState(0);
  const [presionAG, SetPresionA1G] = useState(0);
  const [rayosUvG, SetRayosUv1G] = useState(0);
  const [fotoResistenciaG, SetFotoResistencia1G] = useState(0);

  const datosFech = async () => {
    const response = await fetch("https://tecenv.3utilities.com/api/data/view");
    const data = await response.json();

    var temperatura = [];
    var lluvia = [];
    var humedad = [];
    var precionA = [];
    var rayosUv = [];
    var fotoresistencia = [];

    data.map((elemento) => {
      temperatura.push(elemento.temperatura);
      lluvia.push(elemento.lluvia);
      humedad.push(elemento.humedad);
      precionA.push(elemento.presionA);
      rayosUv.push(elemento.rayosUv);
      fotoresistencia.push(elemento.fotoResistencia);
    });
    SetTempera1G(temperatura);
    SetLluvia1G(lluvia);
    SetHumedad1G(humedad);
    SetPresionA1G(precionA);
    SetRayosUv1G(rayosUv);
    SetFotoResistencia1G(fotoresistencia);
  };

  useEffect(() => {
    handleActive();
  }, []);

  useEffect(() => {
    handleActive2();
  }, []);
  useEffect(() => {
    peticonFechFire();
  }, []);
  useEffect(() => {
    datosFech();
  }, []);

  const message = () => {
    if (rayosUv1 > 6) {
      fetch(
        `https://api.telegram.org/bot5811861089:AAGO5USZn0bx1VxlaLPyA7dCwTKXbPdqqYI/sendMessage?chat_id=-1001736949798&text=${
          "Cuidado el indice de rayos uv esta muy alto" + rayosUv1
        }`,
        { method: "GET" }
      ).then(
        (sucess) => {
          console.log(sucess);
        },
        (error) => {
          console.log(Error);
        }
      );
    }
    if (temperatura1 <= 8) {
      fetch(
        `https://api.telegram.org/bot5811861089:AAGO5USZn0bx1VxlaLPyA7dCwTKXbPdqqYI/sendMessage?chat_id=-1001736949798&text=${
          "procura abrigarte o te podras enfermar estamos a " +
          temperatura1 +
          "C"
        }`,
        { method: "GET" }
      ).then(
        (sucess) => {
          console.log(sucess);
        },
        (error) => {
          console.log(Error);
        }
      );
    }
  };

  // Grafica de barras
  let data = anychart.data.set([
    ["01:00", temperaturaG[0], 50],
    ["02:00", temperaturaG[1], 50],
    ["04:00", temperaturaG[2], 50],
    ["05:00", temperaturaG[3], 50],
    ["06:00", temperaturaG[4], 50],
    ["07:00", temperaturaG[5], 50],
    ["08:00", temperaturaG[6], 50],
    ["09:00", temperaturaG[7], 50],
    ["10:00", temperaturaG[8], 50],
    ["11:00", temperaturaG[9], 50],
    ["12:00", temperaturaG[10], 50],
    ["13:00", temperaturaG[11], 50],
    ["14:00", temperaturaG[12], 50],
    ["15:00", temperaturaG[13], 50],
    ["16:00", temperaturaG[14], 50],
    ["17:00", temperaturaG[15], 50],
    ["18:00", temperaturaG[16], 50],
    ["19:00", temperaturaG[17], 50],
    ["20:00", temperaturaG[18], 50],
    ["21:00", temperaturaG[19], 50],
    ["22:00", temperaturaG[20], 50],
    ["23:00", temperaturaG[21], 50],
    ["24:00", temperaturaG[22], 50],
    ["24:00", temperaturaG[23], 50],
  ]);

  let error = anychart.column();
  var Humedad = data.mapAs({ x: 0, value: 1 });

  let series1 = error.column(Humedad);
  series1.error().valueLowerError(1);
  series1.error().valueUpperError(1);

  // Grafica de lineas
  let chart1 = anychart.line(humedadG);
  chart1.yAxis().title("Humedad")
  chart1.xAxis().title("Tiempo (Horas)")

  // Grafica de dispersion

  let chartDispersion = anychart.scatter();
  chartDispersion.title("Grafica de dispersion");
  chartDispersion.xScale().minimum(0).maximum(24).ticks({ interval: 1 });
  chartDispersion.yScale().minimum(-1).maximum(11).ticks({ interval: 1 });
  chartDispersion.yAxis().title("indice UV");
  chartDispersion.xAxis().title("Tiempo(Horas)");
  chartDispersion.interactivity().hoverMode("by-spot").spotRadius(8);
  var marker = chartDispersion.marker(rayosUvG);
  marker.type("triangle-up").size(3);
  marker.hovered().size(7).fill("gold").stroke(anychart.color.darken("gold"));
  marker
    .tooltip()
    .hAlign("start")
    .format(function () {
      return "indice de rayos: " + this.value + " " + "Hora: " + this.x;
    });


  const EstadeSol = () => {
    if (fotoResistencia1 > 600) {
      setEstadoSol("soleado");
    }
    if (fotoResistencia1 < 600 && fotoResistencia1 > 300) {
      setEstadoSol("Resolana");
    }
    if (fotoResistencia1 < 200) {
      setEstadoSol("sombra");
    }
  };

  return (
    <div className="container-fluid g-0 pb-5">
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container">
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
            <div className="navbar-nav ms-auto"></div>
          </div>
        </div>
      </nav>

      <div className="row g-0 px-5">
        <header className="col-12 header my-3">
          <div className="row g-0 h-100 p-2">
            <div className="col-12 col-md-6">
              <h1 className="text-center">ESTACION METEOROLOGICA</h1>
              <h5 className="text-center">Jueves</h5>
              <h5 className="text-center">08 de noviembre del 2022</h5>
              <h5 className="text-center">Suchiapa Chiapas</h5>
            </div>
            <div className="col-12 col-md-6  d-flex justify-content-center align-items-center">
              <div>
                <h1>{estadosol}</h1>
              </div>
            </div>
          </div>
        </header>

        <div className="col-12 card mt-4 slide-in-bottom-1 ">
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
              <h3 className="text-center">Temperatura</h3>
              <h5 className="text-center  m-0">{temperatura1 + "C"}</h5>
              <p>Sensor:DHT11</p>
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
              <h3 className="text-center">Humedad</h3>
              <h5 className="text-center  m-0">{humedad1 + "h"}</h5>
              <p>Sensor:DHT11</p>
            </div>
            <div className="col-md-2 butt d-flex justify-content-center align-items-center py-2 py-md-0">
              <button
                className="btn btn-primary"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample1"
                aria-expanded="false"
                aria-controls="collapseExample1"
              >
                Grafica
              </button>
            </div>
          </div>
        </div>

        <div className="collapse mt-2" id="collapseExample1">
          <div className="card card-body overflow-auto">
            <AnyChart
              instance={stage1}
              id="secondChart"
              width={900}
              height={300}
              charts={[chart1]}
            />
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
              <h5 className="text-center  m-0">{rayosUv1 + "uv"}</h5>
              <p>Sensor:Ml8511</p>
            </div>
            <div className="col-md-2 butt d-flex justify-content-center align-items-center py-2 py-md-0">
              <button
                className="btn btn-primary"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample2"
                aria-expanded="false"
                aria-controls="collapseExample2"
              >
                Grafica
              </button>
            </div>
          </div>
        </div>

        <div className="collapse mt-2" id="collapseExample2">
          <div className="card card-body overflow-auto">
            <AnyChart
              instance={chartDispersion}
              id="thirdChart"
              width={900}
              height={300}
            />
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
              <h3 className="text-center">Precion</h3>
              <h5 className="text-center  m-0">{presionA1 + "Ph"}</h5>
               <p>Sensor:Ml8511</p>
              
            </div>
            <div className="col-md-2 butt d-flex justify-content-center align-items-center py-2 py-md-0">
              <button
                className="btn btn-primary"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample4"
                aria-expanded="false"
                aria-controls="collapseExample4"
              >
                Grafica
              </button>
            </div>
          </div>
        </div>

        <div className="collapse mt-2" id="collapseExample4">
          <div className="card card-body overflow-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default Home4;
