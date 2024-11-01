import {Component, OnInit} from '@angular/core';
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
@Component({
  selector: 'app-main-chart',
  standalone: true,
  imports: [],
  templateUrl: './main-chart.component.html',
  styleUrl: './main-chart.component.scss'
})
export class MainChartComponent implements OnInit {
  ngOnInit() {
    this.initChart()
  }

  initChart(){
    /**
     * ---------------------------------------
     * This demo was created using amCharts 5.
     *
     * For more information visit:
     * https://www.amcharts.com/
     *
     * Documentation is available at:
     * https://www.amcharts.com/docs/v5/
     * ---------------------------------------
     */


// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("chartdiv");


// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root)
    ]);


// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: true,
      panY: true,
      wheelX: "panX",
      wheelY: "zoomX",
      pinchZoomX: true,
      paddingLeft: 0
    }));


// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineX.set("forceHidden", true);
    cursor.lineY.set("forceHidden", true);

// Generate random data
    var date = new Date();
    date.setHours(0, 0, 0, 0);

    var value = 20;
    function generateData() {
      value = am5.math.round(Math.random() * 10 - 4.8 + value, 1);
      if (value < 0) {
        value = Math.random() * 10;
      }

      if (value > 100) {
        value = 100 - Math.random() * 10;
      }
      am5.time.add(date, "day", 1);
      return {
        date: date.getTime(),
        value: value
      };
    }

    function generateDatas(count:number) {
      var data = [];
      for (var i = 0; i < count; ++i) {
        data.push(generateData());
      }
      return data;
    }


// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
      baseInterval: {
        timeUnit: "day",
        count: 1
      },
      renderer: am5xy.AxisRendererX.new(root, {
        minorGridEnabled: true,
        minGridDistance: 90
      })
    }));

    var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {})
    }));


// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    var series = chart.series.push(am5xy.LineSeries.new(root, {
      name: "Series",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {
        labelText: "{valueY}"
      })
    }));

    series.fills.template.setAll({
      fillOpacity: 0.2,
      visible: true
    });


// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    chart.set("scrollbarX", am5.Scrollbar.new(root, {
      orientation: "horizontal"
    }));

// DRAGGABLE RANGE
// add series range
    var rangeDataItem = yAxis.makeDataItem({});
    yAxis.createAxisRange(rangeDataItem);

// create container for all elements, you can put anything you want top it
    var container = am5.Container.new(root, {
      centerY: am5.p50,
      draggable: true,
      layout: root.horizontalLayout
    })

// restrict from being dragged vertically
    container.adapters.add("x", function() {
      return 0;
    });

// // restrict from being dragged outside of plot
//     container.adapters.add("y", function(y) {
//       return Math.max(0, Math.min(chart.plotContainer.height(), y));
//     });


// this is needed for the bullets to be interactive, above the plot
    yAxis.topGridContainer.children.push(container);

// create bullet and set container as a bullets sprite
    rangeDataItem.set("bullet", am5xy.AxisBullet.new(root, {
      sprite: container
    }));

// // decorate grid of a range
//     rangeDataItem.get("grid").setAll({
//       strokeOpacity: 1,
//       visible: true,
//       stroke: am5.color(0x000000),
//       strokeDasharray: [2, 2]
//     })

// create background for the container
    var background = am5.RoundedRectangle.new(root, {
      fill: am5.color(0xffffff),
      fillOpacity: 1,
      strokeOpacity: 0.5,
      cornerRadiusTL: 0,
      cornerRadiusBL: 0,
      cursorOverStyle: "ns-resize",
      stroke: am5.color(0xff0000)
    })

    container.set("background", background);






// when data is validated, set range value to the middle
    series.events.on("datavalidated", () => {
      var max = yAxis.getPrivate("max", 1);
      var min = yAxis.getPrivate("min", 0);

      var value = min + (max - min) / 2;
      rangeDataItem.set("value", value);
    })

// Set data
    var data = generateDatas(300);
    series.data.setAll(data);

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    chart.appear(1000, 100);

  }
}
