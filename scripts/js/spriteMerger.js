/**
 * Pokémon Infinite Merger
 * @author Alex 'JellyMudkip'
*/

let canvas = document.querySelector('.js-mainCanvas');
let imgPath = './images/bodyParts/';
let bodyParts = {};
let selectedBodyParts = {
    'gender': 'm',
};
let modal = document.querySelector('.modal');
let animatedTrainers = document.querySelectorAll('.animatedToolbox .animated');
let gens = [
    "gen3", "gen4", "gen5"
];
let activeGenIndex = 2;
let activeModalBodyParts = [];
let modalBody = null;
let clickedElement = [];
let randomButton = null;
let stopPropagation = false;
let isMobile = true;

const checkMobile = () => {
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

const randomValue = (dataList) => {
    return dataList[Math.floor(Math.random() * dataList.length)];
}

const generateImage = (list = null, done = () => { }) => {
    let tempList = [];
    let keys = ["body", "hair", "shirt", "pants", "shoes"];

    Object.keys(list).forEach(element => {
        if (keys.includes(element)) {
            if (list[element] !== "") {
                tempList.push(imgPath + element + "/" + gens[activeGenIndex] + "/" + list[element] + ".png");
            }
        }
    });

    mergeImages(tempList)
        .then(b64 => {
            done(b64);
        });
}

const randomImageWithValues = () => {
    selectedBodyParts = {
        'gender': selectedBodyParts['gender'],
        'body': randomValue(bodyParts['body'][gens[activeGenIndex]][selectedBodyParts['gender']]),
        'pants': randomValue(bodyParts['pants'][gens[activeGenIndex]][selectedBodyParts['gender']]),
        'shirt': randomValue(bodyParts['shirt'][gens[activeGenIndex]][selectedBodyParts['gender']]),
        'hair': randomValue(bodyParts['hair'][gens[activeGenIndex]][selectedBodyParts['gender']]),
        'shoes': randomValue(bodyParts['shoes'][gens[activeGenIndex]][selectedBodyParts['gender']]),
    };

    generateImage(selectedBodyParts, (b64) => {
        randomButton.disabled = false;
        canvas.src = b64;

        animatedTrainers.forEach(element => {
            element.style.backgroundImage = 'url(' + b64 + ')';
        });
    });
}

const buttonEvents = () => {
    let saveButton = document.querySelector('.js-saveButton'),
        closeModalButton = modal.querySelector('.js-closeModal'),
        applyModalButton = modal.querySelector('.js-applyModal'),
        genSelector = document.querySelector('.js-genSelector');

    randomButton = document.querySelector('.js-randomButton')

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
            randomButton.disabled = true;

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
                let data = bodyParts[bodyPart][gens[activeGenIndex]][selectedBodyParts['gender']];

                openModal(modalTitle, bodyPart, [...data]);
            });
        } else {
            //Swap gender
            panel.addEventListener('click', () => {
                panel.classList.remove("gender_" + selectedBodyParts['gender']);

                selectedBodyParts['gender'] = selectedBodyParts['gender'] == 'm' ? 'f' : 'm';

                panel.classList.add("gender_" + selectedBodyParts['gender']);

                randomImageWithValues();
            });
        }
    });

    //Modal close button
    closeModalButton.addEventListener('click', () => closeModal());
    applyModalButton.addEventListener('click', () => {
        //Apply config
        let selectedPartConfig = modal.querySelector('.bodyPartOption.active');
        if (selectedPartConfig !== null) {
            let key = selectedPartConfig.dataset.key;
            let part = selectedPartConfig.dataset.part;

            if (key !== undefined && part !== undefined) {
                //Check if the selected part exist in the bodyPart
                let partInArray = bodyParts[key][gens[activeGenIndex]][selectedBodyParts['gender']].includes(part);
                if (partInArray || part == "") {
                    selectedBodyParts[key] = part;
                    generateImage(selectedBodyParts, (b64) => {
                        canvas.src = b64;
                        animatedTrainers.forEach(element => {
                            element.style.backgroundImage = 'url(' + b64 + ')';
                        });
                    });

                    //Close modal
                    closeModal();
                }
            }
        }

    });
    if (genSelector !== null) {
        genSelector.selectedIndex = activeGenIndex;
        genSelector.addEventListener('change', () => {
            activeGenIndex = gens.includes(gens[genSelector.selectedIndex]) ? genSelector.selectedIndex : 0;
            randomImageWithValues();
        });
    }
}

const openModal = (title = '', key = '', contentList = []) => {
    if (modal !== null) {
        let modalTitle = modal.querySelector('.modalTitle');
        modalBody = modal.querySelector('.modalBody');
        clickedElement = [];
        activeModalBodyParts = [];
        stopPropagation = false;

        modalTitle.innerHTML = title;
        modalBody.innerHTML = "";

        if (["hair", "shirt", "shoes", "pants"].includes(key)) {
            contentList.unshift(""); //Empty variation
        }

        contentList.forEach((element, index) => {
            let div = document.createElement('div');
            div.classList.add('bodyPartOption');
            if (element == "") div.classList.add('removePart');
            div.dataset.key = key;
            div.dataset.part = element;
            div.dataset.loaded = false;

            let loading = document.createElement('div');
            loading.classList.add('loading');

            let span = document.createElement('span');
            span.classList.add('animated', 'bottom', 'sticker');
            div.appendChild(span);
            div.appendChild(loading);

            modalBody.appendChild(div);

            activeModalBodyParts.push(div);

            if (element == selectedBodyParts[key]) {
                div.classList.add('active');
                clickedElement.push(div);
            }

            div.addEventListener('click', () => {
                clickedElement.forEach(element => {
                    element.classList.remove('active');
                });
        
                clickedElement.push(div);
                div.classList.add('active');
            });
        });

        rowLoading(contentList, key, modal, [...modal.querySelectorAll('.bodyPartOption')]);

        //Open modal
        modal.classList.remove('hidden');
        setTimeout(() => {
            modal.classList.add('visible');
        }, 100);
    }
}

const rowLoading = (contentList, key, modal, allElements) => {
    if (stopPropagation) return;
    
    let allElementsNotLoaded = [...modal.querySelectorAll('[data-loaded=false]')];
    let elementsToLoad = isMobile ? 12 : 24;
    let actualLoadingIndex = 0;
    let elementsToLoop = allElementsNotLoaded.slice(0, elementsToLoad);
    let tempBodyParts = { ...selectedBodyParts }; //Direct copy will also change selectedBodyPart, and we dont want that
    
    elementsToLoop.forEach(box => {
        let index = allElements.indexOf(box);

        Object.keys(tempBodyParts).forEach(item => {
            if (item == key) {
                tempBodyParts[item] = contentList[index];
                return;
            }
        });

        generateImage(tempBodyParts, (b64) => {
            box.querySelector('span').style.backgroundImage = 'url(' + b64 + ')';
            box.dataset.loaded = true;

            if(actualLoadingIndex + 1 < elementsToLoad) {
                actualLoadingIndex++;
            } else {
                setTimeout(() => {
                    rowLoading(contentList, key, modal, allElements);
                }, 100);
            }
        });
    });
}

const closeModal = () => {
    if (modal !== null) {
        stopPropagation = true;
        modal.classList.remove('visible');
        modalBody.scrollTo(0, 0);

        setTimeout(() => {
            modal.classList.add('hidden');
        }, 500);
    }
}

const init = (parts) => {
    if (parts !== null && parts !== undefined && modal !== null) {
        bodyParts = parts;

        isMobile = checkMobile();

        //Generate default random image
        randomImageWithValues();
        buttonEvents();
    }
}

export { init }