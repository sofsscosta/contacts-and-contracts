import React from 'react'
import { Box } from '@mui/material';

const Container = props => {
    return (
        <Box sx={{height: '100vh', display: 'flex'}}>
            <Box m={'auto'} sx={{
                    borderRadius: 3,
                    boxShadow: '0px 0px 20px 0px #B5B5B5',
                    minWidth: '60vw'
                }}>
                {props.children}
            </Box>
        </Box>
    )
}

export default Container;