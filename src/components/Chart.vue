<template>
<canvas width="400" height="400"></canvas>
</template>

<script>
import ChartJS from 'chart.js';

const respond = {
  "values": [{
      "identifier": "water",
      "value": "240",
      "relatedTo": {
        "type": "day_time",
        "value": "midnight"
      }
    },
    {
      "identifier": "coffee",
      "value": "200",
      "relatedTo": {
        "type": "time_range",
        "value": "18:00-21:00"
      }
    },
    {
      "identifier": "juce",
      "value": "100",
      "relatedTo": {
        "type": "time_range",
        "value": "18:00-21:00"
      }
    },
  ]
}

const colors = [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)'
              ]

export default {
  name: 'Chart',
  data() {
    return {
      data: {}
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
        type: 'pie',
        data: this.data,
      })
      this.chart
    },
    getData() {
      return respond["values"]
    },
    buildChartData() {
      let result = {}

      let labelsArr = this.mapData('identifier')
      let dataArr = this.mapData('value')

      console.log(this.getColors(labelsArr.length));

      result = {
        labels: labelsArr,
        datasets: [{
          data: dataArr,
          label: "Dataset",
          backgroundColor: this.getColors(labelsArr.length),
        }],
      }

      this.data = result
    },
    mapData(param) {
      let result = []
      let data = this.getData()

      result = data.map(function(i) {
        return i[param]
      });
      return result
    },
    getColors(count) {
      return colors.slice(0, count)
    }
  }
};
</script>
