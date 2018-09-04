<template>
  <div id="app-main">
    <v-app>
      <v-toolbar dark>
        <!--<v-toolbar-side-icon></v-toolbar-side-icon>-->
        <v-toolbar-title>Play!Polar</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="">
          <v-btn flat v-for="route in routerItems" :key="route.path">
            <router-link :to="route" class="nav-link" active-class="active" tag="span">
              {{ route.name }}
            </router-link>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-content>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-content>
      <v-footer app></v-footer>
    </v-app>
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
