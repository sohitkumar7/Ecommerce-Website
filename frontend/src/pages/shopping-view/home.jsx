import { Button } from "../../components/ui/button";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import {
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightningIcon,
  ShirtIcon,
  UmbrellaIcon,
  WatchIcon,
} from "lucide-react";

import { Card, CardContent } from "../../components/ui/card";
import bannerThree from "../../assets/banner-3.webp";
import { useEffect, useState } from "react";
function Shoppinghome() {
  const slides = [bannerOne,bannerTwo, bannerThree];
  const [currentSlide, setCurrentSlide] = useState(0);

  const categoriesWithIcon = [
    { id: "men", label: "Men", icon: ShirtIcon },
    { id: "women", label: "Women", icon: CloudLightningIcon },
    { id: "kids", label: "Kids", icon: BabyIcon },
    { id: "accessories", label: "Accessories", icon: WatchIcon },
    { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
  ];

  useEffect(() => {
    const timer = setInterval(()=>{
      setCurrentSlide(prevSlide=>(prevSlide+1)% slides.length)
    },2000)

    return () => clearInterval(timer)
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <img
            src={slide}
            key={index}
            className={` ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700`}
          ></img>
        ))}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      <section className="py-1 br-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            {" "}
            Shop by category
          </h2>
          <div className="grid grid-col-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((categoryItem) => (
              <Card className="cursor=pointer hover:shadow-lg transition-shadow">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="w-12 h-12 text-primary" />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Shoppinghome;
