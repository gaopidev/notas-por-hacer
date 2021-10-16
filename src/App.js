import React, { useEffect, useState } from 'react'
import { data } from './db/notas'

const Anuncio = () => React.createElement('h2', {}, 'Nunca olvides tus tareas')
let initId = 5

const Formulario = () => {
	const addNota = (e) => {
		e.preventDefault()
		const titulo = document.getElementById('titulo').value
		const descr = document.getElementById('descripcion').value
		const fecha = new Date()
		const stamp = `${fecha.getDay()}/${
			fecha.getMonth() + 1
		}/${fecha.getFullYear()} ${fecha.getHours()}:${fecha.getMinutes()}`
		const nuevaNota = {
			id: initId,
			titulo,
			descripcion: descr,
			fecha: stamp,
			terminada: false,
		}
		initId += 1
		document.getElementById('titulo').value = ''
		document.getElementById('descripcion').value = ''
		console.log(nuevaNota)
	}
	return (
		<div className='my-5'>
			<h2>Nueva tarea</h2>
			<div className='row'>
				<div className='col-md-6'>
					<form>
						<div className='mb-3'>
							<label htmlFor='titulo' className='form-label'>
								Nombre de la tarea
							</label>
							<input
								type='text'
								className='form-control'
								name='titulo'
								id='titulo'
							/>
						</div>
						<div className='mb-3'>
							<label htmlFor='descripcion' className='form-label'>
								Descripcion de la tarea
							</label>
							<input
								type='text'
								className='form-control'
								name='descripcion'
								id='descripcion'
							/>
						</div>
						<div className='mb-3'>
							<button
								type='button'
								className='btn btn-primary'
								onClick={addNota}
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
	)
}

const Pizarra = () => {
	const [notas, setNotas] = useState(data)
	const borrarNota = (id) => {
		const nuevas = notas.filter((nota) => nota.id !== id)
		setNotas(nuevas)
	}
	return (
		<div>
			<h2>Lista de tareas:</h2>
			<button
				type='button'
				className='btn btn-sm btn-outline-danger'
				onClick={() => setNotas([])}
			>
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
									<p className='card-text'>{nota.descripcion}</p>
									<p
										className={nota.terminada ? 'text-success' : 'text-danger'}
									>
										{nota.terminada ? 'Completada' : 'Sin completar'}
									</p>
									<button
										type='button'
										className='btn btn-sm btn-danger mx-2'
										onClick={() => borrarNota(nota.id)}
									>
										Eliminar
									</button>
								</div>
								<div className='card-footer'>Creada: {nota.fecha}</div>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

const App = () => {
	return (
		<div className='container mt-3'>
			<h1 className='text-center'>Tareas por hacer</h1>
			<Formulario />
			<Pizarra />
		</div>
	)
}

export default App
