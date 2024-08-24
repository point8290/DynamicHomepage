import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";

const Homepage: React.FC = () => {
  const { homepageData } = useAppContext();

  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((i) => (i + 1) % homepageData.features.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [homepageData]);

  return (
    <div className="overflow-hidden bg-[#0003]">
      <div className="h-[100%]">
        {homepageData &&
          homepageData.features &&
          homepageData.features.map((item, index) => {
            return (
              <div hidden={activeFeature != index} key={item.id}>
                <div className="flex flex-col overflow-x-hidden h-[100dvh] mt-0 overflow-y-scroll scroll-smooth select-none relative z-10 w-[100%]">
                  <img
                    className="object-cover h-[100%] w-[100%] animate-fadeIn"
                    src={item.image}
                  />
                  <div className="flex absolute items-start bg-[#0003] h-[100%] justify-start left-0 top-0 w-[100%] z-30">
                    <div className="flex absolute flex-col items-center gap-[15px] justify-center left-[4.5%] px-[20px] py-0 m-0 top-[15%] w-[90%] z-30 rounded-[50px]">
                      <h3 className="animate-slideIn text-white text-center transition bottom-text  ">
                        {item.title}
                      </h3>
                      <h5 className="animate-slideIn text-white text-center transition">
                        {item.subtitle}
                      </h5>
                    </div>
                    <div className="section_dots">
                      {homepageData.features.map((_, index) => {
                        return (
                          <svg
                            key={index}
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 24 24"
                            className={
                              activeFeature == index
                                ? "dotactive"
                                : "dotnotactive"
                            }
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"></path>
                          </svg>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Homepage;
