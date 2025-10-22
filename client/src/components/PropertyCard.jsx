import {Button} from "@/components/ui/button";
import {useState} from "react";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import {toast} from "sonner";
import {updatePropertyById} from "../api/api";

const PropertyCard = ({property, key, onDelete, onUpdate}) => {
  const [formData, setFormData] = useState({
    name: property.name,
    description: property.description,
    type: property.type,
    location: property.location,
    price: property.price,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updatePropertyById(property._id, formData);
      toast.success("Property updated successfully!");
      // notify parent to refetch latest data
      if (typeof onUpdate === "function") onUpdate();
    } catch (error) {
      console.error("Error updating property:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      key={key}
      className="border p-5 rounded-lg shadow-md col-span-5 md:col-span-2 lg:col-span-1"
    >
      <h2 className="text-xl font-semibold mb-2">{property.name}</h2>
      <p className="text-gray-800 font-medium">Type: {property.type}</p>
      <p className="text-gray-600 mb-1">
        {property.description.slice(0, 100)}...
      </p>
      <div className="mt-2 flex gap-3">
        <Dialog>
          <DialogTrigger className="w-full">
            <Button className="w-full">View Details</Button>
          </DialogTrigger>
          <DialogContent>
            <h2 className="text-xl font-semibold mb-2">{property.name}</h2>
            <p className="text-gray-800 font-medium">Type: {property.type}</p>
            <p className="text-gray-600 text-sm mb-1">{property.description}</p>
            <p className="text-gray-800 font-medium">
              Location: {property.location}
            </p>
            <p className="text-gray-800 font-medium">
              Price: ₹{property.price}
            </p>
          </DialogContent>
        </Dialog>

        <div>
          <Button className="w-full" onClick={() => onDelete(property._id)}>
            Delete
          </Button>
        </div>
        <div>
          <Dialog>
            <DialogTrigger>
              <Button className="w-full">Edit</Button>
            </DialogTrigger>

            <DialogContent>
              <p>Edit Property</p>
              <form className="p-5" onSubmit={handleUpdate}>
                <h2 className="text-xl font-semibold mb-2">Edit Property</h2>
                <div className="grid gap-4">
                  <div>
                    <label className="block mb-1 font-medium">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2"
                      placeholder="Property Name"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2"
                      placeholder="Property Description"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Type</label>
                    <input
                      type="text"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2"
                      placeholder="Property Type"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Location</label>
                    <input
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      type="text"
                      className="w-full border rounded px-3 py-2"
                      placeholder="Property Location"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Price</label>
                    <input
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      type="text"
                      className="w-full border rounded px-3 py-2"
                      placeholder="Property Price"
                    />
                  </div>
                  <Button type="submit" className="w-full mt-4">
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
