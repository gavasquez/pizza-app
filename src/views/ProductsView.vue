<template>
  <div class="container bg-white text-center p-4 rounded-2" style="height: 90vh; margin-top: 2%">
    <h1>Pizzas</h1>
    <hr />
    <div class="container-fluid">
      <div class="row">
        <div v-for="pizza in pizzas" :key="pizza.id" class="col-3">
          <div class="card">
            <img :src="pizza.image" class="card-img-top" alt="..." />
            <div class="card-body">
              <p class="card-text fw-bold">{{ pizza.name }}</p>
              <small>Disponibles: {{ pizza.stock }}</small>
              <p class="text-success">$ {{ pizza.precio }}</p>
              <button class="btn btn-warning" @click="addProductCarrito(pizza)">Comprar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center mt-2">
      <button
        :disabled="productos.length === 0"
        class="btn btn-warning"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Ver Carrito de compras
      </button>
    </div>
  </div>
  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title fs-2" id="exampleModalLabel">Detalle Pedido</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <h5>Detalles del cliente</h5>
          <hr />
          <p>Nombre: {{ useCliente.cliente?.nombre }}</p>
          <p>Email: {{ useCliente.cliente?.email }}</p>
          <p>Direccion: {{ useCliente.cliente?.direccion }}</p>
          <p>Telefono: {{ useCliente.cliente?.telefono }}</p>
          <h5>Detalles de los productos</h5>
          <hr />
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Imagen</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Precio</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, index) in productos" :key="product.id">
                <th>{{ index + 1 }}</th>
                <td>{{ product.name }}</td>
                <td><img width="50px" height="50px" :src="product.image" :alt="product.name" /></td>
                <td>{{ product.stock }}</td>
                <td>{{ product.stock * product.precio }}</td>
              </tr>
            </tbody>
          </table>
          <p class="text-end me-2">
            <strong>Total:</strong> ${{
              productos.reduce((acomulador, actual) => acomulador + actual.precio * actual.stock, 0)
            }}
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-primary" @click="compra()">Pagar</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { v4 as uuidV4 } from 'uuid';
import type { Cliente } from '@/interfaces/cliente.interface';
import { useCounterStore } from '@/pinia/useCliente';

interface Pizza {
  id: string;
  name: string;
  image: string;
  stock: number;
  precio: number;
}

const listPizzas = [
  {
    id: uuidV4(),
    name: 'Pizza Peperoni',
    image:
      'https://png.pngtree.com/png-vector/20240203/ourmid/pngtree-pepperoni-pizza-isolated-illustration-ai-generative-png-image_11535530.png',
    stock: 5,
    precio: 8000,
  },
  {
    id: uuidV4(),
    name: 'Pizza Mexicana',
    image:
      'https://img.freepik.com/fotos-premium/pizza-mexicana-aislada-chorizo-jalapeno_219193-8204.jpg',
    stock: 15,
    precio: 9000,
  },
  {
    id: uuidV4(),
    name: 'Pizza Champiñones',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNelUxSP5nD7btFayAZrryalNQjb5HvsuaMRQ1XC3K4g&s',
    stock: 10,
    precio: 8500,
  },
  {
    id: uuidV4(),
    name: 'Pizza Pollo',
    image:
      'https://png.pngtree.com/png-clipart/20231017/original/pngtree-cheese-and-chicken-pizza-png-image_13327673.png',
    stock: 14,
    precio: 7000,
  },
];

const pizzas = ref<Pizza[]>(listPizzas);

const useCliente = useCounterStore();

const compra = () => {
  alert('Se realizo la compra correctamente');
};

const productos = ref<Pizza[]>([]);

const addProductCarrito = (pizza: Pizza) => {
  let cantidad: number = 0;
  const existeProduct = productos.value.find((p) => p.id === pizza.id);
  pizzas.value.map((p) => {
    if (p.id === pizza.id) {
      p.stock -= 1;
    }
  });
  if (existeProduct) {
    const indexOf = productos.value.indexOf(existeProduct);
    productos.value[indexOf].stock = existeProduct.stock + 1;
    return;
  }
  const newPizza: Pizza = {
    id: pizza.id,
    name: pizza.name,
    image: pizza.image,
    stock: cantidad + 1,
    precio: pizza.precio,
  };
  productos.value.push(newPizza);
};
</script>
