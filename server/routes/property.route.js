import Router from "express";
import {
  createProperty,
  getProperties,
} from "../controllers/property.controller.js";

const router = Router();

router.post("/add", createProperty);
router.get("/get", getProperties);

const propertyRouter = router;
export default propertyRouter;
