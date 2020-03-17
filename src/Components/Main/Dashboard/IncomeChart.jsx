import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { Paper, Typography, Divider, FormControl, Select, MenuItem } from '@material-ui/core';
import { getData } from '../../../API/Api';
import {handleError} from '../../../redux/Actions/ActionObjects/ActionsObjects'
import {connect} from 'react-redux'
const style1Month = {
  label: 'Number Orders',
  maintainAspectRatio: false,
  backgroundColor: 'rgba(75,192,192,0.8)',
  hoverBackgroundColor : "rgba(175,192,192,0.4)",
  maintainAspectRatio: false,
  responsive: true,
}

const style3Month = {
  label: 'Number Orders',
  fill: false,
  lineTension: 0.4,
  backgroundColor: 'rgba(75,192,192,0.4)',
  hoverBackgroundColor : "rgba(175,192,192,0.8)",
  maintainAspectRatio: false,
  responsive: true,
}
const style7Day = {
  label: 'Number Orders',
  lineTension: 0.4,
  backgroundColor: 'rgba(75,192,192,0.4)',
  hoverBackgroundColor : "rgba(175,192,192,0.8)",
  maintainAspectRatio: false,
  responsive: true,
}
class IncomeChart extends Component {
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
        // console.log(error.response.data);
        if (error.response !== undefined)
        {
          this.props.dispatch(handleError(error.response.data));
        }
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
          <Bar ref={this.chartReference} data={this.state.data}
            options={{ maintainAspectRatio: false, responsive: true }} redraw={true} />
        </div>
      </Paper>
    );
  }

}
export default connect()(IncomeChart); 