import React, { useState,useEffect } from "react";

//include images into your bundle


//create your first component
const Home = () => {

	const [listaTareas, setListaTareas]=useState([]);
	const [tarea, setTarea]=useState("");
	// const [usuario, setUsuario]=useState([]);

 const usuarioCreate = async ()=>{
	const response = await fetch('https://assets.breatheco.de/apis/fake/todos/user/Sami2022',{
		method:"POST",
			body: JSON.stringify([]),
			headers:{
				'Content-Type': "application/json"
			}
	})
	const data = await response.json();
		console.log(data);
		// setUsuario(data);
 }
 
// funcion par aobtener la lista de tareas y subirla al estado
 const obtenerListaTareas = async ()=>{
	try{
		const response = await fetch('https://assets.breatheco.de/apis/fake/todos/user/Sami2022')
		const data = await response.json()
		// console.log(data);
		setListaTareas(data)
	}catch(err){
		console.log(err);
	}
		
	console.log(listaTareas)
	
}
// funcion para enviar la lista de tareas del estado de lista
const enviarlista = async ()=>{
	const response = await fetch('https://assets.breatheco.de/apis/fake/todos/user/Sami2022',{
		method:"PUT",
			body: JSON.stringify(listaTareas),
			headers:{
				'Content-Type': "application/json"
			}
	})
	const data = await response.json();
	console.log(data)
		
 }
 function subirlista(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      setListaTareas([...listaTareas, {label: tarea, done:false}]);
      setTarea("");
      console.log(tarea);
	
    }
  }
  function deleteItem(index) {
	let eliminar = []
      eliminar= listaTareas.filter((item, i) =>{
        if(index !==i){
          return item
        }
              })
              setListaTareas(eliminar)
    }
useEffect(()=>{
	
	obtenerListaTareas()
},[])

useEffect(()=>{
	
	enviarlista()
},[listaTareas])

	return (
		<div className="text-center">
		  <div className="d-flex justify-content-start p-3 m-3 col-12">
			<div className="m-3 col-2">
			  <label htmlFor="exampleFormControlInput1" className="form-label">
				TO DO LIST
			  </label>
			  <input
				type="text"
				className="form-control"
				id="exampleFormControlInput1"
				placeholder="List"
				onChange={(e) => setTarea(e.target.value)}
				value={tarea}
				onKeyPress={subirlista}
			  />
			  <br />
			  <label htmlFor="exampleFormControlInput1" className="form-label ">
				User
			  </label>
			  <input
				type="text"
				className="form-control"
				placeholder="--in product development--"
				disabled
				// onChange={(e) => setTarea(e.target.value)}
				// value={tarealistita}
				// onKeyPress={subirlista}
			  />
			  <br />
			  <label htmlFor="exampleFormControlInput1" className="form-label">
				TASKS
			  </label>
			  <input
				type="text"
				className="form-control"
				id="exampleFormControlInput1"
				placeholder= {[listaTareas.length]==0? "There no tasks": "te faltan "+[listaTareas.length]+" tareas"}
				disabled
			  />
			  
			</div>
			<br />
			<div className="d-flex flex-column-start col-9">
			  <div className="col-7" style={{   backgroundImage: `url("https://st.depositphotos.com/1427101/4993/v/600/depositphotos_49934977-stock-illustration-notebook-a4-size.jpg")`,height: "500px",width: "1000px", backgroundRepeat: "no-repeat"}}>
				<ul className="list-group text-start"style={{marginLeft: "5em", marginTop: "5em"}}>
				<div className="col-6 align-middle">
				  {listaTareas.map((item, i) => (
					<li className="list-group-item d-flex justify-content-between align-items-center" key={i}>
					  {item.label} &nbsp;&nbsp;&nbsp;
					  <button className=" btn btn-primary rounded-pill float-end btn-close" onClick={() => deleteItem(i)}>
					  </button>
					</li>
				  ))}
				  </div>
				</ul>
			  </div>
			</div>
		  </div>
		</div>
	  );
};

export default Home;
