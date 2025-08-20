<template>
  <div id="app">
    <header class="header">
      <div class="container">
        <h1 class="title">Pokemons</h1>
      </div>
    </header>

    <main class="main">
      <div class="container">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped>
.header {
  background: linear-gradient(135deg, #ff0000 0%, #cc0000 100%);
  color: white;
  padding: 2rem 0;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 3rem;
  font-weight: bold;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.subtitle {
  font-size: 1.2rem;
  margin: 0.5rem 0 0 0;
  opacity: 0.9;
}

.main {
  min-height: calc(100vh - 200px);
  padding: 2rem 0;
}

.footer {
  background: #333;
  color: white;
  text-align: center;
  padding: 1rem 0;
  margin-top: auto;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
</style>