<template>
  <div>
    <div class="container">
      <h2 class="text-center">Data Packet Basic Information</h2>
    </div>
    <br>

    <div class="container">
      <form class="form-inline" @submit.prevent="filterData">
        <div class="form-group">
          <label for="proto">Protocol Filtering:</label>&nbsp;&nbsp;
          <select class="form-select" v-model="filterType">&nbsp;&nbsp;
            <option value="all" selected>ALL</option>
            <option value="proto">PROTOCOL</option>
            <option value="ipsrc">SOURCE ADDRESS</option>
            <option value="ipdst">DESTINATION ADDRESS</option>
          </select>&nbsp;&nbsp;
          <input type="text" class="form-select" id="proto" v-model="filterValue">&nbsp;&nbsp;
        </div>
        <button type="submit" class="btn btn-success">&nbsp;FILTRATION&nbsp;</button>&nbsp;&nbsp;
        <button type="button" class="btn btn-info" @click="clearFilter">&nbsp;CLEAR&nbsp;</button>
      </form>
    </div>

    <br>
    <div class="bs-example" data-example-id="hoverable-table">
      <table class="table table-hover table-responsive table-condensed table-striped">
        <thead>
          <tr>
            <th class="text-center">No</th>
            <th class="text-center">Time</th>
            <th class="text-center">Source Address</th>
            <th class="text-center">Destination Address</th>
            <th class="text-center">Protocol</th>
            <th class="text-center">Length</th>
            <th class="text-left">Summary Information</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(pcap, index) in pcaps" :key="index" @click="showDetails(index)">
            <th scope="row" class="text-center">{{ index + 1 }}</th>
            <td class="text-nowrap text-center">{{ pcap.time }}</td>
            <td class="text-center">{{ pcap.source }}</td>
            <td class="text-center">{{ pcap.destination }}</td>
            <td class="text-center text-nowrap">{{ pcap.protocol }}</td>
            <td class="text-center text-nowrap">{{ pcap.length }}</td>
            <td class="text-left text-nowrap">{{ pcap.info }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <b-modal id="myModal" title="Data Packet Detail" @hide="clearModal">
      <div class="modal-body">
        <div class="container-fluid">
          <div class="accordion" id="accordion">
            <div v-html="modalData"></div>
          </div>
        </div>
      </div>
      <template #modal-footer>
        <b-button variant="secondary" @click="$bvModal.hide('myModal')">Close</b-button>
        <b-button variant="info" @click="savePdf">Save as PDF</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';
import { BModal, BButton } from 'bootstrap-vue-next';

export default {
  components: {
    BModal,
    BButton,
  },
  data() {
    return {
      filterType: 'all',
      filterValue: '',
      pcaps: [], // Replace this with actual data
      modalData: '',
      currentId: null,
    };
  },
  methods: {
    filterData() {
      // Add your filtering logic here
    },
    clearFilter() {
      this.filterValue = '';
    },
    showDetails(id) {
      this.currentId = id;
      axios
        .get(`/datashow?id=${id}`)
        .then(response => {
          this.modalData = response.data;
          this.$bvModal.show('myModal');
        })
        .catch(error => {
          console.error(error);
        });
    },
    clearModal() {
      this.modalData = '';
    },
    savePdf() {
      if (this.currentId !== null) {
        axios
          .get(`/savepdf?id=${this.currentId}`)
          .then(response => {
            // Use response or confirm operation success
            console.log('PDF saved:', response); // Example: logging response
          })
          .catch(error => {
            console.error('Error saving PDF:', error);
          });
      }
    },
  },
};
</script>

<style scoped>
.container {
  margin-bottom: 20px;
}

h2 {
  margin-bottom: 20px;
  font-weight: bold;
  color: #2c3e50;
}

.form-inline {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form-group {
  display: flex;
  align-items: center;
}

.form-select, .form-control {
  margin-right: 10px;
  padding: 5px;
}

.btn {
  padding: 5px 15px;
}

.table {
  margin-top: 20px;
  background-color: #fff;
}

.table-hover tbody tr:hover {
  background-color: #f5f5f5;
}

.table-responsive {
  overflow-x: auto;
}

.table-condensed th, .table-condensed td {
  padding: 8px;
}

.text-center {
  text-align: center;
}

.text-nowrap {
  white-space: nowrap;
}

.bs-example {
  padding: 15px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.b-modal .modal-body {
  padding: 20px;
}

.b-modal .modal-footer {
  display: flex;
  justify-content: flex-end;
  padding: 10px 20px;
}

.accordion {
  margin-top: 20px;
}
</style>