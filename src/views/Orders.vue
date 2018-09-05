<template>
   <v-card>
    <v-card-title>
      <v-btn fab dark small color="indigo">
        <v-icon dark>add</v-icon>
      </v-btn>
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
        orders: [
          {
            prizeName: 'Mérőszalag',
            user: 'Nagy Béla',
            orderedAt: '2018.07.25. 14:02',
            shippedAt: '2018.07.27. 12:00',
            receivedAt: '2018.07.29. 9:02',
            address: '1133 Budapest Hegedűs Gyula 32. 3.em. 42.',
            notes: null
          },
          {
            prizeName: 'Mérőszalag',
            user: 'Barna Frigyes',
            orderedAt: '2018.06.22. 17:17',
            shippedAt: null,
            receivedAt: null,
            address: '1425 Budapest Kathi Béla út 66.',
            notes: 'Cím nem létezik, felhívni'
          },
          {
            prizeName: 'Nadrág',
            user: 'Lancsa Péter Pál',
            orderedAt: '2018.09.04. 3:42',
            shippedAt: '2018.09.05. 12:14',
            receivedAt: null,
            address: '5540 Szarvas Körös utca 27',
            notes: null
          },
          {
            prizeName: 'Póló',
            user: 'Hajnal Andor',
            orderedAt: '2018.06.22. 16:12',
            shippedAt: '2018.06.27. 14:00',
            receivedAt: '2018.06.29. 9:15',
            address: '1042 Budapest Árpád út 44.',
            notes: null
          },
        ]
      }
    }
  }
</script>