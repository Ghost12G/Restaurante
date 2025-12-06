import Chart from "chart.js/auto";

export const iniciarDashboard = async () => {
  const existingChart = Chart.getChart("myChart");
  if (existingChart) existingChart.destroy();

  const ctx = document.getElementById("myChart");
  if (!ctx) return;

  try {
    // Traer datos de reservas, pedidos, usuarios y delivery
    const [reservasRes, pedidosRes, usuariosRes, deliveryRes] = await Promise.all([
      fetch("http://localhost:8081/restaurante/public/api/reservas"),
      fetch("http://localhost:8081/restaurante/public/api/pedidos"),
      fetch("http://localhost:8081/restaurante/public/api/usuarios"),
      fetch("http://localhost:8081/restaurante/public/api/delivery") // nueva API
    ]);

    const reservas = await reservasRes.json();
    const pedidos = await pedidosRes.json();
    const usuarios = await usuariosRes.json();
    const delivery = await deliveryRes.json();

    const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

    // Contar reservas por mes
    const reservasPorMes = meses.map((_, i) =>
      reservas.filter(r => {
        const fecha = new Date(r.created_at);
        return !isNaN(fecha) && fecha.getMonth() === i;
      }).length
    );

    // Contar pedidos por mes
    const pedidosPorMes = meses.map((_, i) =>
      pedidos.filter(p => {
        const fecha = new Date(p.fecha_pedido);
        return !isNaN(fecha) && fecha.getMonth() === i;
      }).length
    );

    // ===============================
    //   USUARIOS (solo usuarios NO admin)
    // ===============================

    // Filtrar usuarios normales (excluyendo admins)
    const usuariosNormales = usuarios.filter(u =>
      u.rol !== "admin" && u.rol !== "Administrador"
    );

    // Contar usuarios normales por mes usando fecha_registro
    const usuariosPorMes = meses.map((_, i) =>
      usuariosNormales.filter(u => {
        const fecha = new Date(u.fecha_registro);
        return !isNaN(fecha) && fecha.getMonth() === i;
      }).length
    );

    // Contar deliveries por mes usando created_at
    const deliveryPorMes = meses.map((_, i) =>
      delivery.data.filter(d => {
        const fecha = new Date(d.created_at);
        return !isNaN(fecha) && fecha.getMonth() === i;
      }).length
    );

    // Crear gráfico de barras con 4 datasets
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: meses,
        datasets: [
          { label: "Reservas", data: reservasPorMes, backgroundColor: "rgb(220,53,69)" },
          { label: "Pedidos", data: pedidosPorMes, backgroundColor: "rgb(255,193,7)" },
          { label: "Usuarios", data: usuariosPorMes, backgroundColor: "rgb(13,110,253)" },
          { label: "Delivery", data: deliveryPorMes, backgroundColor: "rgb(40,167,69)" } // nuevo
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
          title: { display: true, text: "Reservas, Pedidos, Usuarios y Delivery por mes" }
        },
        scales: { y: { beginAtZero: true } }
      }
    });

    console.log("✅ Dashboard cargado correctamente (con Delivery y usuarios filtrados)");

  } catch (error) {
    console.error("Error cargando dashboard:", error);
  }
};
