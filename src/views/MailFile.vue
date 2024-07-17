<template>
  <div>
    <h2 class="text-center">Mail File</h2>

    <div class="bs-example" data-example-id="hoverable-table">
      <table class="table table-hover table-responsive table-condensed table-striped">
        <thead>
          <tr>
            <th class="text-center">File Source IP</th>
            <th class="text-center">File Name</th>
            <th class="text-center">File Size</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(mail, index) in mailList" :key="index" @click="showModal(mail)">
            <td class="text-nowrap text-center">{{ mail.ip_port }}</td>
            <td class="text-center text-nowrap">
              <a href="#" @click.prevent="openFile(mail)">{{ extractFileName(mail.filename) }}</a>
            </td>
            <td class="text-center text-nowrap">{{ mail.size }}KB</td>
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
            <h4 class="modal-title" id="myModalLabel">File Details</h4>
          </div>
          <div class="modal-body" style="height:400px; overflow-x: hidden; overflow-y:auto;">
            <div class="container-fluid">
              <div class="accordion" id="accordion">
                <div class="file-content"></div>
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
      mailList: [] // Initialize as an empty array
    };
  },
  created() {
    // Fetch data on component creation
    this.fetchMailList();
  },
  methods: {
    fetchMailList() {
      // Simulate fetching data from your backend or API
      // Replace with actual fetch logic
      // Example data
      this.mailList = [
        { ip_port: "192.168.1.1", filename: "/path/to/mail1.txt", size: 1024 },
        { ip_port: "192.168.1.2", filename: "/path/to/mail2.jpg", size: 2048 },
        { ip_port: "192.168.1.3", filename: "/path/to/mail3.pdf", size: 3072 }
      ];
    },
    showModal(mail) {
      // Handle modal display logic here
      console.log('Showing modal for:', mail);
      // Example AJAX request (replace with your actual endpoint)
      $.ajax({
        type: "GET",
        url: "/mailfile?file=" + this.extractFileName(mail.filename),
        dataType: "html",
        cache: false,
        success: function(response) {
          $(".file-content").html(response);
          $('#myModal').modal('show'); // Show modal after content is loaded
        },
        error: function(error) {
          console.error('Error fetching file data:', error);
          // Handle error scenarios if needed
        }
      });
    },
    openFile(mail) {
      // Logic to open the file directly (if needed)
      console.log('Opening file:', mail);
      // Implement logic to open file, e.g., download or view
    },
    extractFileName(filepath) {
      // Extracts the filename from the full filepath
      return filepath.split('/').pop().split('_').pop();
    }
  }
};
</script>

<style scoped>
/* Add scoped styles if necessary */
</style>
