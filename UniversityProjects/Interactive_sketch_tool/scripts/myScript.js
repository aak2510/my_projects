// Find the Canvas Element
const canvas = document.getElementById("canvas");


// Set canvas dimensions
canvas.width = 1400;
canvas.height = window.innerHeight * 0.8;


// In order to draw on the canvas we need to get the context - the arguements is 2d as the screen is 2 dimensional, x and y axis
const context = canvas.getContext("2d");


// Set the fill style of the drawing object to the color white:
context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height);


// Default values for the pen colour, the size of the pen and a bool to make sure we start and stop drawing appropriately
let pen_colour = "black";
let pen_size = "20";
let is_drawing = false; // Prevent continous drawing
let start_x;
let start_y;

/* Event listeners wait for specified events to occur (1st arguement), 
and then calls the second arguement to perform an action when the event does occur.
Last item is the caputre event, used to determine the order in which element should fire
*/
canvas.addEventListener("mousedown", start_drawing, false);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", stop_drawing, false);


/** The reason for using begin path is simple. When we draw something 
 * and just use moveTo, then the properties of that previous line carries 
 * over to the new line we are creating. Using beingPath allows us to create
 * a new line (new path) which we can set new properties for. 
 * https://www.geeksforgeeks.org/html-canvas-beginpath-method/ 
 */


/** 
 * This citation is for the line of code that says 'drawing(event);' 
 * I had been struggling on this bug for a while, and then I came across 
 * this youtube channel who showed me how to debug it and why it happens 
 * in the first place.  
 * Citation:
 * developedbyed (2019) Learn HTML5 Canvas By Creating A Drawing App | HTML Canvas Tutorial. 
 * Available at: https://youtu.be/3GqUM4mEYKA (Accessed 21 December 2022). */

/**
 * Prepares the drawing to be made by setting a bool to true and then 
 * defines the coordinates of where the path being drawn should start.
 * 
 * @param {event} event The coordinates of where the mouse pointer is on the canvas
 */
function start_drawing(event) {

    // This makes sure that we are ready to draw/allowed to draw
    is_drawing = true;

    // Calling draw function here so that if the user just clicks once, then they can draw a dot.
    drawing(event);
    // Save the starting x and y coordinates
    start_x = event.clientX;
    start_y = event.clientY;

}

/*developedbyed (2019) Learn HTML5 Canvas By Creating A Drawing App | HTML Canvas Tutorial. 
Available at: https://youtu.be/3GqUM4mEYKA (Accessed 21 December 2022).*/



/**
 * Stops the user from drawing on the canvas and closes the current path
 * @param {event} event The coordinates of where the mouse pointer is on the canvas
 */
function stop_drawing(event) {

    is_drawing = false;
    context.stroke();
    context.beginPath();
    /** 
     * The if statement is used to ensure we only store the data from when the mouse was on the canvas, and not off it.
     * And everytime the user draws off the canvas, and then redraws on it - its assumed it was meant to be apart of the same
     * drawing/stroke
    */
    if (event.type != 'mouseout') {
        push_item();
    }
}

/**
 * Defines the end points of where the path is being drawn and strokes/fills in that path.
 * 
 * @param {event} event The coordinates of where the mouse pointer is on the canvas
 */
function drawing(event) {
    if (!is_drawing) {
        return;
    }
    context.lineWidth = pen_size;
    context.strokeStyle = pen_colour;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    context.stroke();
}




/**
 * Changes the current colour of the pen to the the arugement colour.
 * @param {colour} colour 
 */
function new_colour(colour) {
    pen_colour = colour;
}

/**
 * Resets the canvase by clearing it and creating a new canvas.
 */
function clear_all() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(0, 0, canvas.width, canvas.height);

}


/*********************************************************************************************************/
/** 
 * The following piece of code has been ADAPTED from the array undo redo tutorial by Chtiwi Malek. 
 * I have changed this to make a custom stack implementation instead, but the underling code is the same.
 * Citation:
 * Malek , C. (2013) Undo and redo with HTML5 canvas, Codicode. Codicode . 
 * Available at: https://www.codicode.com/art/undo_and_redo_to_the_html5_canvas.aspx 
 * (Accessed: November 8, 2022).  
 */



