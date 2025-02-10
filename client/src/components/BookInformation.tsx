import React, { useEffect } from "react";
import { useParams, } from "react-router-dom";

interface IBook {
    name: string;
    author: string;
    pages: number;
}

const BookInformation:React.FC = () => {
    const { id } = useParams<{id:any}>();
    const [bookData, setBookData] = React.useState<IBook>({name: '', author: '', pages: 0});
    const [loading, setLoading] = React.useState<boolean>(true);
    console.log(id);

    useEffect(() => {
        const fetchData = async () => {
            console.log('fetching data');
            try {
                const response = await fetch(`/api/book/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch book');
                }

                const data = await response.json();
                setBookData(data);
                console.log(data);
                setLoading(false);
            } catch (error) {
                if (error instanceof Error) {
                    console.log(`Error when fetching book ${error.message}`);
                }
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            {loading ? <h1>404: This is not the webpage you are looking for</h1> : <><p>{bookData.name}</p> <p> {bookData.author}</p> <p> {bookData.pages}</p></>}
        </div>
    )
}

export default BookInformation;