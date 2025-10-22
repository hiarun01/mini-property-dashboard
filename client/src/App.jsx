import {Button} from "@/components/ui/button";
import PropertyCard from "./components/PropertyCard";
import {useEffect, useState} from "react";
import {createProperty, getProperties} from "./api/api";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {toast} from "sonner";

function App() {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "",
    location: "",
    price: "",
  });
  const [filter, setFilter] = useState("All");

  console.log(formData);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Filter properties by type
  const filteredProperties =
    filter === "All"
      ? properties
      : properties.filter((property) => property.type === filter);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const newProperty = await createProperty(formData);
      toast.success("Property added successfully!");
      setProperties((prev) => [...prev, newProperty]);
    } catch (error) {
      console.error("Error adding property:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch properties on component mount
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getProperties();
        // set the properties from the API response
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    fetchProperties();
  }, []);

  return (
    <div className="">
      {/* header section */}
      <div className="flex justify-center items-center h-15  max-w-7xl mx-auto px-5 border-b py-4">
        <h1 className="text-lg font-bold">Property Listing Dashboard</h1>
        <div className="ml-auto mr-5 flex items-center gap-4">
          <Dialog>
            <DialogTrigger>
              <Button className="w-full">Add</Button>
            </DialogTrigger>
            <DialogContent>
              <form className="p-5" onSubmit={handleSubmit}>
                <h2 className="text-xl font-semibold mb-2">Add New Property</h2>
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
                    {isLoading ? "Adding..." : "Add Property"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          <div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter By Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Studio">Studio</SelectItem>
                <SelectItem value="Apartment">Apartment</SelectItem>
                <SelectItem value="House">House</SelectItem>
                <SelectItem value="Plot">Plot</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="mt-5"></div>
      {/* card section  */}
      <div className="max-w-7xl mx-auto px-5 gap-5 mt-10 grid grid-cols-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredProperties.map((property, index) => (
          <PropertyCard key={index} property={property} />
        ))}
      </div>
    </div>
  );
}

export default App;
