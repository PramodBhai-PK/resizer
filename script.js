function resizeImage() {
    const imageInput = document.getElementById('imageInput');
    const width = parseFloat(document.getElementById('width').value);
    const height = parseFloat(document.getElementById('height').value);
    const unit = document.getElementById('unit').value;
    
    if (!imageInput.files[0]) {
        alert('Please select an image.');
        return;
    }

    const reader = new FileReader();
    
    reader.onload = function (event) {
        const img = new Image();
        
        img.onload = function () {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            let scaleFactor = 1;
            if (unit === 'cm') {
                scaleFactor = 37.7953; // cm to pixels
            } else if (unit === 'in') {
                scaleFactor = 96; // inches to pixels
            }
            
            canvas.width = width * scaleFactor;
            canvas.height = height * scaleFactor;

            // Enable image smoothing
            context.imageSmoothingEnabled = true;
            context.imageSmoothingQuality = 'high';

            context.drawImage(img, 0, 0, canvas.width, canvas.height);
            
            const resizedImageURL = canvas.toDataURL('image/png', 1.0); // 1.0 is the highest quality
            document.getElementById('resizedImage').src = resizedImageURL;
            document.getElementById('downloadLink').href = resizedImageURL;
        }
        
        img.src = event.target.result;
    }
    
    reader.readAsDataURL(imageInput.files[0]);
}
