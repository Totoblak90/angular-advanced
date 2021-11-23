import { Component, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dognought-chart',
  templateUrl: './dognought-chart.component.html',
  styleUrls: ['./dognought-chart.component.css']
})
export class DognoughtChartComponent {

  @Input() title: string;
  @Input() doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input() doughnutChartData: MultiDataSet = [ [350, 450, 100] ];
  @Input() doughnutChartType: ChartType = 'doughnut';
  @Input() colors: Color[] = [{ backgroundColor: ['#6857E6', '#009FEE', '#FF8414']}];

}
