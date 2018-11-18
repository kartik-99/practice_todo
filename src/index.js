import React from 'react'
import ReactDOM from 'react-dom'

class Todo extends React.Component{
    constructor(props){
        super(props);
        this.state = ({
            currentText:"",
            tasks:[],
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
            })
        }
    }

    checkTask(task){
        var tasks = this.state.tasks.slice()
        var index = tasks.indexOf(task)
        tasks[index].completed = !tasks[index].completed 
        this.setState({
            tasks:tasks,
        })
    }

    deleteTask(task){
        var tasks = this.state.tasks.slice()
        var index = tasks.indexOf(task)
        tasks.splice(index, 1)
        this.setState({
            tasks:tasks,
        })
    }

    render(){
        return(
            <div>
                <div>
                    <h1>To Do</h1>
                    <h3>Welcome to your tape</h3>
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
                            <div key={index}>
                                {valueNode}
                                <button onClick={() => this.checkTask(task)}><img src="./assets/img/checked.png" alt="Done"/></button>
                                <button onClick={() => this.deleteTask(task)}><img src="./assets/img/error.png" alt="Delete"/></button>
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
                            <div key={index}>
                                <strike>{valueNode}</strike>
                                <button onClick={() => this.checkTask(task)}><img src="./assets/img/checked.png" alt="Done"/></button>
                                <button onClick={() => this.deleteTask(task)}><img src="./assets/img/error.png" alt="Delete"/></button>
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