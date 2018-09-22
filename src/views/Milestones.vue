<template>
   <v-card>
    <v-card-title>
      <v-btn fab dark small color="indigo">
        <v-icon dark>add</v-icon>
      </v-btn>
      <span class="headline">
          Mérföldkövek
      </span>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="keresés" single-line hide-details class="pt-0"></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="milestones" :search="search" hide-actions no-data-text="nincsenek kihívások">
        <template slot="items" slot-scope="props">
            <td class="text-xs-right">{{ props.item.level }}</td>
            <td class="text-xs-left">{{ props.item.title }}</td>
            <td class="text-xs-right">{{ props.item.requiredWatts }}</td>
            <td class="text-xs-right">{{ props.item.usersCompleted }} fő</td>
            <td class="text-xs-left">{{ props.item.prize }}</td>
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
  import { mapState } from 'vuex';

  export default {
    data () {
      return {
        search: '',
        headers: [
          { text: 'Szint', align: 'right', value: 'level' },
          { text: 'Cím', align: 'left', value: 'title' },
          { text: 'Watt érték', align: 'right', value: 'requiredWatts' },
          { text: 'Teljesítve', align: 'right', value: 'usersCompleted' },
          { text: 'Ajándék', align: 'left', value: 'prize' },
          { text: 'Aktív', align: 'center', value: 'active' },
          { text: ''}
        ]
      }
    },
    computed: {
      // data coming from vuex store
      ...mapState('milestones', { 
        milestones: 'milestones'
      }),
    }
  }
</script>