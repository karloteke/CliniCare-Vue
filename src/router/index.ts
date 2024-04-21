import { createRouter, createWebHistory } from 'vue-router'
import PatientsListView from '@/views/PatientsListView.vue'
import AppointmentsListView from '@/views/AppointmentsListView.vue'
import MedicalRecordsListView from '@/views/MedicalRecordsListView.vue'
import UserListView from '@/views/UserListView.vue'
import HomeView from '@/views/HomeView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true } // Indica que esta ruta requiere autenticación
    },
    {
      path: '/patients',
      name: 'patientList',
      component: PatientsListView
    },
    {
      path: '/appointments',
      name: 'appointmentList',
      component: AppointmentsListView
    },
    {
      path: '/medicalRecords',
      name: 'medicalRecordList',
      component: MedicalRecordsListView
    },
    {
      path: '/users',
      name: 'user',
      component: UserListView
    }
  ]
})


export default router

