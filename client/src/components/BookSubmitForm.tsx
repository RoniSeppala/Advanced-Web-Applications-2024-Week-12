import React from "react";
import { Box, Button, TextField } from "@mui/material";


const submitBook = async (name: string, author: string, pages: number) => {
    try {
        console.log(name, author, pages);

        if (!name || !author || !pages || pages < 0 || name === '' || author === ''|| name === ' ' || author === ' ') {
            throw new Error('Invalid input');
        }

        const response = await fetch('/api/book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                author: author,
                pages: pages
            })
        })

        if (!response.ok) {
            console.error('Failed to submit book');
            throw new Error('Failed to submit book');
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        if (error instanceof Error) {
            console.log("Error when sending book ${error.message}")
        }
    }
}


const BookSubmitForm:React.FC = () => {
    const [name, setName] = React.useState<string>('');
    const [author, setAuthor] = React.useState<string>('');
    const [pages, setPages] = React.useState<number>(0);


    return (
        <>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid black',
                    padding: '20px',
                    paddingTop: '10px',
                    borderRadius: '10px'
                }}
                noValidate
                autoComplete="off">
                    <h2>Book form</h2>
                    <TextField
                        required
                        id="name"
                        label="Name"
                        defaultValue=""
                        onChange={(e) => setName(e.target.value)} />
                    <TextField
                        required
                        id="author"
                        label="Author"
                        defaultValue=""
                        onChange={(e) => setAuthor(e.target.value)} />
                    <TextField
                        required
                        id="pages"
                        label="Pages"
                        defaultValue=""
                        onChange={(e) => setPages(parseInt(e.target.value))} />
                    <Button
                        variant="contained"
                        id="submit"
                        onClick={() => submitBook(name, author, pages)}>
                            Submit
                    </Button>
                </Box>
        </>
    )
}


export default BookSubmitForm;