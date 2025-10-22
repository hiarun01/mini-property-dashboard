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

export const deletePropertyById = async (req, res) => {
  try {
    const {id} = req.params;
    const deletedProperty = await Property.findByIdAndDelete(id);
    if (!deletedProperty) {
      return res.status(404).json({message: "Property not found."});
    }
    return res.status(200).json({message: "Property deleted successfully."});
  } catch (error) {
    return res.status(500).json({message: "Internal server error."});
  }
};

// update property by id
export const updatePropertyById = async (req, res) => {
  const {id} = req.params;
  try {
    const {name, description, type, location, price} = req.body;
    const updatedProperty = await Property.findByIdAndUpdate(
      id,
      {name, description, type, location, price},
      {new: true}
    );

    if (!updatedProperty) {
      return res.status(404).json({message: "Property not found."});
    }
    return res.status(200).json({
      message: "Property updated successfully.",
      property: updatedProperty,
    });
  } catch (error) {
    return res.status(500).json({message: "Internal server error."});
  }
};
