<template>
  <div>
    <h2 class="text-center">Web Connection Data</h2>

    <div class="bs-example" data-example-id="hoverable-table">
      <table class="table table-hover table-responsive table-condensed table-striped">
        <thead>
          <tr>
            <th class="text-center">No</th>
            <th class="text-center">Connection</th>
            <th class="text-center">Protocol</th>
            <th class="text-center">Connection Summary</th>
            <th class="text-center">Data size</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(web, index) in webdata" :key="index" @click="showModal(web)">
            <th scope="row" class="text-center">{{ web.data_id }}</th>
            <td class="text-nowrap text-center">{{ web.ip_port.split(':')[0] }}:{{ web.ip_port.split(':')[1] }}</td>
            <td class="text-nowrap text-center">HTTP</td>
            <td class="text-left text-nowrap">{{ web.data.substring(0, 100) }}</td>
            <td class="text-center">{{ web.lens }}KB</td>
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
      webdata: []
    };
  },
  methods: {
    showModal(web) {
      // Handle modal display logic here
      console.log('Showing modal for:', web);
      // Example AJAX request (replace with your actual endpoint)
      $.ajax({
        type: "GET",
        url: "/webdata?id=" + web.data_id,
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
