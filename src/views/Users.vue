<template>
  <div>
    <v-expansion-panel popout v-model="panels" expand>
      <!-- Felhasználók tábla -->
      <v-expansion-panel-content>
        <div slot="header" class="headline">Felhasználók</div>
        <v-card>
          <v-card-title>
              <v-spacer></v-spacer>
              <v-text-field v-model="searchUsers" append-icon="search" label="keresés" single-line hide-details class="pt-0"></v-text-field>
          </v-card-title>
          <v-data-table :headers="headerUsers" :items="users" :search="searchUsers" hide-actions no-data-text="nincsenek felhasználók">
            <template slot="items" slot-scope="props">
                <td class="text-xs-left">{{ props.item.name }}</td>
                <td class="text-xs-right">{{ props.item.points }}</td>
                <td class="text-xs-right">{{ props.item.scans }}</td>
                <td class="text-xs-center">
                  <v-icon v-if="props.item.fb">check</v-icon>
                </td>
                <td class="text-xs-left">{{ props.item.lastActive }}</td>
                <td class="text-xs-right">
                  <v-btn color="success" @click.native="prepareUserDetailsDialog(props.item.id)">részletek</v-btn>
                </td>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Nincs találat "{{ searchUsers }}" kifejezésre.
            </v-alert>
          </v-data-table>
        </v-card>
      </v-expansion-panel-content>

      <!-- Meghívottak tábla -->
      <v-expansion-panel-content>
        <div slot="header" class="headline">Meghívott, még nem regisztráltak</div>
        <v-card>
          <v-card-title>
              <v-spacer></v-spacer>
              <v-text-field v-model="searchInvites" append-icon="search" label="keresés" single-line hide-details class="pt-0"></v-text-field>
          </v-card-title>
          <v-data-table :headers="headerInvites" :items="invites" :search="searchInvites" hide-actions no-data-text="nincsenek meghívottak">
            <template slot="items" slot-scope="props">
                <td class="text-xs-left">{{ props.item.name }}</td>
                <td class="text-xs-left">{{ props.item.invitedBy }}</td>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Nincs találat "{{ searchInvites }}" kifejezésre.
            </v-alert>
          </v-data-table>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>  

    <!-- Keszulekek form dialog -->
    <v-layout row justify-center>
      <v-dialog v-model="userDetailsDialog" scrollable max-width="70%">
        <v-card style="height: 80%">
          <v-card-title class="title">{{ userDetails.data.name }}</v-card-title>
          <v-divider></v-divider>
          <!-- Listas adatok -->
          <v-card-text class="text-xs-left">
            <v-list dense style="width: 400px;">
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Watt pontok:</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-content>
                  <v-list-tile-sub-title class="text-xs-right">{{ userDetails.data.points }}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Scannelések:</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-content>
                  <v-list-tile-sub-title class="text-xs-right">{{ userDetails.data.scans }}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Email cím:</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-content>
                  <v-list-tile-sub-title class="text-xs-right">{{ userDetailsStore.email }}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Regisztráció:</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-content>
                  <v-list-tile-sub-title class="text-xs-right">{{ userDetailsStore.registeredOn }}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Utolsó aktivitás:</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-content>
                  <v-list-tile-sub-title class="text-xs-right">{{ userDetails.data.lastActive }}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card-text>
          <v-divider></v-divider>
          <!-- Rendelesek tablazat -->
          <v-card-title class="subheading font-weight-bold pb-0">Rendelései</v-card-title>
          <v-data-table :headers="headerUserOrders" :items="userDetailsStore.orders" hide-actions no-data-text="nincsenek rendelései" class="smaller">
            <template slot="items" slot-scope="props">
                <td class="text-xs-left">{{ props.item.prizeName }}</td>
                <td class="text-xs-right">{{ props.item.wattPrice }}</td>
                <td class="text-xs-center">{{ props.item.orderedOn }}</td>
                <td class="text-xs-center">{{ props.item.status }}</td>
            </template>
          </v-data-table>
          <v-divider></v-divider>
          <!-- Scanennelt QR kodok tablazat -->
          <v-card-title class="subheading font-weight-bold pb-0">Scannelt QR kódok</v-card-title>
          <v-data-table :headers="headerUserScans" :items="userDetailsStore.scans" hide-actions no-data-text="nincsenek scannelései" class="smaller">
            <template slot="items" slot-scope="props">
                <td class="text-xs-left">{{ props.item.deviceName }}</td>
                <td class="text-xs-right">{{ props.item.wattPoints }}</td>
                <td class="text-xs-center">{{ props.item.deviceType }}</td>
                <td class="text-xs-center">{{ props.item.scannedOn }}</td>
            </template>
          </v-data-table>
          <v-divider></v-divider>
          <!-- Meghívottak tablazat -->
          <v-card-title class="subheading font-weight-bold pb-0">Meghívottjai</v-card-title>
          <v-data-table :headers="headerUserInvites" :items="userDetailsStore.invites" hide-actions no-data-text="nincsenek meghívottjai" class="smaller">
            <template slot="items" slot-scope="props">
                <td class="text-xs-left">{{ props.item.inviteName }}</td>
                <td class="text-xs-center">
                  <v-icon v-if="props.item.isRegistered">check</v-icon>
                </td>
                <td class="text-xs-right">{{ props.item.wattPoints }}</td>
                <td class="text-xs-right">{{ props.item.scans }}</td>
            </template>
          </v-data-table>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="userDetailsDialog = false">Bezár</v-btn>
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
      prepareUserDetailsDialog(id) {
        for (var i = 0; i < this.users.length; i++) {
          if (this.users[i].id == id) {
            this.userDetails.data = this.users[i];
          }
        }
        this.userDetailsDialog = true;
      }
    },
    data () {
      return {
        searchUsers: '',
        searchInvites: '',
        userDetailsDialog: false,
        userDetails: {
          data: { 
            name: '', 
            points: 0, 
            scans: 0, 
            fb: false, 
            lastActive: ''
          },
        },
        panels: [true, true],  // default panel state
        headerUsers: [
          { text: 'Név', align: 'left', value: 'name' },
          { text: 'Watt pontok', align: 'right', value: 'points' },
          { text: 'Scan db', align: 'right', value: 'scans' },
          { text: 'Facebook', align: 'center', value: 'fb' },
          { text: 'Utolsó aktivitás', align: 'left', value: 'lastActive' },
          { text: ''}
        ],
        headerInvites: [
          { text: 'Név', align: 'left', value: 'name' },
          { text: 'Meghívta', align: 'left', value: 'invitedBy' },
        ],
        headerUserOrders: [
          { text: 'Ajándék', align: 'left', value: 'prizeName' },
          { text: 'Watt érték', align: 'right', value: 'wattPrice' },
          { text: 'Rendelés ideje', align: 'center', value: 'orderedOn' },
          { text: 'Státusz', align: 'center', value: 'status' }
        ],
        headerUserScans: [
          { text: 'Készülék', align: 'left', value: 'deviceName' },
          { text: 'Watt érték', align: 'right', value: 'wattPoints' },
          { text: 'Típus', align: 'center', value: 'deviceType' },
          { text: 'Scannelés ideje', align: 'center', value: 'scannedOn' }
        ],
        headerUserInvites: [
          { text: 'Meghívott neve', align: 'left', value: 'inviteName' },
          { text: 'Regisztrált', align: 'center', value: 'isRegistered' },
          { text: 'Watt pontok', align: 'right', value: 'wattPoints' },
          { text: 'Scannalések száma', align: 'right', value: 'scans' }
        ],
      }
    },
    computed: {
      ...mapState('users', { 
        users: 'users', 
        invites: 'invites', 
        userDetailsStore: 'userDetails'
      })
    }
  }
</script>