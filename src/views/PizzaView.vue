<template>
  <div class="container bg-white text-center p-4 rounded-2 " style="height:100vh; margin-top: 2%;">
    <h1 class="text-center">Bienvenidos a PizzaApp</h1>
    <hr />
    <div class="container">
      <div class="row">
        <div class="col-2 text-start">
          <h2>Clientes</h2>
        </div>
        <div class="col-10 text-end">
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Crear Cliente
          </button>
        </div>
      </div>

      <div class="row mt-2 justify-content-center">
        <label class="fs-4 text-center">Buscar cliente: </label>
        <div class="col-6">
          <input
            v-model="inputTelefono"
            type="number"
            class="form-control"
            placeholder="Ingrese el número telefonico"
          />
        </div>
        <div class="col-12 mt-2">
          <button
            @click.prevent="onSearchCliente"
            :disabled="inputTelefono === ''"
            class="btn btn-primary"
          >
            Buscar
          </button>
        </div>
      </div>

      <template v-if="cliente">
        <div class="container text-start shadow p-2 bg-gray-400 w-50 mt-3 rounded-5 mb-5">
          <h3 class="text-center mb-2">Datos del Cliente</h3>
          <div class="card mb-3" style="max-width: 540px">
            <div class="row g-0">
              <div class="col-md-4">
                <img
                  src="https://www.iconpacks.net/icons/2/free-user-profile-icon-4255-thumb.png"
                  class="img-fluid rounded-start"
                  alt="..."
                />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">Nombre: {{ cliente.nombre }}</h5>
                  <p class="card-text text-black">
                    <small>Datos de contacto</small>
                    <ul class="list-group">
                      <li class="list-group-item">
                        Email: {{ cliente.email }}
                      </li>
                      <li class="list-group-item">
                        Telefono: {{ cliente.telefono }}
                      </li>
                      <li class="list-group-item">
                        Direccion: {{ cliente.direccion }}
                      </li>
                    </ul>
                  </p>
                  <p class="card-text text-center">
                    <button class="btn btn-warning" @click="navegarProducto">Ver Productos</button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template v-else>
        <p class="text-center text-danger mt-2">
          Por favor ingresar número de telefono, para buscar el cliente.
        </p>
      </template>
    </div>
  </div>
  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Crear Cliente</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="crearCliente">
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Nombre</label>
              <input 
              v-model="formCliente.nombre"
              type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Ingresar nombre">
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Email</label>
              <input 
              v-model="formCliente.email"
              type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Ingresar email">
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Telefono</label>
              <input 
              v-model="formCliente.telefono"
              type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Ingresar Telefono">
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Direccion</label>
              <input 
              v-model="formCliente.direccion"
              type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Ingresar direccion">
            </div>
            <div class="text-center ">
              <button type="submit" class="btn btn-primary">Crear</button>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import { v4 as uuidV4 } from "uuid";
import type { Cliente } from '../interfaces/cliente.interface';
import { useCounterStore } from '@/pinia/useCliente';
import { useRouter } from 'vue-router';

const clientes = ref<Cliente[]>([
  {
    id: 'abc1',
    nombre: 'Andres Vasquez',
    email: 'gustavo15@gmail.com',
    telefono: 3004406300,
    direccion: 'Carrera 37 # 22 - 101',
  },
  {
    id: 'abc2',
    nombre: 'Andres Vasquez',
    email: 'gustavo15@gmail.com',
    telefono: 3004406301,
    direccion: 'Carrera 37 # 22 - 101',
  },
  {
    id: 'abc3',
    nombre: 'Andres Vasquez',
    email: 'gustavo15@gmail.com',
    telefono: 3004406302,
    direccion: 'Carrera 37 # 22 - 101',
  },
]);

const cliente = ref<Cliente>();

const inputTelefono = ref();

const formCliente = reactive({
  nombre: '',
  email: '',
  telefono: 0,
  direccion: ''
});

const useCliente = useCounterStore();
const router = useRouter();

const navegarProducto = () => {
  useCliente.cliente = cliente.value;
  router.push('/products');
}

const onSearchCliente = () => {

  if (!inputTelefono.value) {
    alert('Por favor ingrese un valor.');
    return;
  }

  cliente.value = clientes.value.find((client) => client.telefono === inputTelefono.value);
  

  if (!cliente.value) {
    alert('No existe el cliente, por favor validar o crear un nuevo cliente');
  }
};

const crearCliente = () => {
  if(formCliente.nombre === '' || formCliente.email === '' || !formCliente.telefono || formCliente.direccion === '') {
    alert('Por favor revisar, algunos campos estan vacios');
    return;
  }
  const newCliente = {
    id: uuidV4(),
    ...formCliente,
  }

  clientes.value.push(newCliente);
  
  alert(`Usuario ${formCliente.nombre} creado correctamente`);

  formCliente.nombre = '';
  formCliente.email = '';
  formCliente.telefono = 0;
  formCliente.direccion = '';

}
</script>
