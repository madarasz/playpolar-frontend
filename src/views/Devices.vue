<template>
    <div>
        <!-- Keszulekek tablazat -->
        <v-card>
            <v-card-title>
                <v-btn fab dark small color="indigo" @click.native="prepareModalForNewDevice()">
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
                      <v-btn dark fab small color="red" v-if="props.item.forScanning + props.item.scanned == 0">
                        <v-icon dark @click.native="deleteDevice(props.item.id)">delete</v-icon>
                      </v-btn>
                      <v-btn color="info" @click.native="prepareModalForEditDevice(props.item.id)">szerkesztés</v-btn>
                    </td>
                </template>
                <v-alert slot="no-results" :value="true" color="error" icon="warning">
                    Nincs találat "{{ searchDevices }}" kifejezésre.
                </v-alert>
            </v-data-table>
        </v-card>

        <!-- Keszulek tipusok tablazat -->
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
            <v-data-table :headers="headerTypes" :items="types" hide-actions no-data-text="nincsenek készülék típusok">
                <template slot="items" slot-scope="props">
                    <td class="text-xs-left">{{ props.item.type }}</td>
                    <td class="text-xs-right">{{ props.item.amount }}</td>
                    <td class="text-xs-right">
                        <v-btn color="info">szerkesztés</v-btn>
                    </td>
                </template>
            </v-data-table>
        </v-card>

        <!-- Keszulekek form dialog -->
        <v-layout row justify-center>
          <v-dialog v-model="deviceDialog.visible" persistent max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">Készülék</span>
              </v-card-title>
              <v-card-text>
                <v-form ref="deciveForm" v-model="deviceDialog.valid">
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12>
                        <v-text-field label="Megnevezés" required :rules="requiredRule" v-model="deviceDialog.values.name"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-text-field label="Watt érték" type="number" required :rules="requiredRule" v-model="deviceDialog.values.watts"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-select
                          :items="deviceTypeList"
                          label="Típus"
                          v-model="deviceDialog.values.type"
                        ></v-select>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="deviceDialog.visible = false">Mégsem</v-btn>
                <v-btn color="info" @click.native="deviceDialog.values.id ? editDevice(deviceDialog.values.id) : addNewDevice()" :disabled="!deviceDialog.valid">
                  <span v-if="this.deviceDialog.values.id">Mentés</span>
                  <span v-if="!this.deviceDialog.values.id">Hozzáadás</span>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-layout>
    </div>
</template>

<script>
  export default {
    methods: {
      // prepare device modal for new device entry
      prepareModalForNewDevice() {
        this.$refs.deciveForm.reset();
        this.deviceDialog.values.id = null;
        this.deviceDialog.visible = true;
      },
      // prepare device modal for editing device
      prepareModalForEditDevice(id) {
        for (var i = 0; i < this.devices.length; i++) {
          if (this.devices[i].id == id) {
            this.deviceDialog.values = JSON.parse(JSON.stringify(this.devices[i]));  // clone values to form
          }
        }
        this.deviceDialog.visible = true;
      },
      // adds new device
      addNewDevice() {
        this.deviceDialog.values.id = Math.floor(Math.random() * Math.floor(100000)) + 10; // random
        this.devices.push(this.deviceDialog.values);
        this.deviceDialog.visible = false;
      },
      // edits device
      editDevice(id) {
        for (var i = 0; i < this.devices.length; i++) {
          if (this.devices[i].id == id) {
            this.devices.splice(i, 1);
            this.devices.push(this.deviceDialog.values);
            this.deviceDialog.visible = false;
            break;
          }
        }
      },
      // deletes device
      deleteDevice(id) {
        for (var i = 0; i < this.devices.length; i++) {
          if (this.devices[i].id == id) {
            this.devices.splice(i, 1);
            break;
          }
        }
      }
    },
    data () {
      return {
        searchDevices: '',
        deviceDialog: {
          visible: false,
          valid: true,
          values: { name: '', watts: '', type: '', id: null, forScanning: 0, scanned: 0 }
        },
        requiredRule: [ v => !!v || 'kötelező mező' ],
        deviceTypeList: ['split', 'multi split'],
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
            id: 1,
            name: 'POLAR SIEH0025SDA/SO1H0025SDA',
            watts: 2500,
            type: 'split',
            forScanning: 0,
            scanned: 12
          },
          {
            id: 2,
            name: 'Bosch Climate 5000 9000BTU',
            watts: 2900,
            type: 'split',
            forScanning: 10,
            scanned: 0
          },
          {
            id: 3,
            name: 'Bosch Climate 8500 9000BTU',
            watts: 2900,
            type: 'split',
            forScanning: 13,
            scanned: 12
          },
          {
            id: 4,
            name: 'DAIKIN FTXG20LS/RXG20L klíma Emura - ezüst',
            watts: 2100,
            type: 'split',
            forScanning: 0,
            scanned: 50
          },
          {
            id: 5,
            name: 'DAIKIN FTXZ25N/RXZ25N',
            watts: 2500,
            type: 'split',
            forScanning: 33,
            scanned: 42
          },
          {
            id: 6,
            name: 'DAIKIN FLXS50B/RXS50L',
            watts: 4900,
            type: 'split',
            forScanning: 10,
            scanned: 0
          },
          {
            id: 7,
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