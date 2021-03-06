var puzzle = {

    imageTab: ['assets/obr1.jpg', 'assets/obr2.png', 'assets/obr3.jpg', 'assets/obr4.jpg'],
    puzzleImage: 'assets/obr1.jpg',
    img: 0,
    winningTab: [],

    //dodawanie tła i głównego diva
    renderLayout: function () {
        let div1 = document.createElement("div");
        div1.setAttribute("id", "div1");
        document.body.appendChild(div1);

        let div = document.createElement("div")
        div.setAttribute("id", "main")
        div1.appendChild(div)
    },

    //dodawanie planszy
    renderBoard: function () {
        let div = document.createElement("div")
        div.setAttribute("id", "aroundBoard")
        let div2 = document.createElement("div")
        div2.setAttribute("id", "board")
        div.appendChild(div2)
        document.getElementById("main").appendChild(div)
    },

    //tworzenie klocków
    renderPuzzle: function () {
        document.getElementById("board").innerHTML = ""
        puzzle.tab = []
        for (let i = 0; i < puzzle.size; i++) {
            puzzle.tab[i] = []
            for (let j = 0; j < puzzle.size; j++) {
                puzzle.tab[i][j] = i * puzzle.size + j
                let puzzlePiece = document.createElement("div")
                puzzlePiece.classList.add("puzzle")
                puzzlePiece.id = `${i}x${j}`
                puzzlePiece.style.width = `${600 / puzzle.size}px`
                puzzlePiece.style.height = `${600 / puzzle.size}px`
                puzzlePiece.style.backgroundPosition = `${(-600 / puzzle.size) * j}px ${(-600 / puzzle.size) * i}px`
                puzzlePiece.style.left = `${(600 / puzzle.size) * j}px`
                puzzlePiece.style.top = `${(600 / puzzle.size) * i}px`
                puzzle.changeImage(puzzle.puzzleImage);
                console.log(puzzle.puzzleImage);

                puzzlePiece.addEventListener("click", function () {
                    let changed = false
                    i = parseInt(this.id.slice(0, 1))
                    j = parseInt(this.id.slice(2, 3))
                    console.log(i + "aaa" + j)
                    if (i + 1 < puzzle.size && i + 1 >= 0) {
                        if (puzzle.tab[i + 1][j] == puzzle.size * puzzle.size) {
                            puzzle.tab[i + 1][j] = puzzle.tab[i][j]
                            puzzle.tab[i][j] = puzzle.size * puzzle.size
                            change = (600 / puzzle.size) * (i + 1)
                            document.getElementById(`${i}x${j}`).style.top = `${change}px`
                            i = i + 1
                            changed = true
                        }
                    }
                    if (changed == false) {
                        if (i - 1 < puzzle.size && i - 1 >= 0) {
                            if (puzzle.tab[i - 1][j] == puzzle.size * puzzle.size) {
                                puzzle.tab[i - 1][j] = puzzle.tab[i][j]
                                puzzle.tab[i][j] = puzzle.size * puzzle.size
                                change = (600 / puzzle.size) * (i - 1)
                                document.getElementById(`${i}x${j}`).style.top = `${change}px`
                                i = i - 1
                                changed = true
                            }
                        }
                    }
                    if (changed == false) {
                        if (j + 1 < puzzle.size && j + 1 >= 0) {
                            if (puzzle.tab[i][j + 1] == puzzle.size * puzzle.size) {
                                puzzle.tab[i][j + 1] = puzzle.tab[i][j]
                                puzzle.tab[i][j] = puzzle.size * puzzle.size
                                change = (600 / puzzle.size) * (j + 1)
                                document.getElementById(`${i}x${j}`).style.left =
                                    `${change}px`
                                j = j + 1
                                changed = true
                            }
                        }
                    }
                    if (changed == false) {
                        if (j - 1 < puzzle.size && j - 1 >= 0) {
                            if (puzzle.tab[i][j - 1] == puzzle.size * puzzle.size) {
                                puzzle.tab[i][j - 1] = puzzle.tab[i][j]
                                puzzle.tab[i][j] = puzzle.size * puzzle.size
                                change = (600 / puzzle.size) * (j - 1)
                                document.getElementById(`${i}x${j}`).style.left =
                                    `${change}px`
                                j = j - 1
                                changed = true
                            }
                        }
                    }
                    console.table(puzzle.tab)
                    this.id = `${i}x${j}`
                    puzzle.winning();
                })
                if (i == puzzle.size - 1 && j == puzzle.size - 1) {
                    puzzle.tab[i][j] = puzzle.size * puzzle.size
                } else {
                    document.getElementById("board").appendChild(puzzlePiece)
                    console.log("i wanna cry")
                }

            }
        }

        for (var i = 0; i < puzzle.tab.length; i++) {
            puzzle.winningTab.push([]);
            for (var j = 0; j < puzzle.tab[i].length; j++) {
                puzzle.winningTab[i].push(puzzle.tab[i][j]);
            }
        }
    },

    //mieszanie
    mieszuMieszu: function () {

        let timer = window.setInterval("function(){}");
        for (let i = 0; i <= timer; i++) {
            window.clearInterval(i);
        }
        for (let z = 0; z < puzzle.size * puzzle.size * 10; z++) {
            (function (z) {
                setTimeout(function () {
                    for (let n = 0; n < puzzle.size; n++) {
                        for (let m = 0; m < puzzle.size; m++) {
                            if (puzzle.tab[m][n] == puzzle.size * puzzle.size) {
                                nah = n
                                meh = m
                                break;
                            }
                        }
                    }
                    rand = Math.floor(Math.random() * (4))
                    if (rand == 0) {
                        if (meh + 1 >= puzzle.size) {
                            i = meh - 1
                        } else {
                            i = meh + 1
                        }

                        j = nah
                    }
                    if (rand == 1) {
                        if (meh - 1 < 0) {
                            i = meh + 1
                        } else {
                            i = meh - 1
                        }
                        j = nah
                    }
                    if (rand == 2) {
                        i = meh
                        if (nah + 1 >= puzzle.size) {
                            j = nah - 1
                        } else {
                            j = nah + 1
                        }
                    }
                    if (rand == 3) {
                        i = meh
                        if (nah - 1 < 0) {
                            j = nah + 1
                        } else {
                            j = nah - 1
                        }
                    }
                    let changed = false
                    if (i + 1 < puzzle.size && i + 1 >= 0) {
                        if (puzzle.tab[i + 1][j] == puzzle.size * puzzle.size) {
                            puzzle.tab[i + 1][j] = puzzle.tab[i][j]
                            puzzle.tab[i][j] = puzzle.size * puzzle.size
                            change = (600 / puzzle.size) * (i + 1)
                            document.getElementById(`${i}x${j}`).style.top = `${change}px`
                            document.getElementById(`${i}x${j}`).id = `${i + 1}x${j}`
                            i = i + 1
                            changed = true
                        }
                    }
                    if (changed == false) {
                        if (i - 1 < puzzle.size && i - 1 >= 0) {
                            if (puzzle.tab[i - 1][j] == puzzle.size * puzzle.size) {
                                puzzle.tab[i - 1][j] = puzzle.tab[i][j]
                                puzzle.tab[i][j] = puzzle.size * puzzle.size
                                change = (600 / puzzle.size) * (i - 1)
                                document.getElementById(`${i}x${j}`).style.top = `${change}px`
                                document.getElementById(`${i}x${j}`).id = `${i - 1}x${j}`
                                i = i - 1
                                changed = true
                            }
                        }
                    }
                    if (changed == false) {
                        if (j + 1 < puzzle.size && j + 1 >= 0) {
                            if (puzzle.tab[i][j + 1] == puzzle.size * puzzle.size) {
                                puzzle.tab[i][j + 1] = puzzle.tab[i][j]
                                puzzle.tab[i][j] = puzzle.size * puzzle.size
                                change = (600 / puzzle.size) * (j + 1)
                                document.getElementById(`${i}x${j}`).style.left = `${change}px`
                                document.getElementById(`${i}x${j}`).id = `${i}x${j + 1}`
                                j = j + 1
                                changed = true
                            }
                        }
                    }
                    if (changed == false) {
                        if (j - 1 < puzzle.size && j - 1 >= 0) {
                            if (puzzle.tab[i][j - 1] == puzzle.size * puzzle.size) {
                                puzzle.tab[i][j - 1] = puzzle.tab[i][j]
                                puzzle.tab[i][j] = puzzle.size * puzzle.size
                                change = (600 / puzzle.size) * (j - 1)
                                document.getElementById(`${i}x${j}`).style.left = `${change}px`
                                document.getElementById(`${i}x${j}`).id = `${i}x${j - 1}`
                                j = j - 1
                                changed = true
                            }
                        }
                    }
                    console.log(z)
                }, 90 * z);
            })(z);
        }

    },

    //tworzenie przycisków
    renderButtons: function () {
        let buttons = document.createElement("div")
        buttons.setAttribute("id", "buttons")
        document.getElementById("main").appendChild(buttons)
        for (let i = 3; i <= 6; i++) {
            let bt = document.createElement("button")
            bt.innerHTML = `${i}x${i}`
            bt.classList.add("buttons")
            bt.addEventListener("click", function () {
                puzzle.size = i
                puzzle.refresh()
            })
            document.getElementById("buttons").appendChild(bt)
        }
    },

    //dodawanie slidera
    renderSlider: function () {
        let slider = document.createElement("div")
        slider.setAttribute("id", "slider")
        document.getElementById("main").appendChild(slider)

        let arrowLeft = document.createElement("div")
        arrowLeft.setAttribute("id", "arrowLeft")
        arrowLeft.addEventListener("click", function () {
            puzzle.slideImages(0)
        })
        document.getElementById("slider").appendChild(arrowLeft)

        let images = document.createElement("div")
        images.setAttribute("id", "images")
        document.getElementById("slider").appendChild(images)

        let arrowRight = document.createElement("div")
        arrowRight.setAttribute("id", "arrowRight")
        arrowRight.addEventListener("click", function () {
            puzzle.slideImages(1)
        })
        document.getElementById("slider").appendChild(arrowRight)
    },

    //tworzenie linii obrazków
    addImages: function () {
        for (let i = 0; i < puzzle.imageTab.length; i++) {
            let image = document.createElement("div")
            image.classList.add("sliderClass")
            image.style.backgroundImage = `url(${puzzle.imageTab[i]})`
            image.addEventListener("click", function () {
                let background = puzzle.imageTab[i]
                puzzle.changeImage(background)
                puzzle.puzzleImage = background
                puzzle.refresh();
            })
            document.getElementById("images").appendChild(image)
        }
        document.getElementById("images").scrollLeft = 0
    },

    //scrollowanie w sliderze
    slideImages: function (depression) {
        if (puzzle.img == 0 && depression == 0) {
            document.getElementById("images").childNodes[puzzle.img].before(document.getElementById(
                "images").childNodes[puzzle.imageTab.length - 1])
            document.getElementById("images").scrollLeft += 200
        } else if (puzzle.img == puzzle.imageTab.length - 1 && depression == 1) {
            document.getElementById("images").childNodes[puzzle.img].after(document.getElementById(
                "images").childNodes[0])
            document.getElementById("images").scrollLeft -= 200
        }

        for (let i = 0; i <= 200; i++) {
            setTimeout(function () {
                if (depression == 0) {
                    document.getElementById("images").scrollLeft--;
                } else {
                    document.getElementById("images").scrollLeft++;
                }
                console.log(document.getElementById("images").scrollLeft)
            }, i * i / 150)
        }

        if (depression == 0) {
            puzzle.img--
        } else {
            puzzle.img++
        }

        if (puzzle.img > puzzle.imageTab.length - 1) {
            puzzle.img = puzzle.imageTab.length - 1
        } else if (puzzle.img < 0) {
            puzzle.img = 0
        }
    },

    //zmiana obrazka
    changeImage: function (anxiety) {
        let img = document.querySelectorAll(".puzzle");
        for (let i = 0; i < img.length; i++) {
            img[i].style.backgroundImage = `url(${anxiety})`
        }
    },

    //sprawdzanie wygranej
    winning: function () {
        console.table(puzzle.tab);
        console.log("Winning tab:");
        console.table(puzzle.winningTab);

        var win = true;
        for (var i = 0; i < puzzle.tab.length; i++) {
            for (var j = 0; j < puzzle.tab[i].length; j++) {
                if (puzzle.tab[i][j] != puzzle.winningTab[i][j]) {
                    win = false;
                    break;
                }
            }
        }
        console.log(win);

        if (win) {
            alert("You win!");
        }
    },

    refresh: function () {
        console.log("Start refresh...");
        puzzle.renderPuzzle()
        puzzle.mieszuMieszu()
        console.log("End refresh...");
    },

    renderWeb: function () {
        puzzle.renderLayout()
        puzzle.renderSlider()
        puzzle.addImages()
        puzzle.renderButtons()
        puzzle.renderBoard()
        puzzle.renderPuzzle()
    }
}

puzzle.renderWeb()