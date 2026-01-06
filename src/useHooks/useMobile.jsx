// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function useIsMobile() {
//   const [isMobile, setIsMobile] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const sizeMobile = () => {
//       setIsMobile(window.innerWidth <= 360 && window.innerHeight <= 768);
//     };
//     sizeMobile();
//     window.addEventListener("resize", sizeMobile);
//     return () => window.removeEventListener("resize", sizeMobile);
//   }, []);

//   const handleSelectChange = (e) => {
//     const path = e.target.value;
//     navigate(path);
//   };

//   // Повертаємо значення і функцію
//   return { isMobile, handleSelectChange };
// }
