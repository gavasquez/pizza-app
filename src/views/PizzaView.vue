<template>
  <div class="container bg-white text-center p-4 rounded-2 " style="height:92vh; margin-top: 2%;">
    <h1 class="text-center">Bienvenidos a PizzaApp</h1>
    <hr />
    <div class="container">
      <div class="row">
        <div class="col-2 text-start">
          <h2>Clientes</h2>
        </div>
        <div class="col-10 text-end">
          <button class="btn btn-info">Crear Cliente</button>
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
                    <RouterLink to="/products" class="btn btn-warning">Ver Productos</RouterLink>
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
</template>
<script setup lang="ts">
import { ref } from 'vue';
import type { Cliente } from '../interfaces/cliente.interface';

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

const inputTelefono = ref('');

const onSearchCliente = () => {
  if (inputTelefono.value === '') {
    alert('Por favor ingrese un valor.');
    return;
  }

  cliente.value = clientes.value.find((client) => client.telefono === inputTelefono.value);

  if (!cliente) {
    alert('No existe el cliente, por favor validar o crear un nuevo cliente');
  }
};
</script>
