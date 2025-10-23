import {Button} from "@/components/ui/button";
import PropertyCard from "./components/PropertyCard";
import {useEffect, useState} from "react";
import {createProperty, deletePropertyById, getProperties} from "./api/api";
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
  const [searchQuery, setSearchQuery] = useState("");

  // onChange handler for form inputs
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Filter properties by type and search query
  const filteredAndSearchedProperties = properties.filter((property) => {
    const filterMatches = filter === "All" ? true : property.type === filter;

    // Search query matching
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      q === "" ||
      (property.name && property.name.toLowerCase().includes(q)) ||
      (property.location && property.location.toLowerCase().includes(q));

    return filterMatches && matchesSearch; //
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const newProperty = await createProperty(formData);
      toast.success("Property added successfully!");
      setProperties((prev) => [...prev, newProperty]);
      fetchProperties(); // refetch properties to get the latest list
    } catch (error) {
      console.error("Error adding property:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePropertyById(id);
      toast.success("Property deleted successfully!");
      setProperties((prev) => prev.filter((property) => property._id !== id)); // remove deleted property from state
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  const fetchProperties = async () => {
    try {
      const data = await getProperties();
      // set the properties from the API response
      setProperties(data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const loading = properties.length === 0;

  return (
    <div className="min-h-screen px-5">
      {/* header section */}
      <div className="flex items-center py-5 lg:px-0 max-w-7xl md:flex-row mx-auto flex-col gap-7 border-b rounded-md pb-5">
        <h1 className="text-lg font-bold">Property Listing Dashboard</h1>
        {/* Header buttons */}
        <div className="ml-auto mr-5 flex justify-center items-center gap-4 flex-wrap">
          {/* Search Bar */}
          <div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or location"
              className="border rounded px-3 py-1"
            />
          </div>
          {/* Filter Select */}
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
          {/* Add Property Dialog */}
          <Dialog>
            <DialogTrigger>
              <Button className="w-full">Add Property</Button>
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
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center h-60">
          <p className="text-gray-500 text-lg">Loading properties...</p>
        </div>
      )}
      <div className="max-w-7xl mx-auto gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10">
        {filteredAndSearchedProperties.map((property, index) => (
          <PropertyCard
            key={index}
            property={property}
            onDelete={handleDelete}
            onUpdate={fetchProperties}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
