import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';
import { useLoginStore } from '@/stores/loginStore';



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue') // Usa una función para cargar el componente dinámicamente
    },
    {
      path: '/patients',
      name: 'patientList',
      component: () => import('@/views/PatientsListView.vue'),
     
    },
    {
      path: '/appointments',
      name: 'appointmentList',
      component: () => import('@/views/AppointmentsListView.vue')
    },
    {
      path: '/medicalRecords',
      name: 'medicalRecordList',
      component: () => import('@/views/MedicalRecordsListView.vue')
    },
    {
      path: '/users',
      name: 'user',
      component: () => import('@/views/UserListView.vue'),
    },
    { 
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    { 
      path: '/add-user',
      name: 'addUser',
      component: () => import('@/views/AddUserView.vue')
    },
    { 
      path: '/add-appointment',
      name: 'addAppointment',
      component: () => import('@/views/AddAppointmentView.vue')
    },
    { 
      path: '/add-patient',
      name: 'addPatient',
      component: () => import('@/views/AddPatientView.vue')
    }
  ]
});


export default router

