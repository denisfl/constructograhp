<template>
<canvas width="400" height="400"></canvas>
</template>

<script>
import Colors from './Colors';
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

      result = {
        labels: labelsArr,
        datasets: [{
          data: dataArr,
          label: "Dataset",
          backgroundColor: Colors.get(labelsArr.length, 90),
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
