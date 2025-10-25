import { Router } from "express";

const router = Router();

// Ejemplo temporal (después lo cambiamos)
router.get("/", (req, res) => {
  res.json({ message: "API funcionando 🚀" });
});

export default router;
