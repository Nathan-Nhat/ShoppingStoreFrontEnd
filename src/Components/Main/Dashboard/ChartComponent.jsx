import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { Paper, Typography, Divider, FormControl, Select, MenuItem } from '@material-ui/core';
import { getData } from '../../../API/Api';
const style1Month = {
  label: 'Number Orders',
  fill: false,
  lineTension: 0.4,
  backgroundColor: 'rgba(75,192,192,0.4)',
  borderColor: '#3f51b5',
  borderWidth: 2,
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0.0,
  borderJoinStyle: 'miter',
  pointBorderColor: '#3f51b5',
  pointBackgroundColor: '#fff',
  pointBorderWidth: 2,
  pointHoverRadius: 3,
  pointHoverBackgroundColor: '#3f51b5',
  pointHoverBorderColor: '#fff',
  pointHoverBorderWidth: 3,
  pointRadius: 3,
  pointHitRadius: 4,
  maintainAspectRatio: false,
  responsive: true,
}

const style3Month = {
  label: 'Number Orders',
  fill: false,
  lineTension: 0.4,
  backgroundColor: 'rgba(75,192,192,0.4)',
  borderColor: '#3f51b5',
  borderWidth: 1,
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0.0,
  borderJoinStyle: 'miter',
  pointBorderColor: '#3f51b5',
  pointBackgroundColor: '#fff',
  pointBorderWidth: 2,
  pointHoverRadius: 3,
  pointHoverBackgroundColor: '#3f51b5',
  pointHoverBorderColor: '#fff',
  pointHoverBorderWidth: 3,
  pointRadius: 2,
  pointHitRadius: 3,
  maintainAspectRatio: false,
  responsive: true,
}
const style7Day = {
  label: 'Number Orders',
  fill: false,
  lineTension: 0.4,
  backgroundColor: 'rgba(75,192,192,0.4)',
  borderColor: '#3f51b5',
  borderWidth: 4,
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0.0,
  borderJoinStyle: 'miter',
  pointBorderColor: '#3f51b5',
  pointBackgroundColor: '#fff',
  pointBorderWidth: 3,
  pointHoverRadius: 7,
  pointHoverBackgroundColor: '#3f51b5',
  pointHoverBorderColor: '#fff',
  pointHoverBorderWidth: 4,
  pointRadius: 7,
  pointHitRadius: 10,
  maintainAspectRatio: false,
  responsive: true,
}
export default class ChartComponent extends Component {
  constructor(props) {
    super(props);
    this.chartReference = React.createRef();
    this.state = {
      selected: 7,
      data: {
        labels: [],
        datasets: [
          {
            ...style7Day,
            data: []
          },
        ]
      }
    }
  }
  handleChange = (e) => {
    let newVal = e.target.value;
    getData(`/api/secured/analyst/orders?num-days=${newVal}`, true)
      .then(response => {
        console.log(response);
        var label = response.data.map((item) => item.date.substring(0, 5));
        var numberOrders = response.data.map((item) => item.numberOrders);
        var style = newVal === 7 ? style7Day : (newVal === 30 ? style1Month : style3Month)
        this.setState({
          ...this.state,
          selected: newVal,
          data: {
            labels: [...label],
            datasets: [{
              ...style,
              data: [...numberOrders]
            }]
          }
        })

      }).catch(error => {
        console.log(error);
      })
  }
  componentWillMount() {
    getData(`/api/secured/analyst/orders?num-days=${this.state.selected}`, true)
      .then(response => {
        console.log(response);
        var label = response.data.map((item) => item.date.substring(0, 5));
        var numberOrders = response.data.map((item) => item.numberOrders);
        this.setState({
          ...this.state,
          data: {
            labels: [...label],
            datasets: [{
              ...style7Day,
              data: [...numberOrders]
            }]
          }
        })

      }).catch(error => {
        console.log(error);
      })
  }
  render() {
    return (
      <Paper style={{
        display: "flex", flexDirection: "column ",
        width: "100%", height: "100%", padding: "20px"
      }}>
        <div style={{ display: 'flex', flexDirection: "row" }}>
          <Typography style={{ fontSize: "25px", fontWeight: "bold" }}>Chart</Typography>
          <div style={{ flexGrow: 3 }}></div>
          <FormControl style={{ width: "150px" }}>
            <Select
              value={this.state.selected}
              onChange={this.handleChange}
            >
              <MenuItem value={7}>Last 7 days</MenuItem>
              <MenuItem value={30}>Last month</MenuItem>
              <MenuItem value={90}>Last 3 months</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Divider style={{ marginTop: "20px" }} />
        <div style={{ flexGrow: 1, marginTop: "10px" }}>
          <Line ref={this.chartReference} data={this.state.data}
            options={{ maintainAspectRatio: false, responsive: true }} redraw={true} />
        </div>
      </Paper>
    );
  }

}