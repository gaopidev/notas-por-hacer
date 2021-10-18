import React, { useEffect, useState } from 'react'

const Anuncio = () => React.createElement('h2', {}, 'Nunca olvides tus tareas')

const getDateStamp = () => {
	const fecha = new Date();
	return `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()} ${fecha.getHours()}:${fecha.getMinutes()}`	
}

const App = () => {
	const [nota, setNota] = useState({titulo:'', desc:''})
	const [notas, setNotas] = useState([])

	const handleChange = (e) => {
		const titulo = e.target.name;
		const desc = e.target.value;
		setNota({...nota, [titulo]:desc});
	}
	const submitNota = (e)=>{
		e.preventDefault()
		const {titulo, desc} = nota;
		if(!titulo && !desc){
			console.log("No puede haber vacios")
		}
		const nueva = {
			id: Date.now(),
			titulo,
			desc,
			fecha: getDateStamp(),
			completa: false
		}
		setNotas([...notas, nueva]);
		setNota({titulo:'',desc:''})
	}

	const borrarTodas = () => {
		setNotas([]);
	}

	const eliminarNota = (id) => {
		const nuevas = notas.filter((nota) => nota.id !== id)
		
		setNotas(nuevas)
	}

	const togleComplete = (id)=>{
		const nuevas = notas.map( (nota)=>{
			if(nota.id === id){
				nota.completa = !nota.completa;
			}
			return nota;
		})
		setNotas(nuevas);
		
	}

	return (
		<div className='container mt-3'>
			<h1 className='text-center'>Tareas por hacer</h1>
			<div className='my-5'>
				<h2>Nueva tarea</h2>
				<div className='row'>
					<div className='col-md-6'>
						<form onSubmit={submitNota}>
							<div className='mb-3'>
								<label htmlFor='titulo' className='form-label'>
									Nombre de la tarea
								</label>
								<input
									type='text'
									className='form-control'
									name='titulo'
									id='titulo'
									value={nota.titulo}
									onChange={handleChange}
								/>
							</div>
							<div className='mb-3'>
								<label htmlFor='descripcion' className='form-label'>
									Descripcion de la tarea
								</label>
								<input
									type='text'
									className='form-control'
									name='desc'
									id='desc'
									value={nota.desc}
									onChange={handleChange}
								/>
							</div>
							<div className='mb-3'>
								<button
									type='submit'
									className='btn btn-primary'
								>
									Agregar
								</button>
							</div>
						</form>
					</div>
					<div className='col-md-6 text-center mt-3'>
						<Anuncio />
						<p style={{ color: 'orange', fontSize: '1.2rem' }}>
							Suscríbete a Notas Premium <a href='#'>aqui</a>
						</p>
					</div>
				</div>
			</div>
			<div>
				<h2>Lista de tareas:</h2>
				<button type='button' className='btn btn-sm btn-outline-danger' onClick={borrarTodas}>
					Eliminar todas
				</button>
				<hr />
				<div className='row'>
					{notas.map((nota) => {
						return (
							<div key={nota.id} className='col-md-4 mb-3'>
								<div className='card'>
									<div className='card-body'>
										<h3 className='card-title'>{nota.titulo}</h3>
										<p className='card-text'>{nota.desc}</p>
										<p
											className={nota.completa ? 'text-success' : 'text-danger'}
											onClick={() => togleComplete(nota.id)}
											style={{cursor: "pointer"}}
										>
											{nota.completa ? 'Completada' : 'Sin completar'}
										</p>
										<button className='btn btn-outline-danger' onClick={() => eliminarNota(nota.id)}><i className="bi bi-trash"></i></button>
									</div>
									<div className='card-footer'>Creada: {nota.fecha}</div>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default App
