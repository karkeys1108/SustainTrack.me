function openTab(evt, tabName) {
    var i, tabcontent, tabbuttons;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active");
    }
    tabbuttons = document.getElementsByClassName("tab-button");
    for (i = 0; i < tabbuttons.length; i++) {
        tabbuttons[i].classList.remove("active");
    }
    document.getElementById(tabName).style.display = "block";
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}

function calculateGeneralFootprint() {
    // Collect input values
    const householdSize = parseFloat(document.getElementById('householdSize').value) || 1;
    const electricityUsage = parseFloat(document.getElementById('electricityUsage').value) || 0;
    const waterUsage = parseFloat(document.getElementById('waterUsage').value) || 0;
    const wasteProduction = parseFloat(document.getElementById('wasteProduction').value) || 0;
    const dietType = document.getElementById('dietType').value;
    const transportationMode = document.getElementById('transportationMode').value;
    const transportationDistance = parseFloat(document.getElementById('transportationDistance').value) || 0;
    const miscellaneousActivities = parseFloat(document.getElementById('miscellaneousActivities').value) || 0;

    // Define emission factors (dummy values for illustration)
    const electricityEmissionFactor = 0.5; // kg CO2 per kWh
    const waterEmissionFactor = 0.2; // kg CO2 per liter
    const wasteEmissionFactor = 0.1; // kg CO2 per kg
    let dietEmissionFactor = 0;
    switch (dietType) {
        case 'omnivore':
            dietEmissionFactor = 2; // kg CO2 per person per day
            break;
        case 'vegetarian':
            dietEmissionFactor = 1.5; // kg CO2 per person per day
            break;
        case 'vegan':
            dietEmissionFactor = 1; // kg CO2 per person per day
            break;
    }
    const transportationEmissionFactor = (transportationMode === 'car') ? (0.2 * transportationDistance) : 0.1; // kg CO2 per km
    const miscellaneousEmissionFactor = miscellaneousActivities / 30; // Assuming input is in kg CO2 per month

    // Calculate total emissions for the day
    const totalEmissions = (
        (electricityUsage * electricityEmissionFactor) +
        (waterUsage * waterEmissionFactor) +
        (wasteProduction * wasteEmissionFactor) +
        (dietEmissionFactor * householdSize) +
        (transportationEmissionFactor * transportationDistance) +
        miscellaneousEmissionFactor
    ) * householdSize;

    // Update result display
    document.getElementById('totalGeneralEmissions').innerText = totalEmissions.toFixed(2);
}

function calculateHouseFootprint() {
    // Collect input values
    const houseSize = parseFloat(document.getElementById('houseSize').value) || 0;
    const occupants = parseFloat(document.getElementById('occupants').value) || 1;
    const energyRating = document.getElementById('energyRating').value;
    const heatingType = document.getElementById('heatingType').value;
    const heatingCost = parseFloat(document.getElementById('heatingCost').value) || 0;
    const electricityUsage = parseFloat(document.getElementById('electricityUsage').value) || 0;
    const waterUsage = parseFloat(document.getElementById('waterUsage').value) || 0;
    const wasteProduction = parseFloat(document.getElementById('wasteProduction').value) || 0;

    // Define emission factors
    const energyEfficiencyFactor = calculateEnergyEfficiencyFactor(energyRating);
    const heatingEmissionFactor = calculateHeatingEmissionFactor(heatingType);
    const electricityEmissionFactor = 0.5; // kg CO2 per kWh (dummy value)
    const waterEmissionFactor = 0.2; // kg CO2 per liter (dummy value)
    const wasteEmissionFactor = 0.1; // kg CO2 per kg (dummy value)

    // Calculate total emissions per day
    const totalEmissions = (
        (houseSize * energyEfficiencyFactor * occupants) +
        (heatingCost * heatingEmissionFactor * 30 / 12 * occupants) +
        (electricityUsage * electricityEmissionFactor) +
        (waterUsage * waterEmissionFactor * 30 * occupants) +
        (wasteProduction * wasteEmissionFactor * 7 * occupants)
    );

    // Update result display
    document.getElementById('totalHouseEmissions').innerText = totalEmissions.toFixed(2);
}

// Helper function to calculate energy efficiency factor based on rating
function calculateEnergyEfficiencyFactor(rating) {
    switch (rating) {
        case 'A':
            return 0.1; // kg CO2 per m2
        case 'B':
            return 0.2; // kg CO2 per m2
        case 'C':
            return 0.3; // kg CO2 per m2
        case 'D':
            return 0.4; // kg CO2 per m2
        case 'E':
            return 0.5; // kg CO2 per m2
        case 'F':
            return 0.6; // kg CO2 per m2
        case 'G':
            return 0.7; // kg CO2 per m2
        default:
            return 0;
    }
}

