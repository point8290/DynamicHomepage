import React, { useRef, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { Feature } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import localforage from "localforage";
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";
import { FaPencil } from "react-icons/fa6";
const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState<Feature>({
    title: "",
    id: "",
    subtitle: "",
    image: "",
  });
  const [image, setImage] = useState<File | undefined>();
  const imageRef = useRef(null);
  const { homepageData, setHomepageData } = useAppContext();

  const onEditTap = (item: Feature) => {
    setIsEdit(true);
    setFormData({ ...item });
  };

  const handleReset = () => {
    setIsEdit(false);
    setImage(undefined);
    setFormData({
      title: "",
      id: "",
      subtitle: "",
      image: "",
    });
    //@ts-expect-error gbg
    imageRef.current.value = "";
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSave = async () => {
    try {
      const id = isEdit ? formData.id : new Date().toISOString();
      const imageString = `Image-${id}`;
      if (image) {
        // Store the image in IndexedDB
        await localforage.setItem(imageString, image);
      }

      const newFeature = {
        id: id, // unique id for the feature
        title: formData.title,
        subtitle: formData.subtitle,
        image: image ? imageString : "",
      };

      // Function to retrieve image Blob from IndexedDB
      const retrieveImage = async (name: string): Promise<Blob | null> => {
        try {
          const imageBlob = await localforage.getItem<Blob>(name);
          return imageBlob;
        } catch (error) {
          console.error("Failed to retrieve image:", error);
          return null;
        }
      };

      // Function to get the image URL
      const getImage = async (
        imageString: string | undefined
      ): Promise<string> => {
        if (imageString) {
          const imageBlob = await retrieveImage(imageString);
          if (imageBlob) {
            const imageUrl = URL.createObjectURL(imageBlob);
            return imageUrl;
          }
        }
        return "";
      };

      const localData = localStorage.getItem("homepageData");
      let data = { features: [] };
      if (localData) {
        data = JSON.parse(localData);
      }
      if (isEdit) {
        const index = data.features.findIndex((item: Feature) => {
          return item.id == newFeature.id;
        });
        if (index !== -1) {
          data.features.splice(index, 1);
        }
        console.log(data.features.length);
      }
      const updatedHomepageData = {
        features: [...data.features, newFeature],
      };
      console.log(updatedHomepageData.features.length);

      localStorage.setItem("homepageData", JSON.stringify(updatedHomepageData));

      // Using async/await to resolve the image URL before setting state
      const imageUrl = await getImage(newFeature.image);

      if (isEdit) {
        const index = homepageData.features.findIndex((item: Feature) => {
          return item.id == newFeature.id;
        });
        if (index !== -1) {
          homepageData.features.splice(index, 1);
        }
        console.log(homepageData.features.length);
      }
      const stateData = {
        features: [
          ...homepageData.features,
          { ...newFeature, image: imageUrl },
        ],
      };
      console.log(stateData.features.length);

      setHomepageData(stateData);
      navigate("/");
    } catch (error) {
      console.error("Failed to save image to IndexedDB:", error);
    }
  };

  return (
    <div className="bg-black h-full  p-8 rounded-lg shadow-lg  mt-12">
      <h2 className="text-2xl font-bold mb-6">Available features</h2>
      <div className="flex overflow-x-auto flex-nowrap items-center w-full relative">
        {homepageData.features.length > 5 && (
          <CgChevronLeft
            className="z-50 fixed bg-black h-32"
            size={40}
            color="white"
          />
        )}
        {homepageData.features &&
          homepageData.features.map((item) => {
            return (
              <div
                onClick={() => onEditTap(item)}
                key={item.id}
                className="relative cursor-pointer flex-shrink-0 mx-4 flex flex-col justify-center items-center"
                style={{ minWidth: "200px" }}
              >
                <img src={item.image} alt={item.title} className="w-32 h-32" />
                <div className="absolute text-center mt-2">
                  <div className="font-bold">{item.title}</div>
                  <div className="font-semibold">{item.subtitle}</div>
                </div>
                <div className="absolute group z-10 h-[120px] w-[120px] bg-transparent hover:bg-[rgba(0,0,0,0.32)] ">
                  <FaPencil
                    color="white"
                    className="absolute invisible h-full left-0 right-0 mx-auto text-center group-hover:visible"
                    width={25}
                  />
                </div>
              </div>
            );
          })}
        {homepageData.features.length > 5 && (
          <CgChevronRight
            className="z-50 fixed right-0"
            size={40}
            color="white"
          />
        )}
        {homepageData.features.length == 0 && (
          <div className="mx-auto">No avaibale fetaures</div>
        )}
      </div>

      <div className=" p-8 rounded-lg shadow-lg max-w-3xl mx-auto mt-12">
        <h2 className="text-2xl font-bold mb-6">
          {isEdit ? "Edit Feature" : "Add Feature"}
        </h2>

        <div className="mb-4">
          <label className="block text-gray-400 mb-2">Feature Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full text-black px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-400 mb-2">Feature Subtitle</label>
          <input
            type="text"
            name="subtitle"
            id="subtitle"
            value={formData.subtitle}
            onChange={handleInputChange}
            className="w-full text-black px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-400 mb-1">Images</label>
          <input
            ref={imageRef}
            type="file"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
          />
        </div>

        <div className="text-right">
          <button
            onClick={handleReset}
            className="bg-blue-500 text-white px-4 mx-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Reset
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
