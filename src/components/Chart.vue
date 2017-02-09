<template>
  <canvas width="400" height="400"></canvas>
</template>

<script>
import ChartJS from 'chart.js';
import Moment from 'moment';

import Colors from './Colors';
import Store from './Store';

const apiUrl = 'https://anltcs.herokuapp.com/sleepTime/fetch/awake_asleep?sort=relatedTo.value*a&limit=800&offset=60'

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
        options: {
            scales: {
                yAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: 'time'
                    },
                    ticks2: {
                      min: 0,
                      max: 24 * 60,
                      stepSize: 60
                    }
                }]
            }
        }
      })
      this.chart
    },
    buildChartData() {
      let result = {}
      let data = Store.fetch(apiUrl)

      let labelsArr = data.filter(function(i){ return i.value == "asleep" }).map(function(i) {
        return Moment.unix(i.relatedTo.value).format("MM/DD/YYYY")
      })

      var timeLabels = []
      var times = 24 * 60;
      for(var i=0; i < times; i++){
          timeLabels.push(Moment.unix(i*60).format("hh:mm"))
      }

      let dataMap = function(i) {
        return {
                  x: Moment.unix(i.relatedTo.value).format("MM/DD/YYYY"),
                  y: Moment.unix(i.relatedTo.value).hours() * 60 + Moment.unix(i.relatedTo.value).minutes(),
                }
      }

      let asleepDataArr = data.filter(function(i){ return i.value == "asleep" }).map(dataMap);
      let awakeDataArr = data.filter(function(i){ return i.value == "awake" }).map(dataMap);
      console.log(timeLabels)
      result = {
        yLabels: timeLabels,
        xLabels: labelsArr,
        datasets: [{
          data: asleepDataArr,
          label: "Fall asleep",
          borderColor: '#9C27B0',
          fill: false,
        },
        {
          data: awakeDataArr,
          label: "Wake up",
          borderColor: '#CDDC39',
          fill: false,
        }
        ],
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
