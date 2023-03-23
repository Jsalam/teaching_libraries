/**
 * This function takes a one-dimensional array and returns the element that would be 
 * placed in a given row and column coordinates
 * @param {array} arr The array
 * @param {number} col the column number
 * @param {number} row the row number
 * @param {number} matrixWidth the total number of columns in the array
 * @returns the element in the array
 */
function getElementFromOneDimArray(arr, col, row, matrixWidth) {
    let result;
    if (col >= matrixWidth) {
        console.log("Column index exceeds the matrix width");
    } else if (row >= (arr.length / matrixWidth)) {
        console.log("Row index " + row + " exceeds the max available rows");
    } else {

        // poistion in a linear array
        let arrayPos = col + (row * matrixWidth);

        if (arr[arrayPos] == undefined) {
            console.log("Index " + arrayPos + " is out of bounds. No element in position col: " + col + ", row: " + row);
        } else {
            result = arr[arrayPos];
        }
    }
    return result;
}

/** This function returns the element from the two-dimensional array situated at the given coordinates 
 * @param {array} arr the two-dimensional array
 * @param {number} col the column
 * @param {number} row the row
 * @returns {array} the element in the array
 */
function getElementFromTwoDimArray(arr, col, row) {
    return arr[col][row];
}

/**
 * This function takes a one-dimensional array and returns an array of elements placed in the given column index 
 * @param {array} arr the one-dimensional array
 * @param {number} col the column to be retrieved
 * @param {number} matrixWidth the width of the matrix
 * @returns {array} an array with the elements in the requested column
 */
function getColumnFromOneDimArray(arr, col, matrixWidth) {
    let result = [];
    let nRows = arr.length / matrixWidth;
    if (col < arr.length) {
        for (let i = 0; i < nRows; i++) {
            let temp = getElementFromOneDimArray(arr, col, i, matrixWidth);
            if (temp) result.push(temp);
        }
    } else {
        console.log("The column value is greater than the array length");
    }
    return result;
}

/**
 * This function takes a one-dimensional array and returns an array of elements placed in the given row index
 * @param {array} arr the one-dimensional array
 * @param {number} row the row the be retrieved
 * @param {number} matrixWidth the width of the matrix
 * @returns {array} an array of elements
 */
function getRowFromOneDimArray(arr, row, matrixWidth) {
    let result = [];
    let nRows = arr.length / matrixWidth;
    if (row < nRows) {
        for (let i = 0; i < matrixWidth; i++) {
            let temp = getElementFromOneDimArray(arr, i, row, matrixWidth);
            if (temp) {
                result.push(temp);
            }
        }
    } else {
        console.log("The row index is greater than the max posible number of rows");
    }
    return result;
}


/**
 * Takes a one-dimensional array and returns a new two-dimensional array with a given number of columns
 * @param {array} arr the one-dimensional array
 * @param {integer} cols the number of columns in the two-dimensional output
 * @returns {array} the two-dimensional array
 */
function fromOneDtoTwoD(arr, cols) {

    let rtn = [];
    let subArray = [];

    for (let i = 0; i < arr.length; i++) {
        subArray.push(arr[i]);

        if ((i + 1) % cols == 0) {
            rtn.push(subArray);
            subArray = [];
        }
    }
    if (subArray.length > 0) {
        rtn.push(subArray);
    }
    return rtn;
}



/**
 * Takes a two-dimensional array and returns a new one-dimensional array
 * @param {array} arr the one-dimensional array to be transformed
 * @returns {array} the new two-dimensional array
 */
function fromTwoDtoOneD(arr) {
    let rtn = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            rtn.push(arr[i][j]);
        }
    }
    return rtn;
}


/**
 * Gets contiguous elements from the one dimensional array situated at the anchor, right, right-below, and below of an anchor element.
 * The anchor element is at the col and row intersection. The remaining three are on the right, right-lower, and lower of the
 * anchor.
 * @param {array} arr the one-dimensional array
 * @param {number} col the column index
 * @param {number} row the row index
 * @param {number} matrixWidth the matrix row length
 * @returns {array} An array with elements orders as follows: anchor, right, lower-right, lower 
 */
