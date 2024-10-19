document.getElementById('hvac-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form from submitting

    // Get form values
    let length = parseFloat(document.getElementById('length').value);
    let width = parseFloat(document.getElementById('width').value);
    let height = parseFloat(document.getElementById('height').value);
    let windows = parseInt(document.getElementById('windows').value);
    let doors = parseInt(document.getElementById('doors').value);
    let insulation = document.getElementById('insulation').value;
    let people = parseInt(document.getElementById('people').value);

    // Check for valid inputs
    if (isNaN(length) || isNaN(width) || isNaN(height) || isNaN(windows) || isNaN(doors) || isNaN(people)) {
        document.getElementById('error').textContent = "Please fill out all fields correctly.";
        return;
    }

    // Constants
    const BTU_PER_SQFT = 20;
    const BTU_PER_PERSON = 500;
    const BTU_PER_WINDOW = 1000;
    const BTU_PER_DOOR = 700;

    // Base BTU Calculation
    let room_area = length * width;
    let btu_base = room_area * BTU_PER_SQFT;

    // Insulation Factor
    let insulation_factor = 1.0; // Default for "Good"
    if (insulation === 'Poor') {
        insulation_factor = 1.3;
    } else if (insulation === 'Average') {
        insulation_factor = 1.1;
    }

    // Additional BTUs
    let btu_windows = windows * BTU_PER_WINDOW;
    let btu_doors = doors * BTU_PER_DOOR;
    let btu_people = people * BTU_PER_PERSON;

    // Final BTU Calculation
    let total_btu = (btu_base + btu_windows + btu_doors + btu_people) * insulation_factor;

    // Display Result
    document.getElementById('result').textContent = `The estimated HVAC load for this room is: ${total_btu.toFixed(2)} BTUs.`;
    document.getElementById('error').textContent = ''; // Clear error message
});