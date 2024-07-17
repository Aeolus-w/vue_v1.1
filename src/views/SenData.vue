<!-- SenData.vue -->

<template>
  <div>
    <div class="container">
      <h2 class="text-center">Sensitive Data</h2>
    </div>
    <br>
    <div class="bs-example" data-example-id="hoverable-table">
      <table class="table table-hover table-responsive table-condensed table-striped">
        <thead>
          <tr>
            <th class="text-center">No</th>
            <th class="text-center">Connection</th>
            <th class="text-center">Protocol</th>
            <th class="text-center">Data</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(sen, index) in sendata" :key="index" @click="fetchData(index + 1)">
            <th scope="row" class="text-center">{{ index + 1 }}</th>
            <td class="text-nowrap text-center">{{ sen['ip_port'].split(':')[0] }}:{{ sen['ip_port'].split(':')[1] }}</td>
            <td class="text-nowrap text-center">{{ sen['ip_port'].split(':')[2] }}</td>
            <td class="text-center text-nowrap">{{ sen['result'] }}</td>
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
  name: 'SenData',
  props: {
    sendata: Array
  },
  methods: {
    fetchData(id) {
      $.ajax({
        type: "GET",
        url: "/sendata?id=" + id,
        dataType: "html",
        cache: false,
        success: function(a) {
          $(".mydata").html(a);
        }
      });
    }
  },
  mounted() {
    $(this.$el).find('table > tbody > tr').click(function() {
      var id = $(this).children('th').eq(0).text();
      this.fetchData(id);
    }.bind(this));

    $(this.$el).find('#myModal').draggable({
      handle: ".modal-header"
    });
  }
};
</script>

<style>
/* 样式可以根据需要添加 */
</style>
