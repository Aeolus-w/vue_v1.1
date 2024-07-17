<template>
  <div>
    <h2 class="text-center">All Files</h2>

    <div class="bs-example" data-example-id="hoverable-table">
      <table class="table table-hover table-responsive table-condensed table-striped">
        <thead>
          <tr>
            <th class="text-center">File Source</th>
            <th class="text-center">File Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(ip, filename) in allfiles" :key="filename" @click="showModal(filename)">
            <td class="text-nowrap text-center">{{ ip }}</td>
            <td class="text-center text-nowrap">
              <a href="#" @click.prevent="openFile(filename)">{{ filename }}</a>
            </td>
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
      allfiles: {} // Initialize as an empty object
    };
  },
  created() {
    // Fetch data on component creation
    this.fetchAllFiles();
  },
  methods: {
    fetchAllFiles() {
      // Simulate fetching data from your backend or API
      // Replace with actual fetch logic
      // Example data
      this.allfiles = {
        "file1.txt": "192.168.1.1",
        "file2.jpg": "192.168.1.2",
        "file3.pdf": "192.168.1.3"
      };
    },
    showModal(filename) {
      // Handle modal display logic here
      console.log('Showing modal for:', filename);
      // Example AJAX request (replace with your actual endpoint)
      $.ajax({
        type: "GET",
        url: "/allfile?file=" + filename,
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
    openFile(filename) {
      // Logic to open the file directly (if needed)
      console.log('Opening file:', filename);
      // Implement logic to open file, e.g., download or view
    }
  }
};
</script>

<style scoped>
/* Add scoped styles if necessary */
</style>
