# Amazon E2E Test Automation

This is a test automation suite I built for amazon.com.au using Playwright and Typescript. I primarily created this project to solidify my understanding of end-to-end testing using the Page Object Model, and also challenge myself by testing a real-world, live, E-commerce website with a relatively dynamic user-interface.

## What it does

In brief, this test suite simulates the process of someone using amazon to buy pipe cleaners (an admittedly random choice). It covers the process of the user:
- Signing into an account
- Searching for a product using the search bar
- Filtering the search results
- Selecting an item that is in stock from the search page
- Viewing the selected product's page
- Adding it to cart
- Proceeding to checkout
- Entering a delivery address 

## Features:
- Page Object Model architecture
- Authenticated user flows
- Cross-browser testing (Chrome and Firefox)
- CI/CD using GitHub actions (this wound up being impossible to implement cleanly, see challenges and lessons learnt for more detail)
- HTML reports with accompanying screenshots

## Prerequisites:
- Node.js 18 or above
- npm or yarn (or any other package installer you might prefer)

## Installation:
```bash
npm install
npx playwright install
```

## Running Tests:
```bash
# Run all tests
npm test

# Run a specific test file
npx playwright test search.spec.ts (or another file, e.g. checkout.spec.ts)

# Run in headed mode 
npx playwright test --headed
```

## View Reports
```bash
npx playwright show-report
```

## Project Structure
```
tests/                  # Test Files
pages/                  # Page object Models
playwright.config.ts    # Configuration File  
```

## Challenges and Lessons Learnt:

This project was significantly more difficult to put together than I initially expected. I quite enjoyed trying to figure out how to navigate Amazon's UI as the dynamic listings presented a challenge I hadn't faced before. Creating an automation script to filter for a list item that contained a specific button wasn't something I was used to, and it gave me a good reason to chain selectors in a way I didn't think to before.

One small issue that I ran into early when building out the test suite was that the test that I set up for the address entering section was only usable once. This is because once an address is set in the address screen, there's no option to delete the address and start fresh, the only option is to edit the current one or add a new one. My first thought was to wipe the form data and save a blank address so it could be filled out again, but Amazon actually doesn't allow you to save an empty address. This left me with three options, I could: A: Extend the test so it wipes the pre-existing form data, and replaces it again. B: Keep creating new addresses with the same form data by clicking 'add address', meaning that as the tests run more and more addresses would be added to a growing list (which also isn't realistic user behaviour). Or C: Skip the tests entirely. I went with option C originally, but eventually realised that implementing option A a great choice as it's something a real user would do, and it would allow me include the address tests unskipped.

One of the largest barriers I ran into when pushing this project was attempting to get the tests to work and pass successfully in CI, as there were multiple blockers. 

The first issue I came across was the fact that the GitHub Actions runner is run on a US server, meaning that when it tried to visit amazon.com.au, it would immediately be redirected to the US version of the site, which this test suite is incompatible with due to differences in the UI. To rectify this, I decided to connect the runner to an Australian proxy server through proxyscrape so I could avoid having to bulk out my tests with extra steps to get to the Australian site, although that approach  would've also been valid. 

The next problem I faced was that Amazon has extra checks in place to prevent botting that only seem to trigger when the tests are ran in CI (I couldn't reproduce them locally, at least). The first of these checks is a simple "Continue Shopping" button that appears when you attempt to sign in, which is made to throw off any scripts that don't expect it to show up. I didn't account for this initially, so I quickly whipped a conditional to click the button if it appears, and pushed that up. 

Lo and behold when I had a look at my actions, the tests had failed again, albeit one step later this time. Mildly bewildered, I opened the test report and had a look at the failure screenshot to see a new, unfamiliar screen that was asking for a code from the email I used to sign up. At that point I realised that these bot protections were going to be impossible to get through using only automation, so I just decided to shelve the idea of getting CI to work.
