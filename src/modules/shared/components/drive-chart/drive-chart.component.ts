import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-drive-chart',
  templateUrl: './drive-chart.component.html',
  styleUrls: ['./drive-chart.component.css'],
})
export class DriveChartComponent implements OnInit {
  @Input() xData: string[] = [];
  @Input() yData: number[] = [];
  @Input() type: string = '';
  chartOption: any;

  constructor() {}

  ngOnInit(): void {
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
}