// Helper function to calculate heating emission factor based on type
function calculateHeatingEmissionFactor(type) {
    switch (type) {
        case 'electric':
            return 0.4; // kg CO2 per $ (dummy value)
        case 'gas':
            return 0.3; // kg CO2 per $ (dummy value)
        case 'oil':
            return 0.5; // kg CO2 per $ (dummy value)
        case 'wood':
            return 0.2; // kg CO2 per $ (dummy value)
        case 'other':
            return 0.3; // kg CO2 per $ (dummy value)
        default:
            return 0;
    }
}

function calculateCarFootprint() {
    // Collect input values
    const carType = document.getElementById('carType').value;
    const fuelType = document.getElementById('fuelType').value;
    const fuelConsumption = parseFloat(document.getElementById('fuelConsumption').value) || 0;
    const distanceTraveled = parseFloat(document.getElementById('distanceTraveled').value) || 0;
    const selectedCountry = document.getElementById('country').value;
    const selectedState = document.getElementById('state').value;

    // Define emission factors based on the selected country and state
    let emissionFactors;
    switch (selectedCountry) {
        case 'India':
            emissionFactors = {
                small: { petrol: 2.3, diesel: 2.8, hybrid: 1.5, electric: 0.2 },
                medium: { petrol: 3.0, diesel: 3.5, hybrid: 2.0, electric: 0.3 },
                large: { petrol: 4.0, diesel: 4.5, hybrid: 2.5, electric: 0.4 }
            };
            break;
        // Add other countries and their emission factors here as needed
        default:
            // Default emission factors
            emissionFactors = {
                small: { petrol: 2.3, diesel: 2.8, hybrid: 1.5, electric: 0.2 },
                medium: { petrol: 3.0, diesel: 3.5, hybrid: 2.0, electric: 0.3 },
                large: { petrol: 4.0, diesel: 4.5, hybrid: 2.5, electric: 0.4 }
            };
    }

    // Calculate total emissions per day
    const totalEmissions = (fuelConsumption / 100 * distanceTraveled * emissionFactors[carType][fuelType]);

    // Update result display
    document.getElementById('totalCarEmissions').innerText = totalEmissions.toFixed(2);
}

function calculateMotorbikeFootprint() {
    // Collect input values
    const motorbikeType = document.getElementById('motorbikeType').value;
    const fuelType = document.getElementById('motorbikeFuelType').value;
    const fuelConsumption = parseFloat(document.getElementById('motorbikeFuelConsumption').value) || 0;
    const distanceTraveled = parseFloat(document.getElementById('motorbikeDistanceTraveled').value) || 0;

    // Define emission factors (dummy values)
    const emissionFactors = {
        scooter: { petrol: 2.0, diesel: 2.5, electric: 0.1 },
        cruiser: { petrol: 2.5, diesel: 3.0, electric: 0.2 },
        sports: { petrol: 3.0, diesel: 3.5, electric: 0.3 }
    };

    // Calculate total emissions per day
    const totalEmissions = (fuelConsumption / 100 * distanceTraveled * emissionFactors[motorbikeType][fuelType]);

    // Update result display
    document.getElementById('totalMotorbikeEmissions').innerText = totalEmissions.toFixed(2);
}

function calculateBusRailFootprint() {
    // Collect input values
    const transportType = document.getElementById('transportType').value;
    const distanceTraveled = parseFloat(document.getElementById('busRailDistanceTraveled').value) || 0;

    // Define emission factors (dummy values)
    const emissionFactors = {
        bus: 0.15,  // kg CO2 per km
        rail: 0.1   // kg CO2 per km
    };

    // Calculate total emissions per day
    const totalEmissions = distanceTraveled * emissionFactors[transportType];

    // Update result display
    document.getElementById('totalBusRailEmissions').innerText = totalEmissions.toFixed(2);
}

function calculateSecondaryFootprint() {
    // Collect input value
    const secondaryInput = parseFloat(document.getElementById('secondaryInput').value) || 0;

    // Update result display (assuming input value is already in kg CO2 per month)
    const totalEmissionsPerDay = secondaryInput / 30; // Convert monthly emissions to daily emissions
    document.getElementById('totalSecondaryEmissions').innerText = totalEmissionsPerDay.toFixed(2);
}

function calculateFlightsFootprint() {
    // Collect input value
    const flightsInput = parseFloat(document.getElementById('flightsInput').value) || 0;

    // Update result display
    document.getElementById('totalFlightsEmissions').innerText = flightsInput.toFixed(2);
}

function calculateTravelFootprint() {
    // Collect input value
    const travelInput = parseFloat(document.getElementById('travelInput').value) || 0;

    // Update result display
    document.getElementById('totalTravelEmissions').innerText = travelInput.toFixed(2);
}
