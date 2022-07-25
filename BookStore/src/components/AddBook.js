
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const AddBook = () => {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    price: "",
    author: "",
    image: "",

  });
  const [checked, setChecked] = useState(false)
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }

  const sendRequest = async () => {
    await axios.post("http://localhost:5000/books", {
      name: String(inputs.name),
      author: String(inputs.author),
      description: String(inputs.description),
      price: Number(inputs.price),
      image: String(inputs.image),
      available: Boolean(checked),

    }).then(res => res.data);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs, checked);
    sendRequest().then(() => history("/books"));
  }
  return (

    <form onSubmit={handleSubmit}>

      <Box
        display="flex"
        flexDirection="column"
        justifyContent={'center'}
        maxWidth={700}
        sx={{ mt: '100px' }}
        alignContent={"center"}
        alignSelf="center"
        marginLeft={"auto"}
        marginRight="auto"
      >
        <TextField value={inputs.name} onChange={handleChange} margin="normal" name="name" label="Name" />
        <TextField value={inputs.author} onChange={handleChange} margin="normal" name="author" label="Author" />
        <TextField value={inputs.description} onChange={handleChange} margin="normal" name="description" label="Description" />
        <TextField value={inputs.price} onChange={handleChange} type="number" margin="normal" name="price" label="Price" />
        <TextField value={inputs.image} onChange={handleChange} margin="normal" name="image" label="ImageUrl" />
        <FormControlLabel control={<Checkbox checked={checked} onChange={() => setChecked(!checked)} />} label="Available" />

        <Button vatiant="contained" type='submit'>Add Book</Button>
      </Box>
    </form>

  );
};

export default AddBook;