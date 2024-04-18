import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { BoxHB } from './HomeBroker.styled';
import { Paper, Typography, Container, Box, styled } from '@mui/material/';
import TableCotacao from './Table';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#f0f0f0',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function HomeBroker() {


  return (
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <BoxHB>
            <Typography sx={{  padding: '2vh' }} variant='h4'>Homebroker</Typography>
          </BoxHB>
          <Container sx={{ width: '100%', padding: '5vh' }}>
            <Grid container spacing={4}>
              <Grid xs={6}>
                  <TableCotacao />
              </Grid>
              <Grid xs={6}>
                <Item>2</Item>
              </Grid>
              <Grid xs={6}>
                <Item>3</Item>
              </Grid>
              <Grid xs={6}>
                <Item>4</Item>
              </Grid>
            </Grid>
          </Container>
      </Box>
  );
}