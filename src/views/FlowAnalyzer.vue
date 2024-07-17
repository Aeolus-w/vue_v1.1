<template>
  <div>
    <div class="container" style="height: 400px; width: 90%">
      <div id="time_flow" style="height: 400px; width: 75%; float: left;"></div>
      <div id="flow_in_out" style="height: 400px; width: 25%; float: left;"></div>
    </div>
    <br />
    <div class="container" style="height: 400px; width: 90%">
      <div id="proto_flow_pie" style="height: 400px; width: 25%; float: left;"></div>
      <div id="proto_flow_bar" style="height: 400px; width: 50%; float: left;"></div>
      <div id="proto_flow_count" style="height: 400px; width: 25%; float: left;"></div>
    </div>
    <br />
    <div class="container" style="height: 400px; width: 90%">
      <div id="data_in_packet" style="height: 400px; width: 50%; float: left;"></div>
      <div id="data_out_packet" style="height: 400px; width: 50%; float: left;"></div>
    </div>
    <br />
    <div class="container" style="height: 400px; width: 90%">
      <div id="data_in_len" style="height: 400px; width: 50%; float: left;"></div>
      <div id="data_out_len" style="height: 400px; width: 50%; float: left;"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'TrafficAnalysis',
  props: {
    timeFlowKeys: Array,
    timeFlowValues: Array,
    dataFlow: Object,
    protoFlow: Array,
    mostFlowKey: Array,
    mostFlowDict: Object,
    ipFlow: Object,
  },
  mounted() {
    this.initTimeFlowChart();
    this.initFlowInOutChart();
    this.initProtoFlowBarChart();
    this.initProtoFlowPieChart();
    this.initProtoFlowCountChart();
    this.initDataInPacketChart();
    this.initDataOutPacketChart();
    this.initDataInLenChart();
    this.initDataOutLenChart();
  },
  methods: {
    initTimeFlowChart() {
      const myChart = echarts.init(document.getElementById('time_flow'));
      const option = {
        title: {
          text: 'time traffic diagram',
          x: 'center',
        },
        tooltip: {
          trigger: 'axis',
        },
        calculable: false,
        xAxis: [
          {
            type: 'category',
            name: 'relative time',
            boundaryGap: true,
            data: this.timeFlowKeys,
          },
        ],
        yAxis: [
          {
            type: 'value',
            name: 'data packet byte',
            axisLabel: {
              formatter: '{value} byte',
            },
          },
        ],
        series: [
          {
            name: 'data packet byte',
            type: 'line',
            smooth: true,
            symbol: 'none',
            itemStyle: {
              normal: {
                label: { show: true },
                color: '#6495ed',
              },
              emphasis: { label: { show: true } },
            },
            data: this.timeFlowValues,
          },
        ],
      };
      myChart.setOption(option);
    },
    initFlowInOutChart() {
      const myChart = echarts.init(document.getElementById('flow_in_out'));
      const option = {
        title: {
          text: 'inbound and outbound data statistics',
          x: 'center',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: ['inbound', 'outbound'],
        },
        calculable: false,
        series: [
          {
            name: 'inbound and outbound data',
            type: 'pie',
            radius: '60%',
            center: ['50%', '50%'],
            data: [
              { value: this.dataFlow.IN, name: 'inbound' },
              { value: this.dataFlow.OUT, name: 'outbound' },
            ],
          },
        ],
      };
      myChart.setOption(option);
    },
    initProtoFlowBarChart() {
      const myChart = echarts.init(document.getElementById('proto_flow_bar'));
      const option = {
        title: {
          text: 'common protocol traffic statistics',
          x: 'center',
        },
        tooltip: {
          show: true,
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            name: 'protocol type',
            boundaryGap: true,
            data: ['IP', 'IPv6', 'TCP', 'UDP', 'ARP', 'ICMP', 'DNS', 'HTTP', 'HTTPS', 'Others'],
          },
        ],
        yAxis: [
          {
            type: 'value',
            name: 'total traffic of protocol data packets',
          },
        ],
        series: [
          {
            name: 'total traffic of protocol data packets',
            type: 'bar',
            itemStyle: {
              normal: {
                label: { show: true },
                color: '#87cefa',
              },
              emphasis: { label: { show: true } },
            },
            data: this.protoFlow,
          },
        ],
      };
      myChart.setOption(option);
    },
    initProtoFlowPieChart() {
      const myChart = echarts.init(document.getElementById('proto_flow_pie'));
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'horizontal',
          x: 'left',
          data: ['IP', 'IPv6', 'TCP', 'UDP', 'ARP', 'ICMP', 'DNS', 'HTTP', 'HTTPS', 'Others'],
        },
        calculable: false,
        series: [
          {
            name: 'total traffic of protocol data packets',
            type: 'pie',
            radius: '60%',
            center: ['50%', '50%'],
            data: [
              { value: this.protoFlow[0], name: 'IP' },
              { value: this.protoFlow[1], name: 'IPv6' },
              { value: this.protoFlow[2], name: 'TCP' },
              { value: this.protoFlow[3], name: 'UDP' },
              { value: this.protoFlow[4], name: 'ARP' },
              { value: this.protoFlow[5], name: 'ICMP' },
              { value: this.protoFlow[6], name: 'DNS' },
              { value: this.protoFlow[7], name: 'HTTP' },
              { value: this.protoFlow[8], name: 'HTTPS' },
              { value: this.protoFlow[9], name: 'Others' },
            ],
          },
        ],
      };
      myChart.setOption(option);
    },
    initProtoFlowCountChart() {
      const myChart = echarts.init(document.getElementById('proto_flow_count'));
      const seriesData = Object.entries(this.mostFlowDict).map(([key, value]) => ({
        value,
        name: key,
      }));
      const option = {
        title: {
          text: 'protocol statistics with maximum count',
          x: 'center',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} KB',
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: this.mostFlowKey,
        },
        calculable: false,
        series: [
          {
            name: 'total traffic of protocol data packets',
            type: 'pie',
            radius: '60%',
            center: ['50%', '50%'],
            data: seriesData,
          },
        ],
      };
      myChart.setOption(option);
    },
    initDataInPacketChart() {
      const myChart = echarts.init(document.getElementById('data_in_packet'));
      const option = {
        title: {
          text: 'inbound IP traffic data packet count chart',
        },
        tooltip: {
          trigger: 'axis',
        },
        calculable: true,
        xAxis: [
          {
            type: 'value',
            name: 'number of data packet',
          },
        ],
        yAxis: [
          {
            type: 'category',
            name: 'inbound IP',
            data: this.ipFlow.in_keyp,
          },
        ],
        grid: {
          x: 100,
        },
        series: [
          {
            name: 'number of data packet',
            type: 'bar',
            itemStyle: {
              normal: {
                label: { show: true },
                color: '#6495ed',
              },
              emphasis: { label: { show: true } },
            },
            data: this.ipFlow.in_packet,
          },
        ],
      };
      myChart.setOption(option);
    },
    initDataOutPacketChart() {
      const myChart = echarts.init(document.getElementById('data_out_packet'));
      const option = {
        title: {
          text: 'outbound IP traffic data packet count chart',
        },
        tooltip: {
          trigger: 'axis',
        },
        calculable: true,
        xAxis: [
          {
            type: 'value',
            name: 'number of data packet',
          },
        ],
        yAxis: [
          {
            type: 'category',
            name: 'outbound IP',
            data: this.ipFlow.out_keyp,
          },
        ],
        grid: {
          x: 100,
        },
        series: [
          {
            name: 'number of data packet',
            type: 'bar',
            itemStyle: {
              normal: {
                label: { show: true },
                color: '#6495ed',
              },
              emphasis: { label: { show: true } },
            },
            data: this.ipFlow.out_packet,
          },
        ],
      };
      myChart.setOption(option);
    },
    initDataInLenChart() {
      const myChart = echarts.init(document.getElementById('data_in_len'));
      const option = {
        title: {
          text: 'inbound IP traffic data byte chart',
        },
        tooltip: {
          trigger: 'axis',
        },
        calculable: true,
        xAxis: [
          {
            type: 'value',
            name: 'byte count',
          },
        ],
        yAxis: [
          {
            type: 'category',
            name: 'inbound IP',
            data: this.ipFlow.in_keyl,
          },
        ],
        grid: {
          x: 100,
        },
        series: [
          {
            name: 'byte count',
            type: 'bar',
            itemStyle: {
              normal: {
                label: { show: true },
                color: '#6495ed',
              },
              emphasis: { label: { show: true } },
            },
            data: this.ipFlow.in_len,
          },
        ],
      };
      myChart.setOption(option);
    },
    initDataOutLenChart() {
      const myChart = echarts.init(document.getElementById('data_out_len'));
      const option = {
        title: {
          text: 'outbound IP traffic data byte chart',
        },
        tooltip: {
          trigger: 'axis',
        },
        calculable: true,
        xAxis: [
          {
            type: 'value',
            name: 'byte count',
          },
        ],
        yAxis: [
          {
            type: 'category',
            name: 'outbound IP',
            data: this.ipFlow.out_keyl,
          },
        ],
        grid: {
          x: 100,
        },
        series: [
          {
            name: 'byte count',
            type: 'bar',
            itemStyle: {
              normal: {
                label: { show: true },
                color: '#6495ed',
              },
              emphasis: { label: { show: true } },
            },
            data: this.ipFlow.out_len,
          },
        ],
      };
      myChart.setOption(option);
    },
  },
};
</script>

<style scoped>
.container {
  margin-bottom: 20px;
}
</style>
