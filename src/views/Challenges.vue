<template>
   <v-card>
    <v-card-title>
      <v-btn fab dark small color="indigo">
        <v-icon dark>add</v-icon>
      </v-btn>
      <span class="headline">
          Kihívások
      </span>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="keresés" single-line hide-details class="pt-0"></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="challenges" :search="search" hide-actions no-data-text="nincsenek kihívások">
        <template slot="items" slot-scope="props">
            <td class="text-xs-left">{{ props.item.title }}</td>
            <td class="text-xs-left">{{ props.item.description }}</td>
            <td class="text-xs-right">{{ props.item.awardedWatts }}</td>
            <td class="text-xs-right">{{ props.item.usersCompleted }} fő</td>
            <td class="text-xs-right">{{ props.item.usersActive }} fő</td>
            <td class="text-xs-right">{{ props.item.usersFailed }} fő</td>
            <td class="text-xs-right">{{ props.item.requiredWatts }}</td>
            <td class="text-xs-right">{{ props.item.requiredScans }}</td>
            <td class="text-xs-center">{{ props.item.requiredType }}</td>
            <td class="text-xs-right">{{ props.item.minimumWatts }}</td>
            <td class="text-xs-right">{{ props.item.maximumWatts }}</td>
            <td class="text-xs-center">
              <v-icon v-if="props.item.active">check</v-icon>
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
          { text: 'Cím', align: 'left', value: 'title' },
          { text: 'Szöveg', align: 'left', value: 'description' },
          { text: 'Watt érték', align: 'right', value: 'awardedWatts' },
          { text: 'Teljesítve', align: 'right', value: 'usersCompleted' },
          { text: 'Aktív', align: 'right', value: 'usersActive' },
          { text: 'Sikertelen', align: 'right', value: 'usersFailed' },
          { text: 'Összes Watt', align: 'right', value: 'requiredWatts' },
          { text: 'Összes Scan', align: 'right', value: 'requiredScans' },
          { text: 'Típus', align: 'center', value: 'requiredType' },
          { text: 'Min Watt', align: 'right', value: 'minimumWatts' },
          { text: 'Max Watt', align: 'right', value: 'maximumWatts' },
          { text: 'Aktív', align: 'center', value: 'active' },
          { text: ''}
        ],
        challenges: [
          {
            title: 'Első Scan',
            description: 'Csippantsd be az első szerelésed!',
            awardedWatts: 5000,
            usersCompleted: 8,
            usersActive: 5,
            usersFailed: 1,
            requiredWatts: null,
            requiredScans: 1,
            requiredType: null,
            minimumWatts: null,
            maximumWatts: null,
            active: true
          },
          {
            title: 'Multizás',
            description: 'Csippants három multi split készülékeket!',
            awardedWatts: 8000,
            usersCompleted: 1,
            usersActive: 5,
            usersFailed: 4,
            requiredWatts: null,
            requiredScans: 3,
            requiredType: 'multi split',
            minimumWatts: null,
            maximumWatts: null,
            active: true
          },
          {
            title: 'Merj nagyot',
            description: 'Csippants két legalább 5000W-os árut!',
            awardedWatts: 100000,
            usersCompleted: 3,
            usersActive: 3,
            usersFailed: 4,
            requiredWatts: null,
            requiredScans: 2,
            requiredType: null,
            minimumWatts: null,
            maximumWatts: 5000,
            active: true
          },
          {
            title: 'Sok kicsi sokra megy',
            description: 'Csippants összesen 20000 W-nyi készüléket!',
            awardedWatts: 100000,
            usersCompleted: 3,
            usersActive: 5,
            usersFailed: 2,
            requiredWatts: 20000,
            requiredScans: null,
            requiredType: null,
            minimumWatts: null,
            maximumWatts: null,
            active: true
          },
        ]
      }
    }
  }
</script>