
import { Router } from "express";

const router = Router();

router.get('/allProducts', (req, res) => {
    res.render('realTimeProducts')
});

export default router;