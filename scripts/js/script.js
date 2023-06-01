import * as bodyScript from './spriteMerger.js';
import * as body from './../../bodyParts.js';

let bodyScriptLoading = {};
bodyScriptLoading.doReady = () => {
    console.log(body.bodyParts);
    
    bodyScript.init(body.bodyParts);
}

document.addEventListener('DOMContentLoaded', bodyScriptLoading.doReady, false);