import Router from "express";
import {
  createProperty,
  deletePropertyById,
  getProperties,
} from "../controllers/property.controller.js";

const router = Router();

router.post("/add", createProperty);
router.get("/get", getProperties);
router.delete("/delete/:id", deletePropertyById);

const propertyRouter = router;
export default propertyRouter;
