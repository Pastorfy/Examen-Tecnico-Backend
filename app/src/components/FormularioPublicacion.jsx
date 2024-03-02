import React, { useState, useEffect, useId } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { BsFloppy } from 'react-icons/bs';
import { postDataPublicaciones } from '../services/apiPublicaciones';
import toast, { Toaster } from 'react-hot-toast';

function FormularioPublicacion({ mostrarModal, onClose, onGuardar, publicacion }) {
	const [idPublicacion,setIDPublicacion]= useState(0)
	const [autor, setAutor] = useState('');
	const [titulo, setTitulo] = useState('');
	const [contenido, setContenido] = useState('');

	const handleSubmit = async (event) => {
		try {
			event.preventDefault();
			if (!autor || !titulo || !contenido) {
				alert('Todos los campos son requeridos');
				return;
			}
			const respuesta = await postDataPublicaciones({ IDPublicacion:idPublicacion,Autor: autor, Titulo: titulo, Contenido: contenido });			
			onGuardar({ ...respuesta });
			onClose();
			toast.success('La publicación se guardo con éxito.');
		} catch (e) {
			toast.success('Ha ocurrido un error al guardar la publicación.');
		}
	};
	useEffect(() => {
		if (mostrarModal) {
			if (publicacion.IDPublicacion) {
				setAutor(publicacion.Autor);
				setTitulo(publicacion.Titulo);
				setContenido(publicacion.Contenido);	
				setIDPublicacion(publicacion.IDPublicacion);
			} else {
				setAutor('');
				setTitulo('');
				setContenido('');
				setIDPublicacion(0)
			}
		}
	}, [mostrarModal]);
	return (
		<>
			<Toaster position="bottom-center" reverseOrder={false} />
			<Modal show={mostrarModal} onHide={onClose} backdrop="static">
				<Modal.Header closeButton>
					<Modal.Title>Crear nueva publicación</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit}>
						<Form.Group controlId="formTitulo" className='mt-2'>
							<Form.Label>Titulo</Form.Label>
							<Form.Control
								type="text"
								placeholder="Ingrese el titulo"
								value={titulo}
								onChange={(e) => setTitulo(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group controlId="formAutor" className='mt-2'>
							<Form.Label>Autor</Form.Label>
							<Form.Control
								type="text"
								placeholder="Ingrese el autor"
								value={autor}
								onChange={(e) => setAutor(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group controlId="formContenido" className='mt-2'>
							<Form.Label>Contenido</Form.Label>
							<Form.Control
								as="textarea"
								rows={3}
								placeholder="Ingrese el contenido"
								value={contenido}
								onChange={(e) => setContenido(e.target.value)}
								required
							/>
						</Form.Group>

						<Button variant="primary" type="submit" size='sm' className='mt-2'>
							Guardar <BsFloppy />
						</Button>
					</Form>
				</Modal.Body>
			</Modal>
		</>
	);
}

export default FormularioPublicacion;
