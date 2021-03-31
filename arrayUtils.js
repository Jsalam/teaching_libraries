/**
 * This function takes a one-dimensional array and returns the element that would be 
 * placed in a given row and column coordinates
 * @param arr The array
 * @param col the column number
 * @param row the row number
 * @param matrixWidth the total number of columns in the array
 */
function getElementFromOneDimArray(arr, col, row, matrixWidth) {
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
            return arr[arrayPos];
        }
    }
}

/** This function returns the element from the two-dimensional arrat situated at the given coordinates 
 * @param arr the two-dimensional array
 * @param col the column
 * @param row the row
 * @return the element in the array
 */
function getElementFromTwoDimArray(arr, col, row) {
    return arr[col][row];
}


/**
 * Takes a one-dimensional array and returns a new two-dimensional array with a given number of columns
 * @param {array} arr the one dimensional array
 * @param {integer} cols the number of columns in the two-simensional output
 * @return {array} the two-dimensional array
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
 * @param {array} arr the one-diemnsional array to be transfromed
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
 * Gets four contiguous elements from the one dimensional array. The anchor element is at the 
 * col and row intersection. The remaining three are on the right, right-lower, and lower of the
 * anchor.
 * @param arr the one-dimensional array
 * @param col the column index
 * @param row the row index
 * @param matrixWidth the matrix row lenght
 * @return An array with elements orders as follows: anchor, right, lower-right, lower 
 */
function getQuad(arr, col, row, matrixWidth) {

    let currentIndex = (matrixWidth * row) + col;
    let uL;
    let uR;
    let lL;
    let lR;

    console.log();

    if (currentIndex < arr.length) {

        // Retrieve the current and next particle from the array
        let particle = arr[currentIndex];
        let nextParticle = arr[currentIndex + 1];


        /** Drawing horizontal lines
        This draws lines from one particle to the next, but skips the line between the last 
        particle in a row and the first one in the following row. This line is tricky. I am 
        comparing the current index with the higher index of the row. But i am shifting the index 
        1 value and the row index 1 width step because I have issues comparing the index and the 
        row with when both have values of 0.
        There might be a better way to do this.
        */
        //  console.log((matrixWidth * row) + matrixWidth);
        uL = particle;
        if (currentIndex + 1 < (matrixWidth * row) + matrixWidth) {
            // line(particle.x, particle.y, nextParticle.x, nextParticle.y);
            //uL = particle;
            uR = nextParticle;
        }

        /**Drawing vertical lines
        In order to get the index of the particle below the current particle I increase the current index 
        by the width. But to prevent exceeding the value of arr.length, the boolean condition 
        sets a restriction: only retrieve arr when particleIndexBelow is less than the array length.
        */
        let particleIndexBelow = currentIndex + matrixWidth;

        let nextParticleIndexBelow = particleIndexBelow + 1;

        //  console.log(particleIndexBelow);
        //  console.log(arr.length);

        if (particleIndexBelow < arr.length) {
            let lowerDial = arr[particleIndexBelow];
            // line(particle.x, particle.y, lowerDial.x, lowerDial.y);
            lL = lowerDial;
        }

        if (nextParticleIndexBelow < arr.length) {

            if (nextParticleIndexBelow % matrixWidth != 0) {
                lR = arr[nextParticleIndexBelow];
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