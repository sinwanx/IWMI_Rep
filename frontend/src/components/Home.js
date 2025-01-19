import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

// Ensure the file paths to the images are correct
import logo1 from '../assets/nexusgainslogo.png';
import logo2 from '../assets/iwmi.png';
import landAllocationImage from '../assets/Land Fields 1.jpg';
import waterAllocationImage from '../assets/Tubewell 2.jpg';
import laborProductivityImage from '../assets/DSC8837.JPG'; // Correct the file path to match the case
import cropStrategiesImage from '../assets/Mustard Field 1.png';
import populationDynamicsImage from '../assets/populationDynamics.jpg';
import hedssImage from '../assets/6card.jpg'; // Ensure the file path to the new image is correct

const modules = [
  { 
    name: 'Land Allocation', 
    route: '/visualization?section=landAllocation', 
    image: landAllocationImage,
    description: 'Land allocation refers to the distribution of available land resources across various uses, such as agriculture, forestry, urban development, or conservation, based on economic, environmental, and policy considerations. In the context of the CGE-W model, it involves optimizing land use across different agriculture crops to maximize economic returns while considering constraints like water availability, crop suitability, and policy interventions (e.g., taxes, subsidies).' 
  },
  { 
    name: 'Water Allocation', 
    route: '/visualization?section=waterAllocation', 
    image: waterAllocationImage,
    description: 'Water allocation is the process of distributing water resources among competing uses, such as agricultural irrigation, industrial production, domestic consumption, and environmental conservation. In the CGE-W model, water allocation strategies aim to allocate available water across different users considering factors like crop water requirements, pricing mechanisms, and regional water availability.' 
  },
  { 
    name: 'Resource Efficiency', 
    route: '/visualization?section=resourceEfficiency', 
    image: laborProductivityImage,
    description: 'Resource efficiency policies aim to maximize the economic output per unit of resource used (e.g., land, water, labor, energy). These policies often involve promoting technologies and practices that enhance the efficiency and productivity of natural resources, such as improved irrigation methods, reduced fertilizer runoff, or conservation agriculture.' 
  },
  { 
    name: 'Crop Strategies', 
    route: '/visualization?section=cropStrategies', 
    image: cropStrategiesImage,
    description: 'Crop-specific strategies refer to tailored policies and interventions designed to influence the production and allocation of specific crops. These strategies consider the unique economic, environmental, and resource characteristics of each crop. In the CGE-W model, these strategies help assess the impacts of interventions such as subsidies, taxes, or technological improvements targeted at individual crops.' 
  },
  { 
    name: 'Macro Policies', 
    route: '/visualization?section=macroPolicies', 
    image: populationDynamicsImage,
    description: 'Macro policies encompass broad, economy-wide strategies and regulations that aim to achieve national-level objectives such as economic growth, trade balance, employment, and fiscal stability. In the CGE-W model, macro policies that addresses the pricing mechanism, trade policies to evaluate their systemic impacts.' 
  },
  { 
    name: 'Hydro-Economic Decision Support System (HEDSS)', 
    route: '/visualization?section=hedss', 
    image: hedssImage, // Use the new image
    description: 'A Hydro-Economic Decision Support System (HEDSS) will play a crucial role in addressing future challenges in water resource management by integrating hydrological, economic, and social data to support informed decision-making. It will optimize the allocation of limited water resources across sectors such as agriculture, industry, domestic use, and environmental conservation, ensuring equitable and sustainable usage. By modeling the impacts of climate change, it will enable proactive planning for droughts, floods, and shifting rainfall patterns, helping communities adapt to new realities. The system will support policymakers by simulating the outcomes of various strategies, such as water pricing or infrastructure investments, fostering economic sustainability while protecting ecosystems. It will also aid in resolving conflicts among competing users or regions by providing transparent, data-driven insights. Furthermore, HEDSS will enhance crisis preparedness by predicting risks and evaluating emergency response strategies, ensuring resilience in the face of water-related challenges. Through stakeholder engagement and clear communication of complex scenarios, this system will promote collaboration and innovation, paving the way for a future where water resources are managed efficiently and sustainably.'
  },
];

function Home() {
  const navigate = useNavigate();
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleDescription = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="home">
      <div className="modules-grid">
        {modules.map((module, index) => (
          <div
            key={index}
            className="module-thumbnail"
            onClick={() => navigate(module.route)}
          >
            <img src={module.image} alt={`${module.name} Thumbnail`} />
            <h3>{module.name}</h3>
            <p>
              {expandedIndex === index ? module.description : `${module.description.substring(0, 100)}...`}
              <span 
                className="see-more" 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDescription(index);
                }}
              >
                {expandedIndex === index ? ' See Less' : ' See More'}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
