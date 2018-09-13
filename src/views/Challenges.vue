<template>
   <v-card>
    <v-card-title>
      <v-btn fab dark small color="indigo">
        <v-icon dark>add</v-icon>
      </v-btn>
      <span class="headline">
          Kihívások
      </span>
      <v-btn color="info" v-if="orderChanged">Sorrend mentése</v-btn>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="keresés" single-line hide-details class="pt-0"></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="challenges" :search="search" hide-actions no-data-text="nincsenek kihívások">
        <template slot="items" slot-scope="props">
            <td class="handle" style="max-width: 28px;">::</td>
            <td class="text-xs-left">{{ props.item.title }}</td>
            <td class="text-xs-left">{{ props.item.description }}</td>
            <td class="text-xs-right">{{ props.item.awardedWatts }}</td>
            <td class="text-xs-center">
              {{ props.item.usersCompleted }} / {{ props.item.usersActive }} / {{ props.item.usersFailed }} fő
            </td>
            <td class="text-xs-center">
              <span v-if="props.item.requiredWatts">{{ props.item.requiredWatts }}W összesen</span>
              <span v-if="props.item.requiredScans">{{ props.item.requiredScans }} scan</span>
              <span v-if="props.item.requiredInvites">{{ props.item.requiredInvites }} meghívás</span>
            </td>
            <td class="text-xs-left">
              <span v-if="props.item.requiredType">típus: {{ props.item.requiredType }}</span>
              <span v-if="props.item.minimumWatts">min: {{ props.item.minimumWatts }}W</span>
              <span v-if="props.item.maximumWatts">max: {{ props.item.maximumWatts }}W</span>
            </td>
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
  import Sortable from "sortablejs";
  import { mapState } from 'vuex';

  export default {
    mounted() {
      let table = document.querySelector(".v-datatable tbody");
      const _self = this;
      Sortable.create(table, {
        handle: ".handle", // Use handle so user can select text
        onEnd({ newIndex, oldIndex }) {
          /* eslint-disable no-console */
          console.log(newIndex, oldIndex);
          // insert switching logic here
          _self.orderChanged = true;
        }
      });
    },
    data () {
      return {
        search: '',
        orderChanged: false,
        headers: [
          { text: '', align: 'left', sortable: false },
          { text: 'Cím', align: 'left', value: 'title', sortable: false },
          { text: 'Szöveg', align: 'left', value: 'description', sortable: false },
          { text: 'Watt érték', align: 'right', value: 'awardedWatts', sortable: false },
          { text: 'Teljesítve / Aktív / Sikertelen', align: 'center', sortable: false },
          { text: 'Feltétel', align: 'right', sortable: false },
          { text: 'Korlátozás', align: 'center', sortable: false },
          { text: 'Aktív', align: 'center', value: 'active', sortable: false },
          { text: '', sortable: false}
        ],
      }
    },
    computed: {
      ...mapState('challenges', { challenges: 'challenges'})
    },
  }
</script>