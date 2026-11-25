const express = require("express");
const authenticateToken = require("../middlewares/auth");
const router = express.Router();
const { 
    createSpecialty,
    listSpecialties,
    getSpecialtyById, 
    deleteSpecialty, 
    updateSpecialty, 
    deleteByArea 
} = require("../controllers/specialtyController");

router.post("/",authenticateToken, createSpecialty);
router.get("/", listSpecialties);
router.get("/:id", getSpecialtyById);
router.delete("/:id", authenticateToken, deleteSpecialty);
router.patch("/:id", authenticateToken, updateSpecialty);
router.delete("/area/:area", authenticateToken, deleteByArea);

module.exports = router;