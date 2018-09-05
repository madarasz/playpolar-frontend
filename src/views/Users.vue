<template>
  <div>
    <!-- Felhasználók tábla -->
    <v-card>
      <v-card-title>
          <span class="headline">
              Felhasználók
          </span>
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
              <v-btn color="success">részletek</v-btn>
            </td>
        </template>
        <v-alert slot="no-results" :value="true" color="error" icon="warning">
            Nincs találat "{{ searchUsers }}" kifejezésre.
        </v-alert>
      </v-data-table>
    </v-card>

    <!-- Meghívottak tábla -->
    <v-card class="mt-4">
      <v-card-title>
          <span class="headline">
              Meghívott, még nem regisztráltak
          </span>
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
  </div>
</template>

<script>
  export default {
    data () {
      return {
        searchUsers: '',
        searchInvites: '',
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
        users: [
          {
            name: 'Nagy Béla',
            points: 38000,
            scans: 14,
            fb: true,
            lastActive: '2018.06.12. 13:04'
          },
          {
            name: 'Kiss Attila',
            points: 3000,
            scans: 2,
            fb: false,
            lastActive: '2018.07.10. 8:24'
          },
          {
            name: 'Tóth Tibor',
            points: 1000,
            scans: 1,
            fb: true,
            lastActive: '2018.09.04. 13:55'
          },
          {
            name: 'Kisfaludiné Erika',
            points: 12000,
            scans: 5,
            fb: false,
            lastActive: '2018.09.02. 12:00'
          },
          {
            name: 'Franci György',
            points: 8800,
            scans: 3,
            fb: false,
            lastActive: '2018.06.22. 17:03'
          },
          {
            name: 'Barna Frigyes',
            points: 12000,
            scans: 5,
            fb: true,
            lastActive: '2018.09.02. 12:00'
          },
          {
            name: 'Hajnal Andor',
            points: 17500,
            scans: 8,
            fb: true,
            lastActive: '2018.05.03. 13:13'
          },
          {
            name: 'Kis Béla',
            points: 11500,
            scans: 5,
            fb: true,
            lastActive: '2018.05.08. 13:03'
          },
        ],
        invites: [
          {
            name: 'Lugosi Béla',
            invitedBy: 'Kis Béla'
          },
          {
            name: 'Nagy Csongor',
            invitedBy: 'Barna Frigyes'
          },
        ]
      }
    }
  }
</script>