<template>
  <div>
    <h2 class="text-center">FTP File</h2>

    <div class="bs-example" data-example-id="hoverable-table">
      <table class="table table-hover table-responsive table-condensed table-striped">
        <thead>
          <tr>
            <th class="text-center">File Source IP</th>
            <th class="text-center">File Name</th>
            <th class="text-center">File size</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(ftp, index) in ftpList" :key="index" @click="showModal(ftp)">
            <td class="text-nowrap text-center">{{ ftp.ip_port }}</td>
            <td class="text-center text-nowrap">
              <a href="#" @click.prevent="openFile(ftp)">{{ extractFileName(ftp.filename) }}</a>
            </td>
            <td class="text-center text-nowrap">{{ ftp.size }}KB</td>
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
      ftpList: [] // Initialize as an empty array
    };
  },
  created() {
    // Fetch data on component creation
    this.fetchFTPList();
  },
  methods: {
    fetchFTPList() {
      // Simulate fetching data from your backend or API
      // Replace with actual fetch logic
      // Example data
      this.ftpList = [
        { ip_port: "192.168.1.1", filename: "/path/to/file1.txt", size: 1024 },
        { ip_port: "192.168.1.2", filename: "/path/to/file2.jpg", size: 2048 },
        { ip_port: "192.168.1.3", filename: "/path/to/file3.pdf", size: 3072 }
      ];
    },
    showModal(ftp) {
      // Handle modal display logic here
      console.log('Showing modal for:', ftp);
      // Example AJAX request (replace with your actual endpoint)
      $.ajax({
        type: "GET",
        url: "/ftpfile?file=" + this.extractFileName(ftp.filename),
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
    openFile(ftp) {
      // Logic to open the file directly (if needed)
      console.log('Opening file:', ftp);
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
