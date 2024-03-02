const API_URL = import.meta.env.VITE_API_URL;

async function fetchDataPublicaciones({query,pagination}) {        
    const {pageSize,pageNumber ,orderByColumn,orderDirection}=pagination            
    try {
        const response = await fetch(`${API_URL}/publicaciones?query=${query}&pageSize=${pageSize}&pageNumber=${pageNumber}&orderByColumn=${orderByColumn}&orderDirection=${orderDirection}`);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
} 

async function postDataPublicaciones( data) {
    try {        
        const temp= data.IDPublicacion? `/${data.IDPublicacion}`:''
        const method= data.IDPublicacion? 'PATCH':'POST';
        const response = await fetch(`${API_URL}/publicaciones${temp}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Failed to post data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
}
async function deletePublicacion(id) {
    try {
        
        const response = await fetch(`${API_URL}/publicaciones/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error deleting data:', error);
        throw error;
    }
}

export { fetchDataPublicaciones ,postDataPublicaciones,deletePublicacion };
