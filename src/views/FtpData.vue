<template>
  <div class="container">
    <h2 class="text-center">FTP Linked Data</h2>
    <br>

    <div class="bs-example" data-example-id="hoverable-table">
      <table class="table table-hover table-responsive table-condensed table-striped">
        <thead>
          <tr>
            <th class="text-center">No</th>
            <th class="text-center">Connection</th>
            <th class="text-center">Protocol</th>
            <th class="text-center">Protocol Summary</th>
            <th class="text-center">Data Size</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(ftp, index) in ftpdata" :key="index" @click="showModal(ftp.data_id)">
            <th scope="row" class="text-center">{{ ftp.data_id }}</th>
            <td class="text-nowrap text-center">{{ formatConnection(ftp.ip_port) }}</td>
            <td class="text-nowrap text-center">FTP</td>
            <td class="text-left text-nowrap">{{ ftp.data.slice(0, 100) }}</td>
            <td class="text-center">{{ ftp.lens }}KB</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 模态框（Modal） -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
         aria-hidden="true" style="width:600px; margin: 0 auto; word-break: break-all">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalLabel">Connection Details</h4>
          </div>
          <div class="modal-body" style="height: 400px; overflow-x: hidden; overflow-y: auto;">
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
  props: {
    ftpdata: {
      type: Array,
      required: true
    }
  },
  methods: {
    showModal(dataId) {
      // AJAX call to fetch data
      $.ajax({
        type: "GET",
        url: "/ftpdata?id=" + dataId,
        dataType: "html",
        cache: false,
        success: function (response) {
          $(".mydata").html(response);
        }
      });
    },
    formatConnection(ipPort) {
      // Format IP:Port from ip_port field
      const parts = ipPort.split(':');
      return `${parts[0]}:${parts[1]}`;
    }
  },
  mounted() {
    // Make modal draggable
    $("#myModal").draggable({
      handle: ".modal-header"
    });
  }
};
</script>

<style scoped>
/* Add scoped styles if necessary */
</style>
