// require('dotenv').config();
// const puppeteer = require('puppeteer');
// const axios = require('axios');

// async function runPuppeteer() {
//     let browser;
//     try {
//         console.log('Launching Puppeteer...');
//         browser = await puppeteer.launch({
//             headless: true, // Change to true for headless mode
//             args: ['--no-sandbox', '--disable-setuid-sandbox', '--start-maximized'], // Maximize window
//         });

//         const page = await browser.newPage();

//         // Set viewport size
//         await page.setViewport({ width: 1280, height: 1024 });

//         // Navigate to X (Twitter) login page
//         console.log('Navigating to X (Twitter) login page...');
//         await page.goto('https://x.com/i/flow/login', { timeout: 600000 });

//         // Enter username or email
//         console.log('Entering username...');
//         await page.waitForSelector('input[autocomplete="username"]');
//         await page.type('input[autocomplete="username"]', process.env.TWITTER_EMAIL, { delay: 100 });
//         await page.keyboard.press('Enter');

//         // Wait for the username check and enter the user ID
//         console.log('Entering user ID...');
//         await page.waitForSelector('input[autocomplete="on"]');
//         await page.type('input[autocomplete="on"]', process.env.TWITTER_USER_ID, { delay: 100 });
//         await page.keyboard.press('Enter');

//         // Wait for password field and enter the password
//         console.log('Waiting for password field...');
//         await page.waitForSelector('input[autocomplete="current-password"]', { timeout: 600000 });
//         console.log('Entering password...');
//         await page.type('input[autocomplete="current-password"]', process.env.TWITTER_PASSWORD, { delay: 100 });
//         await page.keyboard.press('Enter');

//         // Wait for login to complete
//         console.log('Waiting for login to complete...');
//         await page.waitForNavigation({ timeout: 60000 });

//         console.log('Logged in successfully!');

//         // Navigate to trending page
//         console.log('Navigating to trending page...');
//         await page.goto('https://x.com/explore', { waitUntil: 'networkidle2' });

//         // Wait for trending topics to load
//         console.log('Waiting for trending topics...');
//         await page.waitForSelector('div[role="link"][data-testid="trend"]', { timeout: 60000 });

//         // Fetch top 5 trending topics
//         console.log('Fetching top 5 trending topics...');
//         const trends = await page.$$eval('div[role="link"][data-testid="trend"]', (elements) =>
//             elements.slice(0, 5).map((el) => {
//                 // Extract and clean the topic
//                 let topic = el.querySelector('div[style*="text-overflow: unset; color: rgb(113, 118, 123);"] span')?.textContent.trim();
//                 if (topic) {
//                     topic = topic.replace('· Trending', '').trim(); // Remove "Trending" if present
//                 }

//                 // Extract the trend name
//                 const trendName = el.querySelector('div[style*="text-overflow: unset; color: rgb(231, 233, 234);"] span')?.textContent.trim();

                

//                 return trendName ? { topic, trendName } : null;
//             }).filter((trend) => trend !== null)
//         );

//         console.log(trends);



//         console.log('Trends fetched:', trends);

//         // Fetch IP address
//         console.log('Getting IP address...');
//         const ipResponse = await axios.get('https://api64.ipify.org?format=json');
//         const ipAddress = ipResponse.data.ip;
//         console.log('IP Address:', ipAddress);

//         console.log('Script completed successfully.');
//         return {
//             trends,
//             ipAddress,
//             timestamp: new Date(),
//         };
//     } catch (error) {
//         console.error('Error during Puppeteer execution:', error);
//     } finally {
//         if (browser) {
//             console.log('Closing Puppeteer browser...');
//             await browser.close();
//         }
//     }
// }

// // Run the script directly if executed as standalone
// if (require.main === module) {
//     (async () => {
//         const result = await runPuppeteer();
//         console.log('Result:', result);
//     })();
// }

// module.exports = runPuppeteer;

require('dotenv').config();
const puppeteer = require('puppeteer-core');
const chromium = require('chrome-aws-lambda');
const axios = require('axios');

async function runPuppeteer() {
    let browser;
    try {
        console.log('Launching Puppeteer...');
        browser = await puppeteer.launch({
            headless: true,
            executablePath: await chromium.executablePath,
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
        });

        const page = await browser.newPage();

        // Set viewport size
        await page.setViewport({ width: 1280, height: 1024 });

        // Navigate to X (Twitter) login page
        console.log('Navigating to X (Twitter) login page...');
        await page.goto('https://x.com/i/flow/login', { timeout: 60000 });

        // Enter username or email
        console.log('Entering username...');
        await page.waitForSelector('input[autocomplete="username"]');
        await page.type('input[autocomplete="username"]', process.env.TWITTER_EMAIL, { delay: 100 });
        await page.keyboard.press('Enter');

        // Wait for the username check and enter the user ID
        console.log('Entering user ID...');
        await page.waitForSelector('input[autocomplete="on"]');
        await page.type('input[autocomplete="on"]', process.env.TWITTER_USER_ID, { delay: 100 });
        await page.keyboard.press('Enter');

        // Wait for password field and enter the password
        console.log('Waiting for password field...');
        await page.waitForSelector('input[autocomplete="current-password"]', { timeout: 60000 });
        console.log('Entering password...');
        await page.type('input[autocomplete="current-password"]', process.env.TWITTER_PASSWORD, { delay: 100 });
        await page.keyboard.press('Enter');

        // Wait for login to complete
        console.log('Waiting for login to complete...');
        await page.waitForNavigation({ timeout: 60000 });

        console.log('Logged in successfully!');

        // Navigate to trending page
        console.log('Navigating to trending page...');
        await page.goto('https://x.com/explore', { waitUntil: 'networkidle2' });

        // Wait for trending topics to load
        console.log('Waiting for trending topics...');
        await page.waitForSelector('div[role="link"][data-testid="trend"]', { timeout: 60000 });

        // Fetch top 5 trending topics
        console.log('Fetching top 5 trending topics...');
        const trends = await page.$$eval('div[role="link"][data-testid="trend"]', (elements) =>
            elements.slice(0, 5).map((el) => {
                let topic = el.querySelector('div[style*="text-overflow: unset; color: rgb(113, 118, 123);"] span')?.textContent.trim();
                if (topic) {
                    topic = topic.replace('· Trending', '').trim();
                }
                const trendName = el.querySelector('div[style*="text-overflow: unset; color: rgb(231, 233, 234);"] span')?.textContent.trim();
                return trendName ? { topic, trendName } : null;
            }).filter((trend) => trend !== null)
        );

        console.log('Trends fetched:', trends);

        // Fetch IP address
        console.log('Getting IP address...');
        const ipResponse = await axios.get('https://api64.ipify.org?format=json');
        const ipAddress = ipResponse.data.ip;
        console.log('IP Address:', ipAddress);

        console.log('Script completed successfully.');
        return {
            trends,
            ipAddress,
            timestamp: new Date(),
        };
    } catch (error) {
        console.error('Error during Puppeteer execution:', error);
        throw new Error('Puppeteer script failed.');
    } finally {
        if (browser) {
            console.log('Closing Puppeteer browser...');
            await browser.close();
        }
    }
}

// Export for Vercel serverless function
module.exports = async (req, res) => {
    try {
        const result = await runPuppeteer();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
