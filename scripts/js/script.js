import * as bodyScript from './spriteMerger.js';
import * as body from './../../bodyParts.js';

let bodyScriptLoading = {};
bodyScriptLoading.doReady = () => {    
    bodyScript.init(body.bodyParts);
}

document.addEventListener('DOMContentLoaded', bodyScriptLoading.doReady, false);