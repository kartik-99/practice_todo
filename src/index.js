import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

class Todo extends React.Component{
    constructor(props){
        super(props);
        var taskString = "tasks"
        console.log(localStorage.getItem("tasks"))
        var tasks = JSON.parse(localStorage.getItem(taskString) || '[]') 
        this.state = ({
            currentText:"",
            tasks:tasks,
        })
    }

    handleKeypress(e) {
        const {which,keyCode} = e.nativeEvent;
        if(which === 13 || keyCode===13) {
            if(this.inputEle.value==="")
                return
            var tasks = this.state.tasks.slice()
            tasks.unshift({value:this.inputEle.value, completed: false})
            this.setState({
                tasks:tasks,
            }, () => {
                this.inputEle.value = ""
                localStorage.setItem("tasks", JSON.stringify(tasks))
            })
        }
    }

    checkTask(task){
        var tasks = this.state.tasks.slice()
        var index = tasks.indexOf(task)
        tasks[index].completed = !tasks[index].completed 
        this.setState({
            tasks:tasks,
        }, () => {
            localStorage.setItem("tasks", JSON.stringify(tasks))
        })
    }

    deleteTask(task){
        var tasks = this.state.tasks.slice()
        var index = tasks.indexOf(task)
        tasks.splice(index, 1)
        this.setState({
            tasks:tasks,
        }, () => {
            localStorage.setItem("tasks", tasks)
        })
    }

    render(){
        return(
            <div>
                <div>
                    <h1>To-Do</h1>
                    <h3>What do you want to complete today?</h3>
                    <input ref={el => this.inputEle = el} type="text" placeholder="Enter New Task!" onKeyDown={e => this.handleKeypress(e)}/>
                </div>
                
                <br/>
                <div>{
                    this.state.tasks.filter(task => !task.completed).length >0 &&
                    <h4>TO COMPLETE</h4>
                }</div>
                <br/>

                <div>
                {
                    this.state.tasks.filter(task => !task.completed).map((task, index) => {
                        const valueNode = task.value
                        return (
                            <div class="taskView" key={index}>
                                <div class="taskText">{valueNode}</div>
                                <div class="taskButtons">
                                    <button onClick={() => this.checkTask(task)}><img src="./assets/img/checked.png" alt="Done"/></button>
                                    <button onClick={() => this.deleteTask(task)}><img src="./assets/img/error.png" alt="Delete"/></button>
                                </div>
                            </div>
                        )
                    }) }
                </div>

                <br/>
                <div>{
                    this.state.tasks.filter(task => task.completed).length >0 &&
                    <h4>COMPLETED</h4>
                }</div>
                <br/>

                <div>
                {
                    this.state.tasks.filter(task => task.completed).map((task, index) => {
                        const valueNode = (<strike>{task.value}</strike>)
                        return (
                            <div class="taskView" key={index}>
                                <div class="taskText"><strike>{valueNode}</strike></div>
                                <div class="taskButtons">
                                    <button onClick={() => this.checkTask(task)}><img src="./assets/img/checked.png" alt="Done"/></button>
                                    <button onClick={() => this.deleteTask(task)}><img src="./assets/img/error.png" alt="Delete"/></button>
                                </div>
                            </div>
                        )
                    }) }
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <Todo />,
    document.getElementById('root')
);