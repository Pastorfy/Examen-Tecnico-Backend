import React, { useState} from 'react';
import { Form, Pagination } from 'react-bootstrap';

function SectionPagination({ totalPages,totalRows, onChange }) {    
	const NUMEROS_PAGINACION=[5,10,15,20,25,30,50,100,200,300,400,500]
	const [pageSize,setPageSize] = useState(5);
	const [pageNumber,setPageNumber] = useState(1);    
    const onChangePageNumber= (number)=>{
		if(number===0){
			number=1
		}else if(number>totalPages){
			number=totalPages;
		}		
		setPageNumber(number);		
        onChange({pageSize,pageNumber:number});		
	}
    const onChangePageSize= (event)=>{
        setPageNumber(1);
		setPageSize(+event.target.value);		
		onChange({pageSize:+event.target.value,pageNumber:1});
	}	
    const getNumberDel=()=>{
        return totalRows===0?0 :  ((pageNumber-1)*pageSize)+1
    }
    const getNumberAl=()=>{
        return  totalRows===0?0 :(pageNumber===totalPages ? totalRows: (pageSize*pageNumber))
    }
    const getNumberDE=()=>{
        return totalRows || 0
    }
	return (
		<>
            <section className='d-flex justify-content-between  align-items-center'>
                <Form.Select size="sm" style={{ width: 'auto' }} onChange={onChangePageSize}>
                    {NUMEROS_PAGINACION.map((pageNumber)=>(<option key={pageNumber}>{pageNumber}</option>))}        				
                </Form.Select>
                <Pagination className='m-0'>
                    <Pagination.First onClick={()=>{onChangePageNumber(1)}} />
                    <Pagination.Prev onClick={()=>{onChangePageNumber(pageNumber-1)}} />
                    {								
                        Array.from({ length: totalPages||0 }, (_, index) => (
                            <Pagination.Item 
                                active={pageNumber===index+1}
                                key={`ps_${index+1}`} 
                                onClick={()=>{onChangePageNumber(index+1)}}
                            >{index+1}
                            </Pagination.Item>
                        ))
                    }							
                    <Pagination.Next onClick={()=>{onChangePageNumber(pageNumber+1)}} />
                    <Pagination.Last onClick={()=>{onChangePageNumber(totalPages)}}/>
                </Pagination>						
                <span className='small text-muted'>
                    Mostrando registros del <b>{getNumberDel()}</b> al <b>{getNumberAl()}</b> de <b>{getNumberDE()}</b> registros
                </span>
            </section>
		</>
	);
}

export default SectionPagination;
