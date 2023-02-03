import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-drive-chart',
  templateUrl: './drive-chart.component.html',
  styleUrls: ['./drive-chart.component.css'],
})
export class DriveChartComponent implements OnInit {
  @Input() yData: number[] = [];
  @Input() xData: string[] = [];
  @Input() type = '';
  chartOption: any;
  chartInstance: any;

  ngOnInit(): void {
    console.log(this.xData);
    console.log(this.yData);
    this.chartOptionInit();
  }

  chartOptionInit() {
    let color;
    if (this.type === 'Rides') {
      color = '#3398DB';
    } else if (this.type === 'Distance') {
      color = '#1ad636';
    } else {
      color = '#d94011';
    }
    this.chartOption = {
      color: [color],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: this.xData,
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: this.type,
          type: 'bar',
          barWidth: '50%',
          data: this.yData,
        },
      ],
    };
  }

  onChartInit(e: any) {
    this.chartInstance = e;
  }
}
