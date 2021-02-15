import {useState} from 'react'
import {useEffect} from 'react'
import styles from '../styles/todo.module.css'

const Todog = () => {

    const [ dogs , setDogs ] = useState(
        [
            // {id:1, name: 'Reading a book'},
            // {id:2, name: 'Sleep at night'}
        ])
    const [ name , setName] = useState('')
    const [idEdit , setIdEdit] = useState(0)

    useEffect( async () => {
        let ts = await getDogs();
        console.log(ts)
        setDogs(ts) 
    }, [] )
    
 
    const renderDog = () => {
            
        return dogs.map( (dog,index) => { 
                return (<li key={index} className={styles.listItem}> 
                {"No:"}
                {index+1} 
                {" " + "Age:" + dog.age + " "}
                {(+idEdit !== +dog.id) ? dog.name :
                    <input type="text" value={name} onChange={ (e) => setName(e.target.value) }/>
                }
                <div className = {styles.buttonContainer}>
                    <button className={styles.button} onClick={() => editDog(dog.id , dog.name)}>Edit</button>
                    <button className={styles.button} onClick={() => deleteDog(dog.id)}> Delete</button>
                </div> 
                </li>)
            }
         )
    }
   
    const editDog = (id) => {
        console.log('Edit Dog')
        setIdEdit(id)
        let t = dogs.find((dog) => +dog.id === +id)
        setName(t.name)
        if (+idEdit === +id) {
            let newDogs = dogs.map((dog,index) => {
                if (+dog.id === +id)
                    dogs[index].name = name
                return dog
            })
            setDogs(newDogs)
            setIdEdit(0)
        }
    }
    

    const deleteDog = (id) => {
        console.log('Delete');
        let newDogs = dogs.filter( (dog) => ( +dog.id !== +id))
        setDogs(newDogs)
    }

    const addDog = (name) => {
        console.log('ADD!!')
        // dogs.push({id:3 , name:'xxx'})
        const id = dogs[dogs.length-1].id+1
        if(dogs.length<=9 && name.trim() != "")
            setDogs([ ...dogs, {id, name}])
    }

    const getDogs = async () => {
        const res = await fetch('http://localhost:8000/')
        const json = await res.json()
        console.log(json)
        return json;
     }
     

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Todog</h1>
            <input type = "text" onChange={(e)=>setName(e.target.value)}/>
            <button onClick={()=> addDog(name)}>Add</button>
            <ul className={styles.list}>
                { renderDog() }
            </ul>
        </div>
        )
     
}

export default Todog
 