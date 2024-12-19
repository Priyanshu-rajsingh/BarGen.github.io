// Add an event listener to the "Generate" button
document.getElementById('generateButton').addEventListener('click', function() {
    // Get the input data and selected barcode type
    const data = document.getElementById('dataInput').value; // Get the text input from the user
    const barcodeType = document.getElementById('barcodeType').value; // Get the selected barcode type from the dropdown
    const barcodeOutput = document.getElementById('barcodeOutput'); // Get the div where the barcode will be displayed

    // Clear any previous barcode output
    barcodeOutput.innerHTML = '';

    // Validate if data is provided
    if (!data) {
        alert('Please enter some data.'); // Alert the user if no data is entered
        return;
    }

    // Variable to store the URL of the barcode image
    let barcodeUrl = '';

    // Check the selected barcode type and generate the barcode URL accordingly
    switch (barcodeType) {
        case 'UPC': // UPC barcode: requires 12-digit numeric input
            if (!/^\d{12}$/.test(data)) { // Validate input as 12-digit numeric
                alert('UPC requires a 12-digit numeric input.');
                return;
            }
            barcodeUrl = `https://barcode.tec-it.com/barcode.ashx?data=${encodeURIComponent(data)}&code=UPCA`;
            break;

        case 'EAN': // EAN barcode: requires 8 or 13-digit numeric input
            if (!/^\d{13}$/.test(data) && !/^\d{8}$/.test(data)) { // Validate input as 8 or 13-digit numeric
                alert('EAN requires an 8-digit or 13-digit numeric input.');
                return;
            }
            barcodeUrl = `https://barcode.tec-it.com/barcode.ashx?data=${encodeURIComponent(data)}&code=EAN13`;
            break;

        case 'Code 128': // Code 128 barcode: allows alphanumeric input
            if (typeof data !== 'string' || !data.trim()) { // Ensure non-empty input
                alert('Code 128 requires a non-empty alphanumeric input.');
                return;
            }
            barcodeUrl = `https://barcode.tec-it.com/barcode.ashx?data=${encodeURIComponent(data)}&code=Code128`;
            break;

        case 'Code 39': // Code 39 barcode: allows uppercase letters, numbers, and some symbols
            if (!/^[A-Z0-9\-.$/+% ]+$/.test(data)) { // Validate allowed characters
                alert('Code 39 allows uppercase alphanumeric characters and the symbols - . $ / + % space.');
                return;
            }
            barcodeUrl = `https://barcode.tec-it.com/barcode.ashx?data=${encodeURIComponent(data)}&code=Code39`;
            break;

        case 'QR Code': // QR Code: supports any input
            if (typeof data !== 'string' || !data.trim()) { // Ensure non-empty input
                alert('QR Code requires a non-empty input.');
                return;
            }
            barcodeUrl = `https://barcode.tec-it.com/barcode.ashx?data=${encodeURIComponent(data)}&code=QRCode`;
            break;

        case 'Data Matrix': // Data Matrix barcode: supports any input
            if (typeof data !== 'string' || !data.trim()) { // Ensure non-empty input
                alert('Data Matrix requires a non-empty input.');
                return;
            }
            barcodeUrl = `https://barcode.tec-it.com/barcode.ashx?data=${encodeURIComponent(data)}&code=DataMatrix`;
            break;

        case 'PDF417': // PDF417 barcode: supports any input
            if (typeof data !== 'string' || !data.trim()) { // Ensure non-empty input
                alert('PDF417 requires a non-empty input.');
                return;
            }
            barcodeUrl = `https://barcode.tec-it.com/barcode.ashx?data=${encodeURIComponent(data)}&code=PDF417`;
            break;

        case 'Aztec Code': // Aztec Code: supports any input
            if (typeof data !== 'string' || !data.trim()) { // Ensure non-empty input
                alert('Aztec Code requires a non-empty input.');
                return;
            }
            barcodeUrl = `https://barcode.tec-it.com/barcode.ashx?data=${encodeURIComponent(data)}&code=Aztec`;
            break;

        case 'MaxiCode': // MaxiCode: supports alphanumeric input
            if (typeof data !== 'string' || !data.trim()) { // Ensure non-empty input
                alert('MaxiCode requires a non-empty input.');
                return;
            }
            barcodeUrl = `https://barcode.tec-it.com/barcode.ashx?data=${encodeURIComponent(data)}&code=MaxiCode`;
            break;

        case 'Code 93': // Code 93 barcode: allows uppercase letters, numbers, and some symbols
            if (!/^[A-Z0-9\-.$/+%]+$/.test(data)) { // Validate allowed characters
                alert('Code 93 allows uppercase alphanumeric characters and the symbols - . $ / + %.');
                return;
            }
            barcodeUrl = `https://barcode.tec-it.com/barcode.ashx?data=${encodeURIComponent(data)}&code=Code93`;
            break;

        case 'Code 11': // Code 11 barcode: numeric-only input
            if (!/^\d+$/.test(data)) { // Validate numeric input only
                alert('Code 11 requires numeric input only.');
                return;
            }
            barcodeUrl = `https://barcode.tec-it.com/barcode.ashx?data=${encodeURIComponent(data)}&code=Code11`;
            break;

        default: // Handle invalid or unselected barcode type
            alert('Invalid barcode type selected.');
            return;
    }

    // Create an image element to display the barcode
    const img = document.createElement('img'); // Create an <img> element
    img.src = barcodeUrl; // Set the image source to the generated barcode URL
    img.alt = `${barcodeType} Barcode`; // Add alternative text for the image
    img.classList.add('mt-4', 'hover-animate'); // Add margin and hover effect classes

    // Append the image to the output container
    barcodeOutput.appendChild(img);
});
