import { Cloud, CloudRain, Sun, Snowflake, Wind } from "lucide-react";
import { motion } from "framer-motion";

type WeatherCondition = "Sunny" | "Cloudy" | "Rainy" | "Snowy";

interface WeatherIconProps {
  condition: WeatherCondition;
  className?: string;
}

export function WeatherIcon({ condition, className = "w-12 h-12" }: WeatherIconProps) {
  const iconProps = {
    className: className,
    strokeWidth: 1.5,
  };

  switch (condition) {
    case "Sunny":
      return (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        >
          <Sun {...iconProps} className={`${className} text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]`} />
        </motion.div>
      );
    case "Cloudy":
      return (
        <motion.div
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Cloud {...iconProps} className={`${className} text-gray-300 drop-shadow-[0_0_10px_rgba(209,213,219,0.3)]`} />
        </motion.div>
      );
    case "Rainy":
      return (
        <motion.div
          animate={{ y: [0, 3, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <CloudRain {...iconProps} className={`${className} text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.4)]`} />
        </motion.div>
      );
    case "Snowy":
      return (
        <motion.div
          animate={{ rotate: [-10, 10, -10] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Snowflake {...iconProps} className={`${className} text-cyan-200 drop-shadow-[0_0_10px_rgba(165,243,252,0.5)]`} />
        </motion.div>
      );
    default:
      return <Sun {...iconProps} />;
  }
}
