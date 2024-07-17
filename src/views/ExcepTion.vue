<template>
  <div>
    <h2 class="text-center">Abnormal Data Warning</h2>

    <div class="bs-example" data-example-id="hoverable-table">
      <table class="table table-hover table-responsive table-condensed table-striped">
        <thead>
          <tr>
            <th class="text-center">No</th>
            <th class="text-center">Suspect Address(IP/MAC)</th>
            <th class="text-center">Abnormal Information</th>
            <th class="text-center">Time/Frequency/Data</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(warn, index) in warning" :key="index" @click="showModal(warn)">
            <th scope="row" class="text-center">{{ index + 1 }}</th>
            <td class="text-nowrap text-center">{{ warn.ip_port }}</td>
            <td class="text-center text-nowrap">{{ warn.warn }}</td>
            <td class="text-center text-nowrap">{{ warn.time }}</td>
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
      warning: []
    };
  },
  methods: {
    showModal(warn) {
      // Handle modal display logic here
      console.log('Showing modal for:', warn);
      // Example AJAX request (replace with your actual endpoint)
      $.ajax({
        type: "GET",
        url: "/exceptinfo?id=" + warn.id,
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
