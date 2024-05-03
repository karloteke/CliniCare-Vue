<!-- <script>
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';
import { useAppointmentStore } from '@/stores/appointmentStore';

export default {
  setup() {
    const appointmentStore = useAppointmentStore();
    const appointments = ref([]);

    onMounted(async () => {
      await appointmentStore.fetchAll();
      appointments.value = appointmentStore.appointments;
      drawChart(appointments.value);
    });

    function drawChart(appointments) {
      const appointmentsCount = appointments.length;
      const ctx = document.getElementById('appointmentChart').getContext('2d');
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
                  size: 16,
                  weight: 'bold'
              }
            }
          }
        }
      });
    }

    return {
      appointments
    };
  }
};
</script> -->

<!-- <template>
  <div class="container">
    <div class="content">
      <h1>Bienvenido a CliniCare</h1>
    </div>
    <div class="chart-container">
      <canvas id="appointmentChart"></canvas>
    </div>
  </div>
</template> -->
<!-- 
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


</style> -->
