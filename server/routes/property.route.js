import Router from "express";
import {
  createProperty,
  deletePropertyById,
  getProperties,
  updatePropertyById,
} from "../controllers/property.controller.js";

const router = Router();

router.post("/add", createProperty);
router.get("/get", getProperties);
router.delete("/delete/:id", deletePropertyById);
// update property by id
router.put("/update/:id", updatePropertyById);

const propertyRouter = router;
export default propertyRouter;
