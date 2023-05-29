
import React ,{ useState } from "react";
import "./Toggle.css";
  
// const ToggleSwitch = ({ label }) => {
//   return (
//     <div className="container">
//       {label}{" "}
//       <div className="toggle-switch">
//         <input type="checkbox" className="checkbox" 
//                name={label} id={label} />
//         <label className="label" htmlFor={label}>
//           <span className="inner" />
//           <span className="switch" />
//         </label>
//       </div>
//     </div>
//   );
// };

const ToggleSwitch = ({ label, isChecked, onToggle }) => {
  const [checked, setChecked] = useState(isChecked);

  const handleClick = () => {
    const newState = !checked;
    setChecked(newState);
    onToggle(newState);
  };
  

  return (
    <div>
<div id='saleText'>{label}</div>
      <div className="toggle-switch" onClick={handleClick}>
        <input
          type="checkbox"
          className="checkbox"
          checked={checked}
          onChange={() => {}}
        />
        <label className="label">
          <span className="inner" />
          <span className="switch" />
        </label>
      </div>
    </div>
  );
};


  
export default ToggleSwitch;