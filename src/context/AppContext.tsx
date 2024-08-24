import localforage from "localforage";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Define types for HomepageData and Feature
export interface Feature {
  title: string;
  subtitle: string;
  image: string | undefined;
  id: string;
}

interface HomepageData {
  features: Feature[];
}

// Define the type for context value
interface AppContextType {
  homepageData: HomepageData;
  setHomepageData: React.Dispatch<React.SetStateAction<HomepageData>>;
}

// Create the context with a default value
const AppContext = createContext<AppContextType | undefined>(undefined);

// Custom hook to use the AppContext
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

// Context provider component
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
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
  const getImage = async (imageString: string | undefined): Promise<string> => {
    if (imageString) {
      const imageBlob = await retrieveImage(imageString);
      if (imageBlob) {
        const imageUrl = URL.createObjectURL(imageBlob);
        return imageUrl;
      }
    }
    return "";
  };

  const getLocalStorageData = async (): Promise<HomepageData> => {
    const localData = localStorage.getItem("homepageData");
    let data: HomepageData = { features: [] };

    if (localData) {
      data = JSON.parse(localData);

      // Map through features asynchronously to get image URLs
      const featuresWithImages = await Promise.all(
        data.features.map(async (item) => {
          const imageUrl = await getImage(item.image);
          return { ...item, image: imageUrl };
        })
      );

      data.features = featuresWithImages;
    }

    return data;
  };

  const [homepageData, setHomepageData] = useState<HomepageData>({
    features: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getLocalStorageData();
      setHomepageData(data);
    };

    fetchData();
  }, []);

  return (
    <AppContext.Provider value={{ homepageData, setHomepageData }}>
      {children}
    </AppContext.Provider>
  );
};
