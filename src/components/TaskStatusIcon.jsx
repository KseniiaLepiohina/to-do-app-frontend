import { Icon } from "@iconify/react";

export default function TaskStatusIcon({ completed }) {
  console.log("Status",completed);
 return (
    <Icon 
      icon={completed ? "material-symbols:check-box" : "material-symbols:check-box-outline-blank"} 
      color="#EDB046" 
      height={28} 
      width={28} 
    />
  );
}
