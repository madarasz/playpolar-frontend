<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-coolklima">
      <div class="container">
        <span class="navbar-brand" href="#">Play!Polar</span>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item" v-for="route in routerItems" :key="route.path">
              <router-link :to="route" class="nav-link" active-class="active">
                {{ route.title }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
  import RouteList from './route-list.js'

  export default {
    data:() => ({
      routerItems: RouteList.slice(0, -1)
    })
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
