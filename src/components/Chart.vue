<template>
  <canvas width="400" height="400"></canvas>
</template>

<script>
import ChartJS from 'chart.js';
import Moment from 'moment';

import Colors from './Colors';
import Store from './Store';

const apiUrl = 'https://anltcs.herokuapp.com/sleepTime/fetch/awake_asleep'

export default {
  name: 'Chart',
  data() {
    return {
      data: {
        items: null,
      },
    }
  },
  created() {
    this.buildChartData()
  },
  mounted() {
    const $el = this.$el
    this.createChart($el)
  },
  methods: {
    createChart($el) {
      this.chart = new ChartJS($el, {
        type: 'line',
        data: this.data.items,
      })
      this.chart
    },
    buildChartData() {
      let result = {}
      let data = Store.fetch(apiUrl)
      // let labelsArr = this.mapData(data, 'relatedTo.value')
      // let dataArr = this.mapData(data, 'value')

      let labelsArr = data.map(function(i) {
        // return i.relatedTo.value
        return Moment.unix(i.relatedTo.value).format("MM/DD/YYYY")
      })
      let dataArr = data.map(function(i) {
        return {
                  x: Moment.unix(i.relatedTo.value).format("h:mm"),
                  y: Moment.unix(i.relatedTo.value).format("MM/DD/YYYY")
                }
      });

      result = {
        labels: labelsArr,
        datasets: [{
          data: dataArr,
          label: "Dataset",
          backgroundColor: Colors.get(labelsArr.length, 90),
        }],
      }
      this.data.items = result
    },
    mapData(data, param) {
      let result = []
      result = data.map(function(i) {
        return i.param
      })
      return result
    },
    getColors(count) {
      return colors.slice(0, count)
    }
  }
};
</script>
