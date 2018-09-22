<template>
   <v-card>
    <v-card-title>
      <v-btn fab dark small color="indigo">
        <v-icon dark>add</v-icon>
      </v-btn>
      <span class="headline">
          Ajándékok
      </span>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="keresés" single-line hide-details class="pt-0"></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="prizes" :search="search" hide-actions no-data-text="nincsenek ajándékok">
        <template slot="items" slot-scope="props">
            <td class="text-xs-left">{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.description }}</td>
            <td class="text-xs-right">{{ props.item.price }}</td>
            <td class="text-xs-right" :class="props.item.available == 0 ? 'red--text font-weight-bold' : ''">
                {{ props.item.available }}
            </td>
            <td class="text-xs-center">
              <v-icon v-if="props.item.imageAvailable">image</v-icon>
            </td>
            <td class="text-xs-right">
              <v-btn color="info">szerkesztés</v-btn>
            </td>
        </template>
        <v-alert slot="no-results" :value="true" color="error" icon="warning">
            Nincs találat "{{ search }}" kifejezésre.
        </v-alert>
    </v-data-table>
  </v-card>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    data () {
      return {
        search: '',
        headers: [
          { text: 'Név', align: 'left', value: 'name' },
          { text: 'Leírás', align: 'left', value: 'description' },
          { text: 'Watt ár', align: 'right', value: 'price' },
          { text: 'Elérhető', align: 'right', value: 'available' },
          { text: 'Kép', align: 'center', value: 'imageAvailable' },
          { text: ''}
        ]
      }
    },
    computed: {
      // data coming from vuex store
      ...mapState('prizes', { 
        prizes: 'prizes'
      }),
    }
  }
</script>