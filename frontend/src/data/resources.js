import { Shield, Sun, Globe, Pill } from "lucide-react";

export const resources = [
  {
    title: "Cancer Council Australia",
    description:
      "Official Australian guidance on UV, skin cancer prevention, and sunscreen recommendations.",
    icon: Shield,
    accent: "from-rose-500 to-orange-400",
    link: "https://www.cancer.org.au/cancer-information/causes-and-prevention/sun-safety",
  },
  {
    title: "Australian Bureau of Meteorology",
    description:
      "Check UV forecasts, weather conditions, and environmental alerts across Australia.",
    icon: Sun,
    accent: "from-sky-500 to-cyan-400",
    link: "https://www.bom.gov.au/uv/",
  },
  {
    title: "World Health Organization",
    description:
      "Global public health information on UV exposure, skin health, and prevention.",
    icon: Globe,
    accent: "from-blue-600 to-indigo-500",
    link: "https://www.who.int/news-room/questions-and-answers/item/radiation-ultraviolet-(uv)",
  },
  {
    title: "SunSmart",
    description:
      "Practical sun safety advice for daily protection and behaviour change among young people.",
    icon: Pill,
    accent: "from-amber-500 to-yellow-400",
    link: "https://www.sunsmart.com.au/",
  },
];