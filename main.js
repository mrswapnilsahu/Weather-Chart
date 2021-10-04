var foster_air_temperature = [];
var oak_air_temperature = [];
var foster_humidity = [];
var oak_humidity = [];
var foster_wind_speed = [];
var oak_wind_speed = [];
var curr_date = new Date("2019-09-09T11:00:00.000");
var time = [];

plotData();

async function getData() {
  await fetch("https://data.cityofchicago.org/resource/k7hf-8y75.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      for (i = 0; i < data.length; i++) {
        var data_date = new Date(data[i].measurement_timestamp);
        var diff_time =
          Math.abs(curr_date.getTime() - data_date.getTime()) / (1000 * 3600);
        if (
          data[i].station_name === "Foster Weather Station" &&
          diff_time <= 6
        ) {
          foster_air_temperature.push(data[i].air_temperature);
          foster_humidity.push(data[i].humidity);
          foster_wind_speed.push(data[i].wind_speed);
          time.push(
            new Date(data[i].measurement_timestamp).toString().slice(4, 21)
          );
        } else if (
          data[i].station_name === "Oak Street Weather Station" &&
          diff_time <= 6
        ) {
          oak_air_temperature.push(data[i].air_temperature);
          oak_humidity.push(data[i].humidity);
          oak_wind_speed.push(data[i].wind_speed);
          time.push(
            new Date(data[i].measurement_timestamp).toString().slice(4, 21)
          );
        }
      }
    })
    .catch((err) => {
      console.log("Error Occurred" + err);
    });
}

async function plotData() {
  await getData();
  var ctx = document.getElementById("air_temperature_Chart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: time,
      datasets: [
        {
          data: foster_air_temperature,
          label: "Foster Weather Station",
          borderColor: "#3e95cd",
          fill: false,
        },
        {
          data: oak_air_temperature,
          label: "Oak Weather Station",
          borderColor: "#8e5ea2",
          fill: false,
        },
      ],
    },
    options: {
      title: {
        display: true,
        fontSize: 30,
        lineHeight: 3,
        text: "Air Temperature (in °C)",
      },
    },
  });
  var ctx = document.getElementById("humidity_chart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: time,
      datasets: [
        {
          data: foster_humidity,
          label: "Foster Weather Station",
          borderColor: "#3e95cd",
          fill: false,
        },
        {
          data: oak_humidity,
          label: "Oak Weather Station",
          borderColor: "#8e5ea2",
          fill: false,
        },
      ],
    },
    options: {
      title: {
        display: true,
        fontSize: 30,
        lineHeight: 4,
        text: "Humidity",
      },
    },
  });
  var ctx = document.getElementById("wind_speed_chart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: time,
      datasets: [
        {
          data: foster_wind_speed,
          label: "Foster Weather Station",
          borderColor: "#3e95cd",
          fill: false,
        },
        {
          data: oak_wind_speed,
          label: "Oak Weather Station",
          borderColor: "#8e5ea2",
          fill: false,
        },
      ],
    },
    options: {
      title: {
        display: true,
        fontSize: 30,
        lineHeight: 5,
        text: "Wind Speed (in m/s)",
      },
    },
  });
}
