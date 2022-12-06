import AnyChart from "anychart-react";
import anychart from "anychart";
import '../asset/styles/home.css'
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';

const Home = () => {

  const [productos, setProductos] = useState({});
    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch("https://integrador-85802-default-rtdb.firebaseio.com/test.json?print=pretty", requestOptions)
            .then(response => response.json())
            .then( (result) => {
                setProductos(result)
                console.log(result) })
            .catch(error => console.log('error', error));})

  let stage1 = anychart.graphics.create();
  let stage3 = anychart.graphics.create();

console.log(productos)
  // RAYOS UV
  let dataSet = anychart.data.set(1);
  let UV = anychart.gauges.circular();
  UV.data(dataSet);
  UV.padding("10%");
  UV.startAngle(0);
  UV.sweepAngle(100);

  let axis = UV.axis()
  axis.scale()
    .minimum(0)
    .maximum(10)
    .ticks({interval: 1});
    axis.ticks()
    .enabled(true)
    .type('trapezium')
    .length('4');
    // AJUGA
    UV.needle(2)
    .enabled(true)
    .startRadius('-5%')
    .endRadius('80%')
    .middleRadius(5)
    .startWidth('0.7%')
    .endWidth('0.1%')
    .middleWidth('5%');

  // GRAFICA DE ERROR
  let data = anychart.data.set([
    ["01:00", 34, 50],
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
    ["17:00", 0, 50],
    ["18:00", 14, 50],
    ["19:00", 0, 50],
    ["20:00", 19, 50],
    ["21:00", 10, 50],
    ["22:00", 0, 50],
    ["23:00", 0, 50],
    ["24:00", 10, 50],
    ["24:00", 11, 50]

  ]);
  let error = anychart.column();
  var Humedad = data.mapAs({x: 0, value: 1});
  
  let series1 = error.column(Humedad);
  series1.error().valueLowerError(1);
  series1.error().valueUpperError(1);


  let chart1 = anychart.line([1, 2, 3]);
  let chart3 = anychart.line([1, 2, 3]);
  return (
    <div>
      <main className="container-fluid g-0">
        <section className="row g-0 ">
          <article className="col-12 d-flex justify-content-center my-5">
            <div className="card w-75  text-bg-secondary">
              <div className="card-body">
                <h2 className="card-title">Tuestaday</h2>
                <h5 className="card-title">19 november 2022</h5>
                <p className="card-text">Suchiapa chiapas</p>
                <Link to="/Home2">Home2</Link>
              </div>
            </div>
          </article>

          <article className="col-12 col-md-6 d-flex justify-content-center mt-4 " >
            <div className="card w-75  text-bg-secondary  overflow-auto">
              <div className="card-body">
                <h5 className="card-title">Humedad</h5>
                <div className="d-flex justify-content-center putoverflow">
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
            </div>
          </article>

          <article className="col-12 col-md-6 d-flex justify-content-center mt-4">
            <div className="card w-75  text-bg-secondary">
              <div className="card-body">
                <h5 className="card-title">Temperatura</h5>
                <div className="d-flex justify-content-center">
                  <AnyChart
                  instance={stage1}
                  id="secondChart"
                  width={400}
                  height={300}
                  charts={[chart1]}
               
                />
                </div>
                
              </div>
            </div>
          </article>

          <article className="col-12 col-md-6 d-flex justify-content-center mt-4">
            <div className="card w-75  text-bg-secondary">
              <div className="card-body">
                <h5 className="card-title">Indice de rayos UV</h5>
                <div className="d-flex justify-content-center">
                  <AnyChart
                  instance={UV}
                  charts={[dataSet]} 
                  width={400}
                  height={400}
                
                />
                </div>
              </div>
            </div>
          </article>

          <article className="col-12 col-md-6 d-flex justify-content-center mt-4">
            <div className="card w-75  text-bg-secondary">
              <div className="card-body">
                <h5 className="card-title">Probabilidad de lluvia</h5>
                <div className="d-flex justify-content-center">
                  <AnyChart
                  instance={stage3}
                  id="fourdChart"
                  width={400}
                  height={300}
                  charts={[chart3]}
                />
                </div>
              </div>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
};
export default Home;