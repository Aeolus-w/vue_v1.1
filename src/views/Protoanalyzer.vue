<template>
  <div>
    <br>
    <br>
    <!--常见协议和数据包长度图-->
    <div class="container" style="height: 400px; width: 90%">
      <div id="pcap_len" style="height:400px; width:25%; float:left;"></div>
      <div id="proto" style="height:400px; width:50%; float:left;"></div>
      <div id="pcap_count" style="height:400px; width:25%; float:left;"></div>
    </div>
    <br>
    <!--http协议统计-->
    <div class="container" id="http" style="height: 400px; width: 90%"></div>
    <br>
    <!--DNS协议统计-->
    <div class="container" id="dns" style="height: 400px; width: 90%"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'ProtocolAnalysis',
  props: {
    data: Array,
    pcapLen: Object,
    pcapKeys: Array,
    pcapCount: Object,
    httpKey: Array,
    httpValue: Array,
    dnsKey: Array,
    dnsValue: Array
  },
  mounted() {
    this.initProtoChart();
    this.initPcapLenChart();
    this.initPcapCountChart();
    this.initHttpChart();
    this.initDnsChart();
  },
  methods: {
    initProtoChart() {
      const protoChart = echarts.init(document.getElementById('proto'));
      const protoOption = {
        title: { text: 'common protocol statistics', x: 'center' },
        tooltip: { show: true },
        calculable: true,
        xAxis: [{ type: 'category', name: 'Protocol Type', boundaryGap: true, data: ["IP", "IPv6", "TCP", "UDP", "ARP", "ICMP", "DNS", "HTTP", "HTTPS", "Others"] }],
        yAxis: [{ type: 'value', name: 'data packet number' }],
        series: [{
          name: 'number', type: 'bar',
          itemStyle: {
            normal: { label: { show: true }, color: '#87cefa' },
            emphasis: { label: { show: true } }
          },
          data: this.data
        }]
      };
      protoChart.setOption(protoOption);
    },
    initPcapLenChart() {
      const pcapLenChart = echarts.init(document.getElementById('pcap_len'));
      const pcapLenOption = {
        title: { text: 'data packet length statistics', x: 'center' },
        tooltip: { trigger: 'item', formatter: "{a} <br/>{b} : {c} ({d}%)" },
        legend: { orient: 'vertical', x: 'left', data: ['0-300', '301-600', '601-900', '901-1200', '1201-1500'] },
        calculable: false,
        series: [{
          name: 'data packet length', type: 'pie', radius: '60%', center: ['50%', '55%'],
          data: [
            { value: this.pcapLen['0-300'], name: '0-300' },
            { value: this.pcapLen['301-600'], name: '301-600' },
            { value: this.pcapLen['601-900'], name: '601-900' },
            { value: this.pcapLen['901-1200'], name: '901-1200' },
            { value: this.pcapLen['1201-1500'], name: '1201-1500' }
          ]
        }]
      };
      pcapLenChart.setOption(pcapLenOption);
    },
    initPcapCountChart() {
      const pcapCountChart = echarts.init(document.getElementById('pcap_count'));
      const pcapCountOption = {
        title: { text: 'protocol statistics with maximum count', x: 'center' },
        tooltip: { trigger: 'item', formatter: "{a} <br/>{b} : {c} ({d}%)" },
        legend: { orient: 'vertical', x: 'left', data: this.pcapKeys },
        calculable: false,
        series: [{
          name: 'number of protocol', type: 'pie', radius: '60%', center: ['50%', '55%'],
          data: this.pcapKeys.map(key => ({ value: this.pcapCount[key], name: key }))
        }]
      };
      pcapCountChart.setOption(pcapCountOption);
    },
    initHttpChart() {
      const httpChart = echarts.init(document.getElementById('http'));
      const httpOption = {
        title: { text: 'HTTP/HTTPS access statistics' },
        tooltip: { trigger: 'axis' },
        calculable: true,
        xAxis: [{ type: 'value', name: 'number of data packet' }],
        yAxis: [{ type: 'category', name: 'access IP', data: this.httpKey }],
        grid: { x: 100 },
        series: [{
          name: '', type: 'bar',
          itemStyle: {
            normal: { label: { show: true }, color: '#6495ed' },
            emphasis: { label: { show: true } }
          },
          data: this.httpValue
        }]
      };
      httpChart.setOption(httpOption);
    },
    initDnsChart() {
      const dnsChart = echarts.init(document.getElementById('dns'));
      const dnsOption = {
        title: { text: 'DNS access statistics' },
        tooltip: { trigger: 'axis' },
        calculable: true,
        xAxis: [{ type: 'value', name: 'number of data packet' }],
        yAxis: [{ type: 'category', name: 'request URL', data: this.dnsKey }],
        grid: { x: 150 },
        series: [{
          name: 'number of data packet', type: 'bar',
          itemStyle: {
            normal: { label: { show: true }, color: '#6495ed' },
            emphasis: { label: { show: true } }
          },
          data: this.dnsValue
        }]
      };
      dnsChart.setOption(dnsOption);
    }
  }
};
</script>

<style scoped>
.container {
  height: 400px;
  width: 90%;
}
#pcap_len, #proto, #pcap_count {
  float: left;
}
#pcap_len, #pcap_count {
  width: 25%;
}
#proto {
  width: 50%;
}
</style>
