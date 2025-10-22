import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
const PropertyCard = ({property, key}) => {
  return (
    <div
      key={key}
      className="border p-5 rounded-lg shadow-md col-span-5 md:col-span-2 lg:col-span-1"
    >
      <h2 className="text-xl font-semibold mb-2">{property.name}</h2>
      <p className="text-gray-800 font-medium">Type: {property.type}</p>
      <p className="text-gray-600 mb-1">{property.description}</p>
      <p className="text-gray-800 font-medium">Location: {property.location}</p>
      <p className="text-gray-800 font-medium">Price: ₹{property.price}</p>
      <div className="mt-2 flex gap-3">
        <Dialog>
          <DialogTrigger className="w-full">
            <Button className="w-full">View Details</Button>
          </DialogTrigger>
          <DialogContent>
            <h2 className="text-xl font-semibold mb-2">{property.name}</h2>
            <p className="text-gray-800 font-medium">Type: {property.type}</p>
            <p className="text-gray-600 mb-1">{property.description}</p>
            <p className="text-gray-800 font-medium">
              Location: {property.location}
            </p>
            <p className="text-gray-800 font-medium">
              Price: ₹{property.price}
            </p>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default PropertyCard;
