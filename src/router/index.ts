import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';
import { useLoginStore } from '@/stores/loginStore';
import authGuard from '@/stores/guards'; 



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'), // Usa una función para cargar el componente dinámicamente
      
    },
    {
      path: '/patients',
      name: 'patientList',
      component: () => import('@/views/PatientsListView.vue'),
      beforeEnter: authGuard,
     
    },
    {
      path: '/appointments',
      name: 'appointmentList',
      component: () => import('@/views/AppointmentsListView.vue'),
      beforeEnter: authGuard,
    },
    {
      path: '/medicalRecords',
      name: 'medicalRecordList',
      component: () => import('@/views/MedicalRecordsListView.vue'),
      beforeEnter: authGuard,
    },
    {
      path: '/users',
      name: 'user',
      component: () => import('@/views/UserListView.vue'),
      beforeEnter: authGuard,
    },
    { 
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
    },
    { 
      path: '/add-user',
      name: 'addUser',
      component: () => import('@/views/AddUserView.vue'),
      beforeEnter: authGuard,
    },
    { 
      path: '/add-appointment',
      name: 'addAppointment',
      component: () => import('@/views/AddAppointmentView.vue'),
      beforeEnter: authGuard,
    },
    { 
      path: '/add-patient',
      name: 'addPatient',
      component: () => import('@/views/AddPatientView.vue'),
      beforeEnter: authGuard,
    },
    { 
      path: '/appointment-patient/:dni',
      name: 'appointmentPatient',
      component: () => import('@/views/AppointmentForPatientView.vue'),
      beforeEnter: authGuard,
    }
  ]
});


export default router

