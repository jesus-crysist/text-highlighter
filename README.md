# TextHighlighter

In this application you can enter arbitrary text in the text are (or pasting it from your clipboard), choose color from the list of predefined colors (red, yellow and green)
and highlighting parts of the text with the chosen color. You can do as many highlights with any of the colors as you want.

Besides that, you can go to another page by clicking on "Highlights List" link in navigation to view all highlights and be able to remove some if necessary.
You can filter list of highlights by choosing a color in the color filter above.

To return to the text area with text, click on "Text Highlight Area" in navigation.

## Run server

Run `ng serve` to build code and run a server for it. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Improvements
There are some improvements I wanted to do:
- Returning to text area doesn't preserve highlights.
- Pasting text may result in pasting its style as well, so it would be good to strip all pasting test and just insert text into the field.
- Improving store or using 3rd party NgRx.
- Filtering highlights through store.
- Writing E2E tests.

