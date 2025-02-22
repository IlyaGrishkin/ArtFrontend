import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function BasicPagination(props) {
    const totalCards = props.totalCards
    const maxCards = props.maxCards
    const totalPages = Math.ceil(totalCards / maxCards)
    
    if (totalPages > 1) {
        return (
            <Stack spacing={2}>
                <Pagination count={totalPages} page={props.page} onChange={props.handleChange}/>
            </Stack>
        );
    }
    
    
}