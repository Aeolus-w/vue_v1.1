<template>
  <div>
    <h2 class="text-center">Telnet Connection Data</h2>

    <div class="bs-example" data-example-id="hoverable-table">
      <table class="table table-hover table-responsive table-condensed table-striped">
        <thead>
          <tr>
            <th class="text-center">No</th>
            <th class="text-center">Connection</th>
            <th class="text-center">Protocol</th>
            <th class="text-center">Connection Summary</th>
            <th class="text-center">Data Size</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(telnet, index) in telnetdata" :key="index" @click="showModal(telnet)">
            <th scope="row" class="text-center">{{ telnet.data_id }}</th>
            <td class="text-nowrap text-center">{{ telnet.ip_port.split(':')[0] }}:{{ telnet.ip_port.split(':')[1] }}</td>
            <td class="text-nowrap text-center">Telnet</td>
            <td class="text-left text-nowrap">{{ telnet.data.substring(0, 100) }}</td>
            <td class="text-center">{{ telnet.lens }}KB</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="width:600px;margin: 0 auto; word-break: break-all">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalLabel">Connection Details</h4>
          </div>
          <div class="modal-body" style="height:400px; overflow-x: hidden; overflow-y:auto;">
            <div class="container-fluid">
              <div class="accordion" id="accordion">
                <div class="mydata"></div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
export default {
  data() {
    return {
      telnetdata: []
    };
  },
  methods: {
    showModal(telnet) {
      // Handle modal display logic here
      console.log('Showing modal for:', telnet);
      // Example AJAX request (replace with your actual endpoint)
      $.ajax({
        type: "GET",
        url: "/telnetdata?id=" + telnet.data_id,
        dataType: "html",
        cache: false,
        success: function(response) {
          $(".mydata").html(response);
          $('#myModal').modal('show'); // Show modal after content is loaded
        },
        error: function(error) {
          console.error('Error fetching data:', error);
          // Handle error scenarios if needed
        }
      });
    }
  }
};
</script>

<style scoped>
/* Add scoped styles if necessary */
</style>
