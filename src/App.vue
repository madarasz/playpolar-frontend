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
