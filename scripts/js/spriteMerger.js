let canvas = document.querySelector('.js-mainCanvas');
let imgPath = './images/bodyParts/';
let bodyParts = {};
let selectedBodyParts = {
    'gender': 'm',
    'body': '',
    'hair': '',
    'pants': '',
    'shirt': '',
    'shoes': '',
};
let modal = document.querySelector('.modal');
let animatedTrainers = document.querySelectorAll('.animatedToolbox .animated');
let gens = [
    "gen3", "gen4", "gen5"
];
let activeGen = 2;

const randomValue = (dataList) => {
    return dataList[Math.floor(Math.random() * dataList.length)];
}

const generateImage = (list = null, done = () => { }) => {
    let tempList = [];
    let keys = ["body", "hair", "shirt", "pants"];

    Object.keys(list).forEach(element => {
        if (keys.includes(element)) {
            if(list[element] !== "") {
                tempList.push(imgPath + element + "/" + gens[activeGen] + "/" + list[element] + ".png");
            }
        }
    });

    //add loading
    mergeImages(tempList)
        .then(b64 => {
            done(b64);
        });
}

const randomImageWithValues = () => {
    selectedBodyParts = {
        'gender': selectedBodyParts['gender'],
        'body': randomValue(bodyParts['body'][gens[activeGen]][selectedBodyParts['gender']]),
        'hair': randomValue(bodyParts['hair'][gens[activeGen]][selectedBodyParts['gender']]),
        'pants': randomValue(bodyParts['pants'][gens[activeGen]][selectedBodyParts['gender']]),
        'shirt': randomValue(bodyParts['shirt'][gens[activeGen]][selectedBodyParts['gender']]),
        'shoes': randomValue(bodyParts['shoes'][gens[activeGen]]),
    };

    generateImage(selectedBodyParts, (b64) => {
        canvas.src = b64;

        animatedTrainers.forEach(element => {
            element.style.backgroundImage = 'url(' + b64 + ')';
        });
    });
}

const buttonEvents = () => {
    let saveButton = document.querySelector('.js-saveButton'),
        randomButton = document.querySelector('.js-randomButton'),
        closeModalButton = modal.querySelector('.js-closeModal'),
        applyModalButton = modal.querySelector('.js-applyModal'),
        genSelector = document.querySelector('.js-genSelector')

    //Save image
    if (saveButton !== null && canvas !== null) {
        saveButton.addEventListener('click', async () => {
            const image = await fetch(canvas.src);
            const imageBlog = await image.blob();
            const imageURL = URL.createObjectURL(imageBlog);

            const link = document.createElement('a');
            link.href = imageURL;
            link.download = 'PokemonTrainer_' + Date.now();
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
    //Random character
    if (randomButton !== null) {
        randomButton.addEventListener('click', () => {
            randomImageWithValues();
        });
    }

    //Body part panel events
    let panels = document.querySelectorAll('.bodyPart');
    panels.forEach(panel => {
        if (!panel.classList.contains("bodyPartGender")) {
            panel.addEventListener('click', () => {
                let modalTitle = panel.dataset.modalTitle !== undefined ? panel.dataset.modalTitle : '';
                let bodyPart = panel.dataset.part !== undefined ? panel.dataset.part.toLowerCase() : '';
                let data = bodyParts[bodyPart][gens[activeGen]][selectedBodyParts['gender']];

                openModal(modalTitle, bodyPart, [...data]);
            });
        } else {
            //swap gender
            panel.addEventListener('click', () => {
                panel.classList.remove("gender_" + selectedBodyParts['gender']);

                selectedBodyParts['gender'] = selectedBodyParts['gender'] == 'm' ? 'f' : 'm';

                panel.classList.add("gender_" + selectedBodyParts['gender']);

                randomImageWithValues();
            });
        }
    });

    //modal close button
    closeModalButton.addEventListener('click', () => closeModal());
    applyModalButton.addEventListener('click', () => {
        //apply config
        let selectedPartConfig = modal.querySelector('.bodyPartOption.active');
        if (selectedPartConfig !== null) {
            let key = selectedPartConfig.dataset.key;
            let part = selectedPartConfig.dataset.part;

            if (key !== undefined && part !== undefined) {
                //check if the selected part exist in the bodyPart
                let partInArray = bodyParts[key][gens[activeGen]][selectedBodyParts['gender']].includes(part);
                if (partInArray || part == "") {
                    selectedBodyParts[key] = part;
                    generateImage(selectedBodyParts, (b64) => {
                        canvas.src = b64;
                        animatedTrainers.forEach(element => {
                            element.style.backgroundImage = 'url(' + b64 + ')';
                        });
                    });
                    //close modal
                    closeModal();
                }
            }
        }

    });
    if (genSelector !== null) {
        genSelector.selectedIndex = activeGen;
        genSelector.addEventListener('change', () => {
            activeGen = gens.includes(gens[genSelector.selectedIndex]) ? genSelector.selectedIndex : 0;
            randomImageWithValues();
        });
    }
}

const openModal = (title = '', key = '', contentList = []) => {
    if (modal !== null) {
        let modalTitle = modal.querySelector('.modalTitle');
        let modalBody = modal.querySelector('.modalBody');
        let clickedElement = [];

        //set content
        modalTitle.innerHTML = title;
        modalBody.innerHTML = "";

        if(["hair", "shirt", "shoes", "pants"].includes(key)) {
            contentList.unshift(""); //ADD EMPTY VARIATION, FOR NOT WEARING A PART
        }

        contentList.forEach(element => {
            let tempBodyParts = {...selectedBodyParts}; //direct copy will also change selectedBodyPart, and we dont want that
            let div = document.createElement('div');
            div.classList.add('bodyPartOption');
            if (element == "") div.classList.add('removePart');
            div.dataset.key = key;
            div.dataset.part = element;

            let span = document.createElement('span');
            span.classList.add('animated', 'bottom', 'sticker');
            div.appendChild(span);

            Object.keys(tempBodyParts).forEach(item => {
                if (item == key) {
                    tempBodyParts[item] = element;
                }
            });

            if(tempBodyParts[key] == selectedBodyParts[key]) {
                div.classList.add('active');
                clickedElement.push(div);
            }

            generateImage(tempBodyParts, (b64) => {
                span.style.backgroundImage = 'url(' + b64 + ')';
            });

            //paste div into modal
            modalBody.appendChild(div);

            div.addEventListener('click', () => {
                clickedElement.forEach(element => {
                    element.classList.remove('active');
                });

                clickedElement.push(div);
                div.classList.add('active');
            });
        });

        //open modal
        modal.classList.remove('hidden');
        setTimeout(() => {
            modal.classList.add('visible');
        }, 100);
    }
}

const closeModal = () => {
    if (modal !== null) {
        modal.classList.remove('visible');

        setTimeout(() => {
            modal.classList.add('hidden');
        }, 500);
    }
}

const init = (parts) => {
    if (parts !== null && parts !== undefined && modal !== null) {
        bodyParts = parts;

        //Generate default random image
        randomImageWithValues();
        buttonEvents();
    }
}

export { init }