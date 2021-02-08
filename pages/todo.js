import {useState} from 'react'
import styles from '../styles/todo.module.css'

const Todo = () => {

    const [ tasks , setTasks ] = useState(
        [
            {id:1, name: 'Reading a book'},
            {id:2, name: 'Sleep at night'}
        ])
    const [ name , setName] = useState('')
    const [idEdit , setIdEdit] = useState(0)
       
    const renderTask = () => {
        return tasks.map( (task,index) => { 
                return (<li key={index} className={styles.listItem}> 
                {index+1} 
                {(+idEdit !== +task.id) ? task.name :
                    <input type="text" value={name} onChange={ (e) => setName(e.target.value) }/>
                }
                <div className = {styles.buttonContainer}>
                    <button className={styles.button} onClick={() => editTask(task.id , task.name)}>Edit</button>
                    <button className={styles.button} onClick={() => deleteTask(task.id)}> Delete</button>
                </div> 
                </li>)
            }
         )
    }
   

    const editTask = (id) => {
        console.log('Edit Task')
        setIdEdit(id)
        let t = tasks.find((task) => +task.id === +id)
        setName(t.name)
        if (+idEdit === +id) {
            let newTasks = tasks.map((task,index) => {
                if (+task.id === +id)
                    tasks[index].name = name
                return task
            })
            setTasks(newTasks)
            setIdEdit(0)
        }
    }
    

    const deleteTask = (id) => {
        console.log('Delete');
        let newTasks = tasks.filter( (task) => ( +task.id !== +id))
        setTasks(newTasks)
    }

    const addTask = (name) => {
        console.log('ADD!!')
        // tasks.push({id:3 , name:'xxx'})
        const id = tasks[tasks.length-1].id+1
        if(tasks.length<=9 && name.trim() != "")
            setTasks([ ...tasks, {id, name}])
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Todo</h1>
            <input type = "text" onChange={(e)=>setName(e.target.value)}/>
            <button onClick={()=> addTask(name)}>Add</button>
            <ul className={styles.list}>
                { renderTask() }
            </ul>
        </div>
        )
     
}

export default Todo
 