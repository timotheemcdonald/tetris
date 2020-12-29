document.addEventListener('DOMContentLoaded', () => {

    const grid = document.querySelector('.grid')
    const displaySquares = document.querySelectorAll('.previous-grid div')
    let squares = Array.from(grid.querySelectorAll('div'))
    const width = 10;
    const height = 20;
    let currentPosition = 4;

    //assign functions to keycodes
    function control(e){
        if(e.keyCode=== 39){
            moveRight()
        }else if(e.keyCode === 38){
            rotate()
        }else if(e.keyCode === 37){
            moveLeft()
        }else if(e.keyCode === 40){
            moveDown()
        }
    }
    document.addEventListener('keydown', control)
    //the Tetrominoes

    const lTetromino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width,width*2,width*2+1, width*2+2]
    ]

    const zTetromino = [
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1],
        [0, width, width+1, width*2+1],
        [width+1,width+2,width*2, width*2+1]
    ]

    const tTetromino = [
        [1, width, width+1, width+2],
        [1, width+1, width+2, width*2+1],
        [width, width+1, width+2, width*2+1],
        [1,width,width+1, width*2+1]
    ]

    const oTetromino = [
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1],
    ]

    const iTetromino = [
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3],
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3],
    ]

    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

    //Randomly select Tetromino
    let random = Math.floor(Math.random() * theTetrominoes.length)
    let currentRotation = 0
    let current = theTetrominoes[random][currentRotation]

    //draw the shape
    function draw(){
        current.forEach( index => {
            squares[currentPosition + index].classList.add('block')
        })
    }

    //undraw the shape
    function undraw(){
        current.forEach( index => {
            squares[currentPosition + index].classList.remove('block')
        })
    }

    //move down
    function moveDown(){
        undraw()
        currentPosition = currentPosition += width
        draw()
        freeze()
    }

    //move left and prevent collisions with shapes moving left
    function moveRight(){
        undraw()
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)
        if(!isAtRightEdge) currentPosition += 1
        if(current.some(index => squares[currentPosition + index].classList.contains('block2'))){
            currentPosition -=1
        }
        draw()
    }

    function moveLeft(){
        undraw()
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
        if(!isAtLeftEdge) currentPosition -=1
        if(current.some(index => squares[currentPosition + index].classList.contains('block2'))){
            currentPosition +=1
        }
        draw()
    }

    //rotate
    function rotate(){
        undraw()
        currentRotation ++
        if(currentRotation === current.length){
            currentRotation = 0
        }
        current = theTetrominoes[random][currentRotation]
        draw()
    }

    const displayWidth = 4
    const displayIndex = 0
    let nextRandom = 0

    const smallTetrominoes = [
        [1, displayWidth+1, displayWidth*2+1, 2],
        [0, displayWidth, displayWidth+1, displayWidth*2+1],
        [1, displayWidth, displayWidth+1, displayWidth+2],
        [0, 1, displayWidth, displayWidth+1],
        [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1]
    ]

    function displayShape(){
        displaySquares.forEach(square => {
            square.classList.remove('block')
        })
        smallTetrominoes[nextRandom].forEach( index => {
            displaySquares[displayIndex + index].classList.add('block')
        })
    }

    displayShape()
    draw()
})