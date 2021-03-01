import React,{useState,useEffect} from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc'
import arrayMove from 'array-move'

const SortableList = SortableContainer(({items}) => {
    return(
        <ul className="list-group">
            {
                items.map((value,i) => <SortableItem key={i} value={value} index={i}/> )
            }
        </ul>
    )
})

const SortableItem =  SortableElement(({value}) => {
    return( <li className="list-group-item">
        <h1>{value.sorting}.{value.title}</h1>
        <p>{value.description}</p>
        <p>{value._id}</p>
    </li>  
    )
})

//Component encargado de re-ordenar
function SortableComponent(){
    //useState crea algunos datos dentro del component
    //devuelve un arreglo con 2 components
    //1-datos que tenemos el estado y 2-funcion para poder alterar el estado
    const [tasks,setTasks] = useState([
        /* {title:"item one", description:"task one"},
        {title:"item two", description:"task two"},
        {title:"item three", description:"task three"},
        {title:"item four", description:"task four"},
        {title:"item five", description:"task five"} */
      ])
      useEffect(() => {
          const getData = async() =>{
            const res = await fetch('http://localhost:4000/tasks')
            const tasks = await res.json()
            tasks.sort((a,b) => (a.sorting > b.sorting) ? 1: ((b.sorting > a.sorting) ?-1 : 0))
            setTasks(tasks)
          }
          getData()
      },[])

      //oldIndex la posicion del elemento que se movio inicialmente
      //newIndex la nueva posicion del elemento que se movio 
      const onSortEnd = async({oldIndex,newIndex}) =>{
        let tasksCopy = [...tasks]
        tasksCopy = arrayMove(tasksCopy,oldIndex,newIndex)
        //establecer en el estado
        setTasks(tasksCopy)
        const taskIds = tasksCopy.map(e => e._id);
        const res = await fetch('http://localhost:4000/tasks',{
          method:'PUT',
          headers:{
            'Content-Type':'application/json'
          },
          //Convertir obj json en un string
          body: JSON.stringify(taskIds)
        })
        const data = await res.json()
        console.log(data)
      }

      return(
        <SortableList items={tasks} onSortEnd={onSortEnd}/>
      )
    
}
  export default SortableComponent