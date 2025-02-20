<template>
  <nav class="navbar">
    <ul>
      <li><router-link to="/">🏆 Liste des matchs</router-link></li>
      <li><router-link to="/classement">📊 Classement des joueurs</router-link></li>
    </ul>
  </nav>
  <div class="separator"></div>
</template>

<script>
export default {
  name: "AppNavbar",
};
</script>

<style scoped>
.navbar {
  padding: 10px;
  text-align: center;
}

.navbar ul {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
  margin: 0 500px;
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

.separator {
  width: 50%;
  height: 4px;
  background: white;
  margin-bottom: 50px;
  margin-right: auto;
  margin-left: auto;
  border-radius: 10px;
}

</style>
