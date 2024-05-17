// stores/counter.js
import type { Cliente } from '@/interfaces/cliente.interface';
import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useCounterStore = defineStore('cliente', () => {

    const cliente = ref<Cliente>();

    const agregarCliente = (value: Cliente) => {
        if (!value) return;
        if (cliente.value?.id === value.id) return;
        cliente.value!.id = value.id
        cliente.value!.nombre = value.nombre;
        cliente.value!.email = value.email;
        cliente.value!.direccion = value.direccion;
        cliente.value!.telefono = value.telefono;
    }

    return {
        cliente,
        agregarCliente,
    }
})