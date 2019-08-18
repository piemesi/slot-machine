# The Slot Machine

The behaviour will be as follows:

The machine has 3 wheels. Each wheel has 4 symbols (strawberry, banana, orange and a monkey). Do not overdo the design. In our case, the machine can show only one symbol per wheel.

The machine starts with the symbols in some random position The machine has a start button. When the user presses it, then the wheels spin (a symbol every, 50ms) If the user doesn’t press start, then the machine does it automatically after 5 seconds If the user doesn’t press stop, the machine stops automatically after 10 seconds (after starting) The machine has a stop button. When the user presses it, then the wheels stop. If all the wheels show the two or more symbols of the same type, then we have a prize!!!. Two identical non-consecutive symbols, the prize is 10 dollars, Two consecutive symbols, then the prize is 20 dollars. The same symbol in all the wheels, the prize is 100 dollars

### Technologies And Methodologies:
* React, React Hooks (16.9), React-Router
* Store: React-Redux, Redux-Saga (estimate the result and a spin is finished), Reselect (pick the data from redux when it is changes, contains the logic of win calculation)
* Styles: SCSS-modules, b_: [BEM-methodology](https://en.bem.info/methodology/quick-start/) 
* Webpack 4.x (compilation of a bundle, code splitting, lazy loading of relevant chunks)
* Code checking: Typescript for none js functions - such as redux store, reducers, actions and so on), Prop-types lib (for checking props of JSX components), Eslint, Prettier
* Testing: Jest.

### Start The Slot Machine Locally:
* `git clone https://github.com/piemesi/slot-machine.git`
* `npm install` or `yarn install`
* `npm start` or `yarn start` 
* And will be available on `localhost:3333` (as indicated in webpak-dev-server.config.js)
* For tests: `npm test`
