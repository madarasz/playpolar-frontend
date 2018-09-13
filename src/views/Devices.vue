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
                    <td class="text-xs-left">{{ getDeviceTypeNameFromId(props.item.typeId) }}</td>
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
                  <v-icon dark @click.native="deviceTypeDialog.visible = true">add</v-icon>
                </v-btn>
                <span class="headline">
                    Készülék típusok
                </span>
                <v-spacer></v-spacer>
            </v-card-title>
            <v-data-table :headers="headerTypes" :items="types" hide-actions no-data-text="nincsenek készülék típusok">
                <template slot="items" slot-scope="props">
                    <td class="text-xs-left">{{ props.item.type }}</td>
                    <td class="text-xs-right">{{ getDeviceCountForTypeId(props.item.id) }}</td>
                    <td class="text-xs-right">
                        <v-btn dark fab small color="red" v-if="props.item.amount == 0">
                          <v-icon dark @click.native="deleteDeviceType(props.item.id)">delete</v-icon>
                        </v-btn>
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
                          :items="deviceTypeListForSelector"
                          label="Típus"
                          v-model="deviceDialog.values.typeId"
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

        <!-- Keszulekek tipus form dialog -->
        <v-layout row justify-center>
          <v-dialog v-model="deviceTypeDialog.visible" persistent max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">Készülék típus</span>
              </v-card-title>
              <v-card-text>
                <v-form ref="deciveForm" v-model="deviceTypeDialog.valid">
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12>
                        <v-text-field label="Típus megnevezés" required :rules="requiredRule" v-model="deviceTypeDialog.values.type"></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="deviceTypeDialog.visible = false">Mégsem</v-btn>
                <v-btn color="info" @click.native="deviceTypeDialog.values.id ? editDeviceType(deviceTypeDialog.values.id) : addNewDeviceType()" :disabled="!deviceTypeDialog.valid">
                  <span v-if="this.deviceTypeDialog.values.id">Mentés</span>
                  <span v-if="!this.deviceTypeDialog.values.id">Hozzáadás</span>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-layout>
    </div>
</template>

<script>
  import { mapState } from 'vuex';

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
      },
      // adds new device type
      addNewDeviceType() {
        this.$store.dispatch('devices/saveNewDeviceType', this.deviceTypeDialog.values);
        this.deviceTypeDialog.visible = false;
      },
      // edits device TODO
      editDeviceType(id) {
        for (var i = 0; i < this.types.length; i++) {
          if (this.types[i].id == id) {
            this.types.splice(i, 1);
            this.types.push(this.deviceTypeDialog.values);
            this.deviceTypeDialog.visible = false;
            break;
          }
        }
      },
      // deletes device TODO
      deleteDeviceType(id) {
        for (var i = 0; i < this.types.length; i++) {
          if (this.types[i].id == id) {
            this.types.splice(i, 1);
            break;
          }
        }
      },
      // number of devices with a certain type
      getDeviceCountForTypeId(id) {
        return this.devices.filter(t => t.typeId == id).length;
      },
      getDeviceTypeNameFromId(id) {
        return this.types.filter(t => t.id == id)[0].type;
      }
    },
    data () {
      return {
        searchDevices: '',
        deviceDialog: {
          visible: false,
          valid: true,
          values: { name: '', watts: '', typeId: 0, id: null, forScanning: 0, scanned: 0 }
        },
        deviceTypeDialog: {
          visible: false,
          valid: true,
          values: { type: '', id: null, amount: 0 }
        },
        requiredRule: [ v => !!v || 'kötelező mező' ],
        headerDevices: [
          { text: 'Megnevezés', align: 'left', value: 'name' },
          { text: 'Watt pontok', align: 'right', value: 'watts' },
          { text: 'Típus', align: 'right', value: 'type' },
          { text: 'QR scannelhető', align: 'right', value: 'forScanning' },
          { text: 'QR scannelt', align: 'right', value: 'scanned' },
          { text: ''}
        ],
        headerTypes: [
          { text: 'Típus', align: 'left', value: 'name' },
          { text: 'Készülék db', align: 'right', value: 'amount' },
          { text: ''}
        ]
      }  
    },
    computed: {
      // data coming from vuex store
      ...mapState('devices', { 
        devices: 'devices', 
        types: 'deviceTypes'
      }),
      // generates device type array for selector element
      deviceTypeListForSelector() {
        return this.types.map(t => ({ text: t.type, value: t.id }));
      }  
    }
  }
</script>