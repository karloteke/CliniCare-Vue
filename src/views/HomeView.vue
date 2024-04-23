<script setup lang="ts">
import { onMounted } from 'vue';
import Chart from 'chart.js/auto';

// Método para obtener los datos de las citas desde la API y actualizar la gráfica
async function fetchAndDrawChart() {
  try {
    const response = await fetch('https://localhost:7113/Appointments');
    if (!response.ok) {
      throw new Error('No se pudo obtener los datos de la API');
    }
    const appointments = await response.json();
    const appointmentsLastWeek = filterAppointmentsLastWeek(appointments);
    const appointmentsCount = appointmentsLastWeek.length;
    console.log('Datos de citas de la última semana:', appointmentsLastWeek);
    console.log('Número total de citas en la última semana:', appointmentsCount);
    drawChart(appointmentsCount);
  } catch (error) {
    console.error('Error al obtener los datos de las citas:', error);
  }
}

// Método para filtrar las citas creadas en la última semana
function filterAppointmentsLastWeek(appointments) {
  const today = new Date();
  const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  return appointments.filter(appointment => new Date(appointment.createdAt) >= lastWeek);
}

// Método para dibujar la gráfica con el número total de citas en la última semana
function drawChart(appointmentsCount) {
  const ctx = document.getElementById('appointmentChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Última semana'],
      datasets: [{
        label: 'Citas registradas en la última semana',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        data: [appointmentsCount]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: 'Número de citas registradas en la última semana'
        }
      }
    }
  });
}

// Cuando se monta el componente, obtener los datos y dibujar la gráfica
onMounted(() => {
  fetchAndDrawChart();
});
</script>



<template>
  <div class="container">
    <div class="content">
      <h1>Bienvenido a CliniCare</h1>
    </div>
    <div class="chart-container">
      <canvas id="appointmentChart"></canvas>
    </div>
  </div>
</template>


<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: green;
}

.chart-container {
  width: 30%; 
  margin-top: 50px; 
}
</style>
