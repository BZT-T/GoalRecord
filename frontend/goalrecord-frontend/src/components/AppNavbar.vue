<template>
  <nav class="navbar">
    <ul>
      <li><router-link to="/">🏆 Liste des matchs</router-link></li>
      <li><router-link to="/classement">📊 Classement des joueurs</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "AppNavbar",
};
</script>

<style scoped>
.navbar {
  background-color: #333;
  padding: 10px;
  text-align: center;
}

.navbar ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
}

.navbar li {
  margin: 0 15px;
}

.navbar a {
  text-decoration: none;
  color: white;
  font-weight: bold;
}

.navbar a:hover {
  color: #f0a500;
}
</style>
