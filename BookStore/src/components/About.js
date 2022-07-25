import {Box, Typography} from "@mui/material";
import React from 'react'

const About = () => {
  return <div>
    <Box display = 'flex' flexDirection = 'column' alignItems= 'center'  sx={{ mt: '100px' }}>
      <Typography sx= {{fontFamily: "fantasy"}} variant = "h2">This is a CRUD Application</Typography>
      <Typography sx= {{fontFamily: "fantasy"}} variant = "h3">By: Elie Khazzaka</Typography>
    </Box>
  </div>
};

export default About;