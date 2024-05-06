<script setup lang="ts">
import { ref, onMounted, type Ref } from 'vue';
import Chart from 'chart.js/auto'; 
import { useAppointmentStore } from '@/stores/appointmentStore';
import type { Appointment } from '@/core/appointment'; 


const appointmentStore = useAppointmentStore();
const appointments: Ref<Appointment[]> = ref([]); // Especifica el tipo de appointments como Ref<Appointment[]>

onMounted(async () => {
  await appointmentStore.fetchAll();
  appointments.value = appointmentStore.appointments;
  drawChart(appointments.value);
});

function drawChart(appointments: Appointment[]) { 
  const appointmentsCount = appointments.length;
  const ctx = document.getElementById('appointmentChart') as HTMLCanvasElement; // Realiza un casting a HTMLCanvasElement
  if (ctx) {
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [''],
        datasets: [{
          label: 'Total de citas registradas',
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
            text: 'Número total de citas registradas',
            font: {
              size: 18,
              weight: 'bold'
            },
            padding: 25
          }
        }
      }
    });
  }
}
</script>


<template>
  <div class="home">
    <div class>
      <h1>Bienvenido a CliniCare</h1>
    </div>
    <div class="chart-container">
      <canvas id="appointmentChart" style="width: 1000px; height: 800px;"></canvas>
    </div>
  </div>
</template>


<style scoped>
  .home {
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



