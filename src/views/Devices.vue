<template>
    <div>
        <v-card>
            <v-card-title>
                <v-btn fab dark small color="indigo">
                  <v-icon dark>add</v-icon>
                </v-btn>
                <span class="headline">
                    Készülékek
                </span>
                <v-spacer></v-spacer>
                <v-text-field v-model="searchDevices" append-icon="search" label="keresés" single-line hide-details class="pt-0"></v-text-field>
                <div>
                  <v-btn color="purple" dark>QR nyomtatás</v-btn>
                </div>
            </v-card-title>
            <v-data-table :headers="headerDevices" :items="devices" :search="searchDevices" hide-actions no-data-text="nincsenek készülékek">
                <template slot="items" slot-scope="props">
                    <td class="text-xs-left">{{ props.item.name }}</td>
                    <td class="text-xs-right">{{ props.item.watts }}</td>
                    <td class="text-xs-left">{{ props.item.type }}</td>
                    <td class="text-xs-right">{{ props.item.forScanning }}</td>
                    <td class="text-xs-right">{{ props.item.scanned }}</td>
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
                <v-btn fab dark small color="indigo">
                  <v-icon dark>add</v-icon>
                </v-btn>
                <span class="headline">
                    Készülék típusok
                </span>
                <v-spacer></v-spacer>
            </v-card-title>
            <v-data-table :headers="headerTypes" :items="types" :search="searchTypes" hide-actions no-data-text="nincsenek készülék típusok">
                <template slot="items" slot-scope="props">
                    <td class="text-xs-left">{{ props.item.type }}</td>
                    <td class="text-xs-right">{{ props.item.amount }}</td>
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
          { text: 'QR scannelhető', align: 'right', value: 'forScanning' },
          { text: 'QR scannelt', align: 'right', value: 'scanned' },
          { text: ''}
        ],
        devices: [
          {
            name: 'POLAR SIEH0025SDA/SO1H0025SDA',
            watts: 2500,
            type: 'split',
            forScanning: 0,
            scanned: 12
          },
          {
            name: 'Bosch Climate 5000 9000BTU',
            watts: 2900,
            type: 'split',
            forScanning: 10,
            scanned: 0
          },
          {
            name: 'Bosch Climate 8500 9000BTU',
            watts: 2900,
            type: 'split',
            forScanning: 13,
            scanned: 12
          },
          {
            name: 'DAIKIN FTXG20LS/RXG20L klíma Emura - ezüst',
            watts: 2100,
            type: 'split',
            forScanning: 0,
            scanned: 50
          },
          {
            name: 'DAIKIN FTXZ25N/RXZ25N',
            watts: 2500,
            type: 'split',
            forScanning: 33,
            scanned: 42
          },
          {
            name: 'DAIKIN FLXS50B/RXS50L',
            watts: 4900,
            type: 'split',
            forScanning: 10,
            scanned: 0
          },
          {
            name: 'Polar MO4H080SAX multi kültéri egység',
            watts: 8100,
            type: 'multi split',
            forScanning: 0,
            scanned: 0
          },
        ],
        headerTypes: [
          { text: 'Típus', align: 'left', value: 'name' },
          { text: 'Készülék db', align: 'right', value: 'amount' },
          { text: ''}
        ],
        types: [
          { type: 'split', amount: 6 },
          { type: 'multi split', amount: 1 },
        ],  
      }  
    }
  }
</script>