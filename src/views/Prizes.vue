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
            <td class="text-xs-right">{{ props.item.available }}</td>
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
        ],
        prizes: [
          {
            name: 'Mérőszalag',
            description: 'Mérjen Ön is meg mindent!',
            price: 'mérföldkő',
            available: 8,
            imageAvailable: true
          },
          {
            name: 'Csővágó',
            description: 'A csövet bizony el kell vágni.',
            price: 'mérföldkő',
            available: 25,
            imageAvailable: true
          },
          {
            name: 'Céges autó',
            description: 'Csak a legjobbaknak jár.',
            price: 'mérföldkő',
            available: 0,
            imageAvailable: false
          },
          {
            name: 'Póló',
            description: 'Nagyon divatos szabása van.',
            price: 5000,
            available: 100,
            imageAvailable: true
          },
          {
            name: 'Nadrág',
            description: 'Beépített dekoltázzsal.',
            price: 10000,
            available: 25,
            imageAvailable: true
          },
          {
            name: 'Kulcstartó',
            description: 'Mindenkinek kell egy.',
            price: 6000,
            available: 8,
            imageAvailable: false
          },
        ]
      }
    }
  }
</script>