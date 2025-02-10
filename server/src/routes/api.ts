import { Router, Request, Response } from "express"
import { Book, IBook } from "../models/Book"


const router:Router = Router();

router.post("/book", (req: Request, res: Response) => {
    console.log(req.body);

    if (!req.body.name || !req.body.author || !req.body.pages) {
        console.log("Invalid input");
        res.status(400).send("Invalid input");
        return;
    }

    try {
        const book: IBook = new Book({
            "name": req.body.name,
            "author": req.body.author,
            "pages": req.body.pages
        });

        book.save().then((data: IBook) => {
            res.json(data);
        });



    } catch (err: any) {
        console.error(err);
        res.status(500).json({error: "Internal server error"});
        return
    }

});

router.get("/book/:id", (req: Request, res: Response) => {
    const bookName: string = req.params.id;

    if (!bookName) {
        res.status(400).send("Invalid input");
        return;
    }

    const parsedBookName: string = decodeURIComponent(bookName)

    Book.findOne({"name": parsedBookName}).then((data: IBook | null) => {
        if (data) {
            res.status(200).json(data);
            return
        } else {
            res.status(404).json({error: "Book not found"});
            return
        }
    }).catch((err: any) => {
        console.error(err);
        res.status(500).json({error: "Internal server error"});
        return;
    });

});

export default router;