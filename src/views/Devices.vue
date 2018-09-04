<template>
    <div>
        <v-card>
            <v-card-title>
                <span class="headline">
                    Készülékek
                </span>
                <v-spacer></v-spacer>
                <v-text-field v-model="searchDevices" append-icon="search" label="keresés" single-line hide-details class="pt-0"></v-text-field>
            </v-card-title>
            <v-data-table :headers="headerDevices" :items="devices" :search="searchDevices" hide-actions no-data-text="nincsenek készülékek">
                <template slot="items" slot-scope="props">
                    <td class="text-xs-left">{{ props.item.name }}</td>
                    <td class="text-xs-right">{{ props.item.watts }}</td>
                    <td class="text-xs-left">{{ props.item.type }}</td>
                    <td class="text-xs-right">
                    <v-btn color="info">szerkesztés</v-btn>
                    </td>
                </template>
                <v-alert slot="no-results" :value="true" color="error" icon="warning">
                    Nincs találat "{{ search }}" kifejezésre.
                </v-alert>
            </v-data-table>
        </v-card>
        <v-card class="mt-4">
            <v-card-title>
                <span class="headline">
                    Készülék típusok
                </span>
            </v-card-title>
            <v-data-table :headers="headerTypes" :items="types" :search="searchTypes" hide-actions no-data-text="nincsenek készülék típusok">
                <template slot="items" slot-scope="props">
                    <td class="text-xs-left">{{ props.item.type }}</td>
                    <td class="text-xs-right">
                        <v-btn color="info">szerkesztés</v-btn>
                    </td>
                </template>
            </v-data-table>
        </v-card>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        searchDevices: '',
        headerDevices: [
          { text: 'Megnevezés', align: 'left', value: 'name' },
          { text: 'Watt pontok', align: 'right', value: 'watts' },
          { text: 'Típus', align: 'right', value: 'type' },
          { text: ''}
        ],
        devices: [
          {
            name: 'POLAR SIEH0025SDA/SO1H0025SDA',
            watts: 2500,
            type: 'split'
          },
          {
            name: 'Bosch Climate 5000 9000BTU',
            watts: 2900,
            type: 'split'
          },
          {
            name: 'Bosch Climate 8500 9000BTU',
            watts: 2900,
            type: 'split'
          },
          {
            name: 'DAIKIN FTXG20LS/RXG20L klíma Emura - ezüst',
            watts: 2100,
            type: 'split'
          },
          {
            name: 'DAIKIN FTXZ25N/RXZ25N',
            watts: 2500,
            type: 'split'
          },
          {
            name: 'DAIKIN FLXS50B/RXS50L',
            watts: 4900,
            type: 'split'
          },
          {
            name: 'Polar MO4H080SAX multi kültéri egység',
            watts: 8100,
            type: 'multi split'
          },
        ],
        headerTypes: [
          { text: 'Típus', align: 'left', value: 'name' },
          { text: ''}
        ],
        types: [
          { type: 'split' },
          { type: 'multi split' },
        ],  
      }  
    }
  }
</script>