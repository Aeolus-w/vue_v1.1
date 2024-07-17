<template>
  <div class="container">
    <h2 class="text-center">Mail Connection Data</h2>
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
          <tr v-for="(mail, index) in maildata" :key="index" @click="showModal(mail.data_id)">
            <th scope="row" class="text-center">{{ mail.data_id }}</th>
            <td class="text-nowrap text-center">{{ formatConnection(mail.ip_port) }}</td>
            <td class="text-nowrap text-center">{{ mail.ip_port.split(':')[2] }}</td>
            <td class="text-left text-nowrap">{{ mail.data.slice(0, 100) }}</td>
            <td class="text-center">{{ mail.lens }}KB</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 模态框（Modal） -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="width:600px; margin: 0 auto; word-break: break-all">
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
                <input type="hidden" class="dataid" :value="selectedMailId"/>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-info" data-dismiss="modal" @click="viewRawData">Raw Data</button>
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
    maildata: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedMailId: null
    };
  },
  methods: {
    showModal(dataId) {
      // Update modal data with fetched data
      $.ajax({
        type: "GET",
        url: "/maildata?id=" + dataId,
        dataType: "html",
        cache: false,
        success: (response) => {
          $(".mydata").html(response);
          this.selectedMailId = dataId;
        }
      });
    },
    formatConnection(ipPort) {
      // Format IP:Port from ip_port field
      const parts = ipPort.split(':');
      return `${parts[0]}:${parts[1]}`;
    },
    viewRawData() {
      // Redirect to raw data page
      if (this.selectedMailId) {
        window.location.href = `/maildata?datatype=raw&id=${this.selectedMailId}`;
      }
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
