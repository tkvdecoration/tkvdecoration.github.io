const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 8000;

// Use CORS middleware
app.use(cors());

// Serve static files from the 'assets' directory
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Endpoint to get image filenames
app.get('/api/images', (req, res) => {
    const imagesDir = path.join(__dirname, 'assets/images');

    // List of subdirectories to scan
    const categories = [
        'Pathway decor',
        'Baby shower and naming ceremony',
        'Birthday decor',
        'Mugurtham decor',
        'Name board decor',
        'Reception Decoration'
    ];

    const categoriesflip = {'Pathway decor': 'Pathwaydecor',
        'Baby shower and naming ceremony': 'Babyshowerandnamingceremony',
        'Birthday decor': 'Birthdaydecor',
        'Mugurtham decor': 'Mugurthamdecor',
        'Name board decor': 'Nameboarddecor',
        'Reception Decoration': 'ReceptionDecoration'
    };

    const result = {};

    categories.forEach(category => {
        const categoryDir = path.join(imagesDir, category);
        if (fs.existsSync(categoryDir)) {
            const files = fs.readdirSync(categoryDir).filter(file => /\.(jpg|jpeg|png|gif)$/.test(file));
            result[categoriesflip[category]] = files.map(file => path.join(file));
        }
    });

    res.json(result);



   

});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
