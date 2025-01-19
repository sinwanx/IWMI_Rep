const fs = require('fs');

// Load the JSON file
const data = JSON.parse(fs.readFileSync('complete_json_with_province_crop_data.json', 'utf-8'));

const section = process.argv[2] || "Reduction in Large Farms";
const metric = process.argv[3] || "Acreage";
const province = process.argv[4] || "Punjab";
const crop = process.argv[5] || "Wheat";
const year = process.argv[6] || "2014";

const value = data["Land Allocation Strategies"][section]["Historical"][metric][province][crop][year];
console.log(`Value: ${value}`);

// Example: Loop through all years for a specific crop
const cropData = data["Land Allocation Strategies"][section]["Historical"][metric][province][crop];
for (const [year, val] of Object.entries(cropData)) {
    console.log(`Year: ${year}, Value: ${val}`);
}

