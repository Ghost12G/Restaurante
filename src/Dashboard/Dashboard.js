// src/Dashboard/Dashboard.js
import Chart from "chart.js/auto";

export const iniciarDashboard = () => {
  const existingChart = Chart.getChart("myChart");
  if (existingChart) {
    existingChart.destroy(); // evita error de canvas duplicado
  }

  const ctx = document.getElementById("myChart");
  if (!ctx) return;

  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul"],
      datasets: [
        {
          label: "Ventas ($)",
          data: [120, 190, 300, 500, 200, 300, 450],
          borderColor: "rgb(13, 110, 253)",
          backgroundColor: "rgba(13, 110, 253, 0.2)",
          tension: 0.3,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { display: true } },
    },
  });

  console.log("✅ Dashboard con gráfico cargado");
};
