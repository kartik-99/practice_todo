import React from 'react'
import ReactDOM from 'react-dom'

class Todo extends React.Component{
    constructor(props){
        super(props);
        this.state = ({
            currentText:"",
            tasks:[],
            comTasks:[],
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

    checkTask(index){
        var tasks = this.state.tasks.slice()
        var comTasks = this.state.comTasks.slice()
        comTasks.unshift(tasks[index])
        tasks.splice(index, 1)
        this.setState({
            tasks:tasks,
            comTasks:comTasks,
        })
    }

    uncheckTask(index){
        var tasks = this.state.tasks.slice()
        var comTasks = this.state.comTasks.slice()
        tasks.push(comTasks[index])
        comTasks.splice(index, 1)
        this.setState({
            tasks:tasks,
            comTasks:comTasks,
        })
    }

    deleteTask(index, list){
        if (list===1){
            var tasks = this.state.tasks.slice()
            tasks.splice(index, 1)
            this.setState({
                tasks:tasks,
            })
        } else if (list===2){
            var tasks = this.state.comTasks.slice()
            tasks.splice(index, 1)
            this.setState({
                comTasks:tasks,
            })
        }
    }

    render(){
        return(
            <div>
                <div>
                    <h1>To Do</h1>
                    <h3>Welcome to your tape</h3>
                    <input ref={el => this.inputEle = el} type="text" placeholder="Enter New Task!" onKeyDown={e => this.handleKeypress(e)}/>
                </div>
                <div>
                {
                    this.state.tasks.map((task, index) => {
                        const valueNode = task.value
                        return (
                            <div key={index}>
                                {valueNode}
                                <button onClick={() => this.checkTask(index)}><img src="./assets/img/checked.png" alt="Done"/></button>
                                <button onClick={() => this.deleteTask(index, 1)}><img src="./assets/img/error.png" alt="Delete"/></button>
                            </div>
                        )
                    }) }
                </div>
                <div>
                {
                    this.state.comTasks.map((task, index) => {
                        const valueNode = (<strike>{task.value}</strike>)
                        return (
                            <div key={index}>
                                {valueNode}
                                <button onClick={() => this.checkTask(index)}><img src="./assets/img/checked.png" alt="Done"/></button>
                                <button onClick={() => this.deleteTask(index, 2)}><img src="./assets/img/error.png" alt="Delete"/></button>
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