import {Property} from "../models/property.model.js";

export const createProperty = async (req, res) => {
  try {
    const {name, description, type, location, price} = req.body;

    if (!name || !description || !type || !location || !price) {
      return res.status(400).json({message: "All fields are required."});
    }

    const newProperty = await Property.create({
      name,
      description,
      type,
      location,
      price,
    });

    return res.status(201).json({
      message: "Property created successfully",
      property: newProperty,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({message: "Internal server error."});
  }
};

export const getProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    return res.status(200).json(properties);
  } catch (error) {
    return res.status(500).json({message: "Internal server error."});
  }
};
