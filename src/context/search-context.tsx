import React, { createContext, useState, useContext, ReactNode } from "react";
import { searchExpression } from "@/api-client";
import toast from "react-hot-toast";

// Define the structure of the search result
interface SearchResult {
  definition: string;
  example: string;
  expression: string;
}

interface SearchContextType {
  results: SearchResult[] | undefined;
  isLoading: boolean;
  search: (query: string) => void;
}

// Create the context with default values
const SearchContext = createContext<SearchContextType | undefined>(undefined);

// Custom hook to use the SearchContext
export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
};

// Create the SearchProvider to wrap the app and provide the state globally
export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [results, setResults] = useState<SearchResult[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const search = async (query: string) => {
    setIsLoading(true);
    const { data, error } = await searchExpression(query);
    setIsLoading(false);

    if (data) {
      setResults(data);
    } else if (error) {
      toast.error(error.details);
    }
  };

  return (
    <SearchContext.Provider value={{ results, isLoading, search }}>
      {children}
    </SearchContext.Provider>
  );
};
