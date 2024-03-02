import React, { useState} from 'react';
import { Form, Pagination } from 'react-bootstrap';
import {  BsCaretUp,BsCaretDown,BsCaretUpFill,BsCaretDownFill} from 'react-icons/bs';

function OrderColumn({ column,active, onChange }) {    

    const [orderByColumn,setOrderByColumn] = useState('');
	const [orderDirection,setOrderDirection] = useState('asc');

	const onOrderByColumn = (event)=>{
		setOrderByColumn(event.orderByColumn);
		setOrderDirection(event.orderDirection);
		onChange({ orderByColumn:event.orderByColumn,orderDirection:event.orderDirection} );
	}

	return (
		<>
            <div style={{ display: 'flex', flexDirection: 'column' }} className='mx-2'>
                {active ? (
                    <>
                        {orderDirection === 'asc' ? (
                        <>                        
                            <BsCaretUpFill onClick={() => onOrderByColumn({ orderByColumn: column, orderDirection: 'desc' })} style={{ cursor: 'pointer' }} />
                            <BsCaretDown onClick={() => onOrderByColumn({ orderByColumn: column, orderDirection: 'desc' })} style={{ cursor: 'pointer' }} />													
                        </>
                        ) : (
                        <>                        
                            <BsCaretUp onClick={() => onOrderByColumn({ orderByColumn: column, orderDirection: 'asc' })} style={{ cursor: 'pointer' }} />
                            <BsCaretDownFill onClick={() => onOrderByColumn({ orderByColumn: column, orderDirection: 'asc' })} style={{ cursor: 'pointer' }} />
                        </>
                        )}
                    </>
                    ) : (
                    <>
                        <BsCaretUp onClick={() => onOrderByColumn({ orderByColumn: column, orderDirection: 'asc' })} style={{ cursor: 'pointer' }} />
                        <BsCaretDown onClick={() => onOrderByColumn({ orderByColumn: column, orderDirection: 'desc' })} style={{ cursor: 'pointer' }} />
                    </>
                    )}																				
            </div>
		</>
	);
}

export default OrderColumn;
