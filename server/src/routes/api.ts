import { Router, Request, Response } from "express"


const router:Router = Router();

router.post("/book", (req: Request, res: Response) => {
    console.log(req.body);
});



export default router;