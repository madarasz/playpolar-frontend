<template>
   <v-card>
    <v-card-title>
      <span class="headline">
          Ajándék követés
      </span>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="keresés" single-line hide-details class="pt-0"></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="orders" :search="search" hide-actions no-data-text="nincsenek ajándék rendelések">
        <template slot="items" slot-scope="props">
            <td class="text-xs-left">{{ props.item.prizeName }}</td>
            <td class="text-xs-left">{{ props.item.user }}</td>
            <td class="text-xs-center">{{ props.item.orderedAt }}</td>
            <td class="text-xs-center">{{ props.item.shippedAt }}</td>
            <td class="text-xs-center">{{ props.item.receivedAt }}</td>
            <td class="text-xs-left">{{ props.item.address }}</td>
            <td class="text-xs-left">{{ props.item.notes }}</td>
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
          { text: 'Ajándék', align: 'left', value: 'prizeName' },
          { text: 'Megrendelő', align: 'left', value: 'user' },
          { text: 'Megrendelés', align: 'center', value: 'orderedAt' },
          { text: 'Feladás', align: 'center', value: 'shippedAt' },
          { text: 'Átvétel', align: 'center', value: 'receivedAt' },
          { text: 'Cím', align: 'left', value: 'address' },
          { text: 'Megjegyzés', align: 'left', value: 'notes' },
          { text: ''}
        ],
      }
    },
    computed: {
      // data coming from vuex store
      ...mapState('orders', { 
        orders: 'orders'
      }),
    }
  }
</script>