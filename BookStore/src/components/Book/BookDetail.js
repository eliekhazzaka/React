import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';


const BookDetail = () => {

    const [inputs, setInputs] = useState({});
    const id = useParams().id;
    const [checked, setChecked] = useState(false);
    const history = useNavigate();
    console.log(id);

    useEffect(() => {
        const fetchHandler = async () => {
            await axios
                .get(`http://localhost:5000/books/${id}`)
                .then((res) => res.data).then(data => setInputs(data.book));
        };
        fetchHandler()
    }, [id])

    const sendRequest = async () => {
        await axios.put(`http://localhost:5000/books/${id}`, {
            name: String(inputs.name),
            author: String(inputs.author),
            description: String(inputs.description),
            price: Number(inputs.price),
            image: String(inputs.image),
            available: Boolean(checked),
        }).then(res=>res.data)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest().then(()=> history("/books") );
    }

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    return <div>
        {inputs && (
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
                    <TextField value={inputs.name} onChange={handleChange} margin="normal" name="name" />
                    <TextField value={inputs.author} onChange={handleChange} margin="normal" name="author" />
                    <TextField value={inputs.description} onChange={handleChange} margin="normal" name="description" />
                    <TextField value={inputs.price} onChange={handleChange} type="number" margin="normal" name="price" />
                    <TextField value={inputs.image} onChange={handleChange} margin="normal" name="image" />
                    <FormControlLabel control={<Checkbox checked={checked} onChange={() => setChecked(!checked)} />} label="Available" />

                    <Button vatiant="contained" type='submit'>Update Book</Button>
                </Box>
            </form>
        )}
    </div>;
}

export default BookDetail;