function getQuad(arr, col, row, matrixWidth) {

    let currentIndex = (matrixWidth * row) + col;
    let uL;
    let uR;
    let lL;
    let lR;

    if (currentIndex < arr.length) {

        // Retrieve the current and next element from the array
        let element = arr[currentIndex];
        let nextElement = arr[currentIndex + 1];


        //Horizontal
        uL = element;
        if (currentIndex + 1 < (matrixWidth * row) + matrixWidth) {
            uR = nextElement;
        }

        //Vertical
        let elementIndexBelow = currentIndex + matrixWidth;

        let nextElementIndexBelow = elementIndexBelow + 1;

        if (elementIndexBelow < arr.length) {
            let lowerDial = arr[elementIndexBelow];
            lL = lowerDial;
        }

        if (nextElementIndexBelow < arr.length) {

            if (nextElementIndexBelow % matrixWidth != 0) {
                lR = arr[nextElementIndexBelow];
            }
        }

        let result = []

        if (uL) result.push(uL);
        if (uR) result.push(uR);
        if (lR) result.push(lR);
        if (lL) result.push(lL);
        return result;
    } else {
        console.log("Out of bounds error. Check your indexes");
        return undefined;
    }
}

/**
 * Gets the surrounding elements of an element situated in a lattice stored in a one dimensional array. The anchor is the element is at the 
 * col and row intersection. It regularly retrieves an array with the surrounding elements starting with the one above the anchor (12:00 o'clock). 
 * The next ones are in clockwise order (up, upRight, right, downRight, down, leftDown, left, upLeft). If the anchor is by an edge or corner the 
 * returned array inclues only those within the lattice boundaries
 * 
 * @param {array} arr the one-dimensional array
 * @param {number} col the column index
 * @param {number} row the row index
 * @param {number} matrixWidth the matrix row length
 * @param {array} theArray Optional. The array to store retrieved elements
 * @returns {Object} An object with surrounding elements labeled in clockwise order
 */
function getSurroundingOneDim(arr, col, row, matrixWidth, theArray) {

    let currentIndex = (matrixWidth * row) + col;

    let rowAbove = getRowFromOneDimArray(arr, row - 1, matrixWidth);
    let rowBelow = getRowFromOneDimArray(arr, row + 1, matrixWidth);
    let result = {}
    let resultArray = [];

    if (currentIndex < arr.length) {

        // 12:00
        let elementIndexUp = currentIndex - matrixWidth;
        if (elementIndexUp >= 0) {
            result.up = arr[elementIndexUp];
            resultArray.push(arr[elementIndexUp]);
        }

        // 1:15
        let elementIndexUpRight = currentIndex - (row * matrixWidth) + 1
        if (rowAbove[elementIndexUpRight]) {
            result.upRight = rowAbove[elementIndexUpRight];
            resultArray.push(rowAbove[elementIndexUpRight]);
        }

        // 3:00 
        let elementIndexRight = currentIndex + 1;
        if (elementIndexRight >= (matrixWidth * row) && elementIndexRight < (matrixWidth * row) + matrixWidth) {
            result.right = arr[elementIndexRight];
            resultArray.push(arr[elementIndexRight]);
        }

        // 4:30
        let elementIndexDownRight = currentIndex - (row * matrixWidth) + 1
        if (rowBelow[elementIndexDownRight]) {
            result.downRight = rowBelow[elementIndexDownRight];
            resultArray.push(rowBelow[elementIndexDownRight]);
        }

        // 6:00
        let elementIndexDown = currentIndex + matrixWidth;
        if (elementIndexDown >= (matrixWidth * row) + matrixWidth && elementIndexDown < arr.length) {
            result.down = arr[elementIndexDown];
            resultArray.push(arr[elementIndexDown]);
        }

        // 7:30
        let elementIndexDownLeft = currentIndex - (row * matrixWidth) - 1
        if (rowBelow[elementIndexDownLeft]) {
            result.downLeft = rowBelow[elementIndexDownLeft];
            resultArray.push(rowBelow[elementIndexDownLeft]);
        }

        // 9:00
        let elementIndexLeft = currentIndex - 1;
        if (elementIndexLeft >= (matrixWidth * row) && elementIndexLeft < (matrixWidth * row) + matrixWidth) {
            result.left = arr[elementIndexLeft];
            resultArray.push(arr[elementIndexLeft]);
        }

        // 10:30
        let elementIndexUpLeft = currentIndex - (row * matrixWidth) - 1
        if (rowAbove[elementIndexUpLeft]) {
            result.upLeft = rowAbove[elementIndexUpLeft];
            resultArray.push(rowAbove[elementIndexUpLeft]);
        }

        if (theArray) {
            return resultArray;
        } else {
            return result;
        }
    } else {
        console.log("Out of bounds error. Check your indexes");
        return undefined;
    }
}

