import React from 'react';
import './App.css';
import 'antd/dist/antd.css'; 
import {Modal} from 'antd';

class App extends React.Component {
constructor(props){
  super(props);
  this.state = {

    visible:false,
    tasks: [
        {id: "1", taskName:"A",type:"inProgress",},
        {id: "2", taskName:"B", type:"inProgress"},
        {id: "3", taskName:"C", type:"Done"},
        {id: "4", taskName:"D", type:"Done"}
    ]
  }
}onDragStart = (event, taskName) => {
  event.dataTransfer.setData("taskName", taskName);

}
onDragOver = (event) => {
  event.preventDefault();
}
showModal = () => {

  this.setState({
    visible: true,
  });
};

handleOk = e => {

  let taskName = this.state.taskname;

  let tasks = this.state.tasks.filter((task) => {
      if (task.taskName == taskName) {
          task.type = "Done";
      }
      return task;
  });

  this.setState({
      ...this.state,
      tasks,
      visible: false,

  });
};

handleCancel = e => {
  this.setState({
    visible: false,
  });
};

onDrop = (event, cat) => {
  this.showModal();
  this.setState({taskname :event.dataTransfer.getData("taskName")})
}
render() {
var tasks = {
    inProgress: [],
    Done: []
  }

this.state.tasks.forEach ((task) => {
  
  tasks[task.type].push(
    <div key={task.id} 
      onDragStart = {(event) => this.onDragStart(event, task.taskName)}
      draggable
      className="draggable"
      style = {{backgroundImage: task.bgcolor}}>
      {task.taskName}
    </div>
  );
});

  return (
    <div className="drag-container">
       <Modal
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
         Do you want to replace Image A for image B ?
        </Modal>
    <div className="inProgress"
      onDragOver={(event)=>this.onDragOver(event)}
        onDrop={(event)=>{this.onDrop(event, "inProgress")}}>
        <span className="group-header">In Progress</span>
        {tasks.inProgress}
      </div>
      <div className="droppable"
        onDragOver={(event)=>this.onDragOver(event)}
          onDrop={(event)=>this.onDrop(event, "Done")}>
        <span className="group-header">Done</span>
        {tasks.Done}
      </div>	  
      <div className="inProgress"
	onDragOver={(event)=>this.onDragOver(event)}
	onDrop={(event)=>{this.onDrop(event, "inProgress")}}>
  	<span className="group-header">In Progress</span>
  	{tasks.inProgress}
</div>      
    </div>
  );
}
}

export default App;
