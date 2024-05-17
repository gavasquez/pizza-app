<template>
  <div class="container bg-white text-center p-4 rounded-2" style="height: 90vh; margin-top: 2%">
    <h1>Pizzas</h1>
    <hr />
    <div class="container-fluid">
      <div class="row">
        <div v-for="pizza in pizzas" :key="pizza.id" class="col-3">
          <div class="card">
            <img :src="pizza.image" class="card-img-top" alt="...">
            <div class="card-body">
              <p class="card-text fw-bold">{{ pizza.name }}</p>
              <small>Disponibles: {{ pizza.stock }}</small>
              <p class="text-success">$ {{ pizza.precio }}</p>
              <button class="btn btn-warning ">Comprar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center mt-2">
      <RouterLink to="/carrito-compras" class="btn btn-warning">Ver Carrito de compras</RouterLink>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const listPizzas = [
  {
    id:1,
    name: 'Pizza Peperoni',
    image: 'https://png.pngtree.com/png-vector/20240203/ourmid/pngtree-pepperoni-pizza-isolated-illustration-ai-generative-png-image_11535530.png',
    stock: 5,
    precio: 8000,
  },
  {
    id: 1,
    name: 'Pizza Mexicana',
    image: 'https://img.freepik.com/fotos-premium/pizza-mexicana-aislada-chorizo-jalapeno_219193-8204.jpg',
    stock: 15,
    precio: 9000,
  },
  {
    id: 3,
    name: 'Pizza Champiñones',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNelUxSP5nD7btFayAZrryalNQjb5HvsuaMRQ1XC3K4g&s',
    stock: 10,
    precio: 8500,
  },
  {
    id: 4,
    name: 'Pizza Peperoni',
    image: 'https://png.pngtree.com/png-clipart/20231017/original/pngtree-cheese-and-chicken-pizza-png-image_13327673.png',
    stock: 14,
    precio: 7000,
  }
];

const pizzas = ref(listPizzas);
</script>