/**
 * This is a stack implemenation for the undo redo functions. This is acheived using an underlying dynamic array.
 */
class Stack {
    constructor() {
        // create an empty dynamic array - arrays are dynamic by nature in JS
        this.items = [];
        // set the index position to -1
        this.top = -1;
    }

    push(item) {
        // increase stack pointer to point to next free space
        this.top++;
        // add an item in this free space
        this.items[this.top] = item;
    }

    pop() {
        // if the stack is empty, return nothing
        if (this.top < 0) {
            return null;
        }
        // otherwise return the top of the stack
        const item = this.items[this.top];
        // set the top to null 
        this.items[this.top] = null;
        // decrement the pointer to point to the next element in the stack
        this.top--;
        return item;
    }

    isEmpty() {
        // we started from -1 index, so we need +1 here
        return (this.top + 1) <= 0;
    }
}

// Defining an undo and redo stack 
const undoStack = new Stack();
const redoStack = new Stack();

function reload_image(stack1, stack2) {
    // Otherwise, if there are items on the undoStack
    // Create a new image object
    const canvasPic = new Image();
    // set the source of the image object as the image at the top of the stack
    canvasPic.src = stack1.pop();
    // Draw that image onto the canvas
    canvasPic.onload = function () { context.drawImage(canvasPic, 0, 0); }
    // Add the item from the top of the stack that it was popped from to the opposite stack
    stack2.push(canvasPic.src);
}



/**
 * Increases the size of the stack and pushes an image on to the top of the stack
 */
function push_item() {
    undoStack.push(document.getElementById('canvas').toDataURL());
}


/**
 * Takes the top item off the stack and redraws it on the canvas. Also adds the undone item to the redo stack.
 */
function undo_button() {
    // If there is nothing in the stack, we can just call clear_all which redraws the canvas
    if (undoStack.isEmpty()) {
        clear_all();
        // make sure we end the function after undoing the stack
        return;
    }

    reload_image(undoStack,redoStack);

}

/**
 * Takes the top item off the redo stack and redraws it on the canvas.
 */
function redo_button() {
    /* One we have emptied the redoStack, we need to end the function.
     * This is needed so that we don't add unncessary items on the undoStack after pressing redo
     * Otherwise once we redo everything, we would end up adding empty images to the stack
     */
    if (redoStack.isEmpty()) {
        return;
    }

    reload_image(redoStack,undoStack);

}

/*********************************************************************************************************/


/**
 * Function turns the current colour of the pen to white,
 * imitating the effect of an eraser on a white canvas
 */
function eraser() {
    pen_colour = "white";
}


/**
 * Saves canvas as an image. This is done by setting up a mouse event listener
 * to hear when it is clicked on. When this is done, this function is run - 
 * converting the image to a base64 data URL as a png, and then we temporarily store
 * the canvas data as a hyperlink so that it can be downloaded.
 * 
 * Some help for this was taken from the following source to only figure out the 
 * link removal on the last line: 
 * Simpson, J. (2022) How to save HTML canvas as an image, Fjolt. Fjolt. 
 * Available at: https://fjolt.com/article/html-canvas-save-as-image 
 * (Accessed: November 17, 2022). 
 * @param {mouseevent} e Listens to see if a click was made on the canvas
 */
const save_button = document.getElementById('save_image_button')
save_button.addEventListener('click', e => {
    // Create an anchor, and set the href value to our data URL -  // We are emulating a link click
    const element_tag = document.createElement('a');
    // This is the name of our downloaded file
    element_tag.download = "image";
    /* Converts canvas to a base64 data URL, this encodes the image as a string that is easily downloaded.
    By default this is a .png*/
    element_tag.href = canvas.toDataURL();

    // Click the download button, causing a download, and then remove the link that was made once the download is complete
    element_tag.click();
    element_tag.remove();
});