/**
 * Gets contiguous elements from the one dimensional array situated above, up-right, and right of an anchor element.
 * The anchor element is at the col and row intersection.
 * @param {array} arr the one-dimensional array
 * @param {number} col the column index
 * @param {number} row the row index
 * @param {number} matrixWidth the matrix row length
 * @returns {array} An object with surrounding elements labeled in clockwise order
 */
function getRightTopElements(arr, col, row, matrixWidth) {
    let elements = getSurroundingOneDim(arr, col, row, matrixWidth);
    let rtn = [];
    if (elements.up) rtn.push(elements.up);
    if (elements.upRight) rtn.push(elements.upRight);
    if (elements.right) rtn.push(elements.right);
    return rtn;
}
/**
 * Gets contiguous elements from the one dimensional array situated on the right, right-below, and below of an anchor element.
 * The anchor element is at the col and row intersection.
 * @param {array} arr the one-dimensional array
 * @param {number} col the column index
 * @param {number} row the row index
 * @param {number} matrixWidth the matrix row length
 * @returns {array} An object with surrounding elements labeled in clockwise order
 */
function getRightBottomElements(arr, col, row, matrixWidth) {
    let elements = getSurroundingOneDim(arr, col, row, matrixWidth);
    let rtn = [];
    if (elements.right) rtn.push(elements.right);
    if (elements.downRight) rtn.push(elements.downRight);
    if (elements.down) rtn.push(elements.down);
    return rtn;
}

/**
 * Gets contiguous elements from the one dimensional array situated below, left-below, and left of an anchor element.
 * The anchor element is at the col and row intersection.
 * @param {array} arr the one-dimensional array
 * @param {number} col the column index
 * @param {number} row the row index
 * @param {number} matrixWidth the matrix row length
 * @returns {array} An object with surrounding elements labeled in clockwise order
 */
function getLeftBottomElements(arr, col, row, matrixWidth) {
    let elements = getSurroundingOneDim(arr, col, row, matrixWidth);
    let rtn = [];
    if (elements.down) rtn.push(elements.down);
    if (elements.downLeft) rtn.push(elements.downLeft);
    if (elements.left) rtn.push(elements.left);
    return rtn;
}

/**
 * Gets contiguous elements from the one dimensional array situated left, left-above, and above of an anchor element.
 * The anchor element is at the col and row intersection.
 * @param {array} arr the one-dimensional array
 * @param {number} col the column index
 * @param {number} row the row index
 * @param {number} matrixWidth the matrix row length
 * @returns {array} An object with surrounding elements labeled in clockwise order
 */
function getLeftTopElements(arr, col, row, matrixWidth) {
    let elements = getSurroundingOneDim(arr, col, row, matrixWidth);
    let rtn = [];
    if (elements.left) rtn.push(elements.left);
    if (elements.upLeft) rtn.push(elements.upLeft);
    if (elements.up) rtn.push(elements.up);
    return rtn;
}

/**
 * Checks if the point is on or beyond the boundaries of the matrix and returns an object with four labeled booleans
 * (top, right, bottom, left).
 * @param {array} arr the one-dimensional array
 * @param {number} col the column index
 * @param {number} row the row index
 * @param {number} matrixWidth the matrix row length
 * @returns an object of labeled booleans: top, right, bottom, left 
 */
function hitBoundary(array, col, row, matrixWidth) {
    let hit = { top: false, right: false, bottom: false, left: false }
        //top
    if (row <= array[0].y) hit.top = true;
    //right
    if (col >= array[matrixWidth - 1].x) hit.right = true;
    // bottom
    if (row >= array[array.length - 1].y) hit.bottom = true;
    // left
    if (col <= array[0].x) hit.left = true;
    return hit
}