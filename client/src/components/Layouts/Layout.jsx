import { Box, Container, Grid } from '@mui/material'
import React from 'react'
import SideBar from '../SideBar'
import SearchBar from '../SearchBar'

const Layout = ({children, sidebar}) => {
  return (
    <Container>
      <SearchBar />
      <Grid container spacing={3} py={4}>
        <Grid item xs={12} md={3}>
          <Box boxShadow={1}>
            {/* <SideBar /> */}
            {sidebar}
          </Box>
        </Grid>
        <Grid item xs={12} md={9}>
          {children}
        </Grid>
      </Grid>
    </Container>
  )
}

export default Layout