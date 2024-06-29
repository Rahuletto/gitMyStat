import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
  } from "react";
   
  
  export const DeviceContext = createContext<{
      mode: "desktop" | "mobile" | "tablet"
  }>({ mode: "desktop" });
  
  
  export function useDevice() {
    const { mode } = useContext(DeviceContext);
    return mode;
  }
  export const DeviceProvider = ({ children }: { children: ReactNode }) => {
    const [mode, setMode] = useState<"desktop" | "mobile" | "tablet">("desktop");
  
    useEffect(() => {
      setMode(device());
      
      setInterval(() => {
        setMode(device());
      }, 2000);
  
      function device() {
        const screenWidth = document.body.clientWidth;
  
        const userAgent = navigator.userAgent.toLowerCase();
        const isMobile =
          /iphone|ipod|android|windows phone/g.test(userAgent);
        const isTablet =
          /(ipad|tablet|playbook|silk)|(android(?!.*mobile))/g.test(userAgent);
  
        if (screenWidth < 768 || isMobile) {
          return "mobile";
        } else if ((screenWidth >= 768 && screenWidth <= 1024) || isTablet) {
          return "tablet";
        } else {
          return "desktop";
        }
      }
      const handleResize = () => {
        const newDeviceType = device();
        if (mode != newDeviceType) setMode(newDeviceType);
      };
  
      window.addEventListener("resize", handleResize);
      return () => {
          window.removeEventListener("resize", handleResize);
      };
    }, [mode]);
  
    return (
      <DeviceContext.Provider value={{ mode }}>
        {children}
      </DeviceContext.Provider>
    );
  };