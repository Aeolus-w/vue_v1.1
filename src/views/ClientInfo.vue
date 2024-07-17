<template>
  <div class="container">
    <h2 class="text-center">Client Information</h2>
    <br>

    <div class="bs-example" data-example-id="hoverable-table">
      <table class="table table-hover table-responsive table-condensed table-striped">
        <thead>
          <tr>
            <th class="text-center">No</th>
            <th class="text-center">Data Flow</th>
            <th class="text-center">Source MAC Address</th>
            <th class="text-center">Destination MAC Address</th>
            <th class="text-center">Source IP Address</th>
            <th class="text-center">Target IP Address</th>
            <th class="text-center">Client Information</th>
            <th class="text-center">Time</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(client, index) in clientinfos" :key="index" @click="showModal(client)">
            <th scope="row" class="text-center">{{ index + 1 }}</th>
            <td class="text-nowrap text-center">{{ client.sess }}</td>
            <td class="text-center text-nowrap">{{ client.ether_src }}</td>
            <td class="text-center text-nowrap">{{ client.ether_dst }}</td>
            <td class="text-center text-nowrap">{{ client.ip_src }}</td>
            <td class="text-center text-nowrap">{{ client.ip_dst }}</td>
            <td class="text-center text-nowrap">{{ client.clients }}</td>
            <td class="text-center text-nowrap">{{ client.time }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    clientinfos: {
      type: Array,
      required: true
    }
  },
  methods: {
    showModal(client) {
      // Implement modal show logic here
      console.log('Clicked client:', client);
      // Example: Trigger your modal display logic
      // this.$emit('show-modal', client); // Emit event to parent component
    }
  }
};
</script>

<style scoped>
/* Add scoped styles if necessary */
</style>
