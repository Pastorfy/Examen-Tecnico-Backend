import './App.css'
import React, { useState, useCallback, useEffect } from 'react';
import { Card, Button, Table, InputGroup, FormControl,Form, Modal, Pagination,Dropdown } from 'react-bootstrap';
import { BsSearch ,BsPlus,BsTrash, BsPencil,BsCaretUp,BsCaretDown,BsCaretUpFill,BsCaretDownFill} from 'react-icons/bs';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import OrderColumn from './components/OrderColumn';
import FormularioPublicacion from './components/FormularioPublicacion';
import SectionPagination from './components/SectionPagination';
import { usePublicaciones } from './hooks/usePublicaciones';
import debounce from 'just-debounce-it'
import toast, { Toaster } from 'react-hot-toast';
import { deletePublicacion } from './services/apiPublicaciones';

function App() {
	const [query, setQuery] = useState('');		
	const [mostrarModal, setMostrarModal] = useState(false);
	const [itemPublicacion, setItemPublicacion] = useState({IDPublicacion:0 , Autor:'',Contenido:'',Titulo:''});
	const [pageSize,setPageSize] = useState(5);
	const [pageNumber,setPageNumber] = useState(1);
	const [orderByColumn,setOrderByColumn] = useState('Titulo');
	const [orderDirection,setOrderDirection] = useState('asc');	
	const [showContentMap, setShowContentMap] = useState({});

	const handleToggleContent = (id) => {
	  setShowContentMap(prevState => ({
		...prevState,
		[id]: !prevState[id] 
	  }));
	};
	
	const renderContenido = (content, id) => {		
		const shouldShowAll = showContentMap[id];
		if (shouldShowAll) {
		  return <span dangerouslySetInnerHTML={{ __html: highlightMatches(content) }}></span>;
		} else {
		  return <span dangerouslySetInnerHTML={{ __html: highlightMatches(content.slice(0, 70)) }}></span>;
		}
	};

	const { publicaciones,getPublicaciones, loading  } = usePublicaciones();		
	const handleClose = () => {
		setMostrarModal(false);
	};	
	const onNuevo = () => {
		setItemPublicacion({IDPublicacion:0 , Autor:'',Contenido:'',Titulo:''});
		setMostrarModal(true);
	};	
	const handleGuardar = (datos) => {		
		getPublicaciones({query:'',pagination:{pageSize,pageNumber,orderByColumn,orderDirection} });		
	};		
	const debouncedGetPeliculas = useCallback(
		debounce(({query}) => {		  
		  getPublicaciones({ query ,pagination:{pageSize,pageNumber,orderByColumn,orderDirection} })
		}, 300)
		, [getPublicaciones]
	)	  	 	
	const onChangePagination=(event)=>{
		setPageNumber(event.pageNumber);
		setPageSize(event.pageSize);
		getPublicaciones({ query ,pagination:{pageSize:event.pageSize,pageNumber:event.pageNumber,orderByColumn,orderDirection} });
	}
	const onChageInputQuery = (event) => {
		setQuery(event.target.value);
		debouncedGetPeliculas({ query:event.target.value,pageNumber})		
	};
	const highlightMatches = (text) => {		
		if (!query) return text;
		const regex = new RegExp(`(${query})`, 'gi');
		return text.replace(regex, (match) => `<span style="background-color: yellow;">${match}</span>`);
	};	    

	useEffect(() => {
		getPublicaciones({query ,pagination:{pageSize,pageNumber,orderByColumn,orderDirection}});
	}, []);

	const onEliminarPublicacion=async (idpublicacion)=>{
		try {			
			const resp  = await deletePublicacion(idpublicacion);
			getPublicaciones({query:'',pagination:{pageSize,pageNumber,orderByColumn,orderDirection} });
			toast.success('La publicación se elimino con éxito.');
		} catch (error) {
			console.error(error);
		}
	}
	const onOrderByColumn = (event)=>{
		setOrderByColumn(event.orderByColumn);
		setOrderDirection(event.orderDirection);
		getPublicaciones({ query:'',pagination:{ pageSize,pageNumber,orderByColumn:event.orderByColumn,orderDirection:event.orderDirection} });
	}
	
	const onEditarPublicacion=(item)=>{
		try {
			setItemPublicacion(item);
			setMostrarModal(true);			
		} catch (error) {
			console.error(error);
		}
	}
	return (
		<>
			<Toaster   position="bottom-center"   reverseOrder={false}/>
			<Card style={{ width: '1000px' }}>
				<Card.Header>Lista de Publicaciones</Card.Header>
				<Card.Body className='pt-3'>
					<InputGroup className="mb-3" onChange={onChageInputQuery}>
						<FormControl
							placeholder="Busqueda por titulo, autor, contenido ..."
							aria-label="Buscar"
							aria-describedby="basic-addon2"
						/>
						<Button variant="outline-secondary">
							<BsSearch />
						</Button>
					</InputGroup>
					<section className='d-flex justify-content-end my-2'>					
					<Button variant="primary" onClick={onNuevo}>
						Nueva Publicacion <BsPlus/>
					</Button>
					</section>					
					<Table striped bordered hover >
						<colgroup>
							<col style={{ width: '15%' }} />
							<col style={{ width: '15%' }} />
							<col style={{ width: '20%' }} />
							<col style={{ width: '40%' }} />
							<col style={{ width: '10%' }} />
						</colgroup>
						<thead>
							<tr>
								<th className='p-0'>
									<div className='d-flex justify-content-center'>
										<span >Titulo</span> 
										<OrderColumn column='Titulo' active={orderByColumn=='Titulo'} onChange={onOrderByColumn} />									 
									</div> 									
								</th>
								<th className='p-0'>
									<div className='d-flex justify-content-center'>
										<span >Autor</span> 
										<OrderColumn column='Autor'  active={orderByColumn=='Autor'} onChange={onOrderByColumn} />									 
									</div> 									
								</th>								
								<th className='p-0'>
									<div className='d-flex justify-content-center'>
										<span >Fecha de publicación</span> 
										<OrderColumn column='FechaPublicacion'  active={orderByColumn=='FechaPublicacion'} onChange={onOrderByColumn} />									 
									</div> 									
								</th>								
								<th className='p-0'>
									<div className='d-flex justify-content-center'>
										<span >Contenido</span> 
										<OrderColumn column='Contenido'  active={orderByColumn=='Contenido'} onChange={onOrderByColumn} />									 
									</div> 									
								</th>								
								<th >
									Acciones								
								</th>																
							</tr>
						</thead>
						<tbody style={{ cursor: 'pointer' }}>
							{publicaciones.length > 0 ? (
								publicaciones.map((item) => (
									<tr key={item.IDPublicacion}>
										<td dangerouslySetInnerHTML={{ __html: highlightMatches(item.Titulo) }}></td>
										<td dangerouslySetInnerHTML={{ __html: highlightMatches(item.Autor) }}></td>
										<td>{format(item.FechaPublicacion, 'MMM d, yyyy h:mm a', { locale: es })}</td>
										<td>											
											<span onClick={() => handleToggleContent(item.IDPublicacion)}>
												{renderContenido(item.Contenido, item.IDPublicacion)}
												{
													item.Contenido.length>70 &&
													<span style={{color:'blue'}}>{showContentMap[item.IDPublicacion] ? ' Ocultar ' : ' Ver mas...'}</span>
												}												
											</span>
										</td>              																																 										
										<td >
											<Dropdown >
												<Dropdown.Toggle variant="secondary" id="dropdown-basic" size='sm'>
													Opciones
												</Dropdown.Toggle>
												<Dropdown.Menu>
													<Dropdown.Item   onClick={()=> onEditarPublicacion(item) }>
														Editar <BsPencil/>
													</Dropdown.Item>
													<Dropdown.Item   onClick={() => onEliminarPublicacion(item.IDPublicacion)}>
														Eliminar <BsTrash/>
													</Dropdown.Item>																										
												</Dropdown.Menu>
											</Dropdown>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan={5}> No se han encontrado resultados.</td>
								</tr>
							)}
						</tbody>
					</Table>
					<SectionPagination 
						totalPages={publicaciones[0]?.TotalPaginas||0 } 
						totalRows={publicaciones[0]?.TotalRegistros ||0}
						onChange={onChangePagination}
					/> 					 
				</Card.Body>
			</Card>
			<FormularioPublicacion mostrarModal={mostrarModal} onClose={handleClose} onGuardar={handleGuardar} publicacion={itemPublicacion} />			 
		</>
	);
}
export default App;
