// Get the video element from the DOM
const video = document.getElementById('video');

// Get the output element where the scan result will be displayed
const output = document.getElementById('output');

// Access the user's camera using getUserMedia API
navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })  // Request access to the back camera (environment mode)
    .then(stream => {
        // If camera access is successful, assign the camera stream to the video element
        video.srcObject = stream;

        // Set the video element to play inline on iOS devices (this is required for iOS devices to display the video properly)
        video.setAttribute('playsinline', true);

        // Start playing the video
        video.play();

        // Start the QR code scanning process by calling the scanQRCode function repeatedly using requestAnimationFrame
        requestAnimationFrame(scanQRCode);
    })
    .catch(err => {
        // If there's an error accessing the camera, log the error and display an error message on the page
        console.error("Error accessing camera: ", err);
        output.textContent = "Error accessing camera.";
    });

// Function to continuously scan the QR code
function scanQRCode() {
    // Check if the video is ready to be processed (i.e., the video has enough data to scan)
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
        // Create a canvas element to draw the current video frame on it
        const canvas = document.createElement('canvas');
        
        // Set the canvas size to match the video dimensions
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Get the canvas 2D context to draw on it
        const context = canvas.getContext('2d');

        // Draw the current video frame onto the canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Get the image data from the canvas (this is a pixel-by-pixel representation of the video frame)
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

        // Use the jsQR library to try and detect a QR code from the image data
        const code = jsQR(imageData.data, canvas.width, canvas.height);

        // If a QR code is detected
        if (code) {
            // Display the data from the scanned QR code in the output element
            output.textContent = `Data: ${code.data}`;

            // Optionally, stop the video stream after a successful scan
            video.srcObject.getTracks().forEach(track => track.stop());
        } else {
            // If no QR code was found, display a message asking the user to try again
            output.textContent = "No QR code found. Please try again.";
        }
    }

    // Continue scanning by requesting the next frame to be processed
    requestAnimationFrame(scanQRCode);
}
