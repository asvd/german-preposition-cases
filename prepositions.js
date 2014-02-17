
/**
 * Adds a css class to the given element
 * 
 * @param {Object} el to add class for
 * @param {String} classname to add to the element
 */
function addClass( el, classname ) {
    var cn = el.className;
    //test for existance
    if( cn.indexOf( classname ) != -1 ) {
    	return;
    }
    //add a space if the el already has class
    if( cn != '' ) {
    	classname = ' '+classname;
    }
    el.className = cn+classname;
}



/**
 * Removes a css class for the given element
 * 
 * @param {Object} el to remove class for
 * @param {String} classname to remove for the element
 */
function removeClass( el, classname ) {
    var cn = el.className;
    var rxp = new RegExp( "\\s?\\b"+classname+"\\b", "g" );
    cn = cn.replace( rxp, '' );
    el.className = cn;
}



// Initializes the application
var init = function() {
    initContent();
    initPrepositions();
    next();
}



var prepositionBox,
    prepositionBoxContent,
    dativeBox,
    accusativeBox,
    genetiveBox,
    selectBox,
    selectBoxContent;

// Creates the layout
var initContent = function() {
    var body = document.getElementsByTagName('body').item(0);

    prepositionBox = document.createElement('div');
    addClass(prepositionBox, 'button');
    addClass(prepositionBox, 'preposition');
    prepositionBoxContent = document.createElement('div');
    addClass(prepositionBoxContent, 'buttonContent');
    prepositionBox.appendChild(prepositionBoxContent);
    body.appendChild(prepositionBox);
    
    dativeBox = document.createElement('div');
    dativeBox.onclick = clickDative;
    addClass(dativeBox, 'button');
    addClass(dativeBox, 'case');
    addClass(dativeBox, 'dative');
    var dativeBoxContent = document.createElement('div');
    addClass(dativeBoxContent, 'buttonContent');
    dativeBox.appendChild(dativeBoxContent);
    dativeBoxContent.innerHTML = 'Dativ';
    body.appendChild(dativeBox);
    
    accusativeBox = document.createElement('div');
    accusativeBox.onclick = clickAccusative;
    addClass(accusativeBox, 'button');
    addClass(accusativeBox, 'case');
    addClass(accusativeBox, 'accusative');
    var accusativeBoxContent = document.createElement('div');
    addClass(accusativeBoxContent, 'buttonContent');
    accusativeBox.appendChild(accusativeBoxContent);
    accusativeBoxContent.innerHTML = 'Akkusativ';
    body.appendChild(accusativeBox);
    
    genetiveBox = document.createElement('div');
    genetiveBox.onclick = clickGenetive;
    addClass(genetiveBox, 'button');
    addClass(genetiveBox, 'case');
    addClass(genetiveBox, 'genetive');
    var genetiveBoxContent = document.createElement('div');
    addClass(genetiveBoxContent, 'buttonContent');
    genetiveBox.appendChild(genetiveBoxContent);
    genetiveBoxContent.innerHTML = 'Genetiv';
    body.appendChild(genetiveBox);
    
    selectBox = document.createElement('div');
    selectBox.onclick = clickSelect;
    addClass(selectBox, 'button');
    addClass(selectBox, 'select');
    addClass(selectBox, 'hoverable');
    selectBoxContent = document.createElement('div');
    addClass(selectBoxContent, 'buttonContent');
    selectBox.appendChild(selectBoxContent);
    body.appendChild(selectBox);
}


/**
 * Button handlers
 */
var clickDative = function() {
    if ( mode == 'select' ) {
        if ( selection[0] ) {
            selection[0] = false;
            removeClass(dativeBox, 'selected');
        } else {
            selection[0] = true;
            addClass(dativeBox, 'selected');
        }
    }
}


var clickAccusative = function() {
    if ( mode == 'select' ) {
        if ( selection[1] ) {
            selection[1] = false;
            removeClass(accusativeBox, 'selected');
        } else {
            selection[1] = true;
            addClass(accusativeBox, 'selected');
        }
    }
}


var clickGenetive = function() {
    if ( mode == 'select' ) {
        if ( selection[2] ) {
            selection[2] = false;
            removeClass(genetiveBox, 'selected');
        } else {
            selection[2] = true;
            addClass(genetiveBox, 'selected');
        }
    }
}


var clickSelect = function() {
    if ( mode == 'select' ) {
        pick();
    } else {
        next();
    }
}



/**
 * Initializes the prepositions data
 */
var prepositions = [];
var initPrepositions = function() {
    var dative = [
        'aus',
        'bei',
        'mit',
        'nach',
        'von',
        'zu',
        'ab',
        'außer',
        'seit',
//        'entgegen',
//        'entsprechend',
//        'gegenüber',
//        'gemäß',
//        'zufolge',
//        'zuwider',
//        'bis zu',

        // also accusative
        'an',
        'auf',
        'in',
        'über',
        'unter',
        'vor',
        'hinter',
        'neben',
        'zwischen',
        
        // also genetive
//        'während',
//        'binnen',
        'trotz',
//        'innerhalb',
//        'längs',
//        'dank',
        'wegen'
    ];
    
    var accusative = [
        'bis',
        'durch',
        'für',
        'gegen',
        'ohne',
        'um',
//        'wider',
//        'entlang',

        // also dative
        'an',
        'auf',
        'in',
        'über',
        'unter',
        'vor',
        'hinter',
        'neben',
        'zwischen'
    ];
    
    var genetive = [
//        'ausserhalb',
//        'inmitten',
//        'oberhalb',
//        'unweit',
//        'angesichts',
//        'anstelle',
//        'aufgrund',
//        'ausschließlich',
//        'betreffs',
//        'bezüglich',
//        'einschließlich',
//        'hinsichtlich',
//        'infolge',
//        'kraft',
//        'laut',
//        'mittels',
//        'seitens',
//        'mangels',
//        'ungeachter',
//        'zuzüglich',
        
        // also dative
//        'während',
//        'binnen',
        'trotz',
//        'innerhalb',
//        'längs',
//        'dank',
        'wegen'
    ];

    var i, idx = {};

    for ( i = 0; i < dative.length; i++ ) {
        if ( typeof( idx[dative[i]] ) == 'undefined' ) {
            // adding new entry
            idx[dative[i]] = [ true, false, false ];
        } else {
            // adding case to existing entry
            idx[dative[i]][0] = true;
        }
    }

    for ( i = 0; i < accusative.length; i++ ) {
        if ( typeof( idx[accusative[i]] ) == 'undefined' ) {
            // adding new entry
            idx[accusative[i]] = [ false, true, false ];
        } else {
            // adding case to existing entry
            idx[accusative[i]][1] = true;
        }
    }

    for ( i = 0; i < genetive.length; i++ ) {
        if ( typeof( idx[genetive[i]] ) == 'undefined' ) {
            // adding new entry
            idx[genetive[i]] = [ false, false,  true ];
        } else {
            // adding case to existing entry
            idx[genetive[i]][2] = true;
        }
    }

    // converting idx to array
    for ( i in idx ) {
        if ( idx.hasOwnProperty(i) ) {
            prepositions.push({
                name : i,
                cases : idx[i]
            });
        }
    }
    
}



/**
 * Resets boxes and displays the next preposition to guess
 */
var mode = 'select';
var selection = [ false, false, false ];
var preposition = null;
var next = function() {
    mode = 'select';
    selectBoxContent.innerHTML = 'Check';
    
    removeClass(dativeBox, 'selected');
    removeClass(accusativeBox, 'selected');
    removeClass(genetiveBox, 'selected');
    removeClass(dativeBox, 'answer');
    removeClass(accusativeBox, 'answer');
    removeClass(genetiveBox, 'answer');
    removeClass(dativeBox, 'wrong');
    removeClass(accusativeBox, 'wrong');
    removeClass(genetiveBox, 'wrong');
    removeClass(dativeBox, 'correct');
    removeClass(accusativeBox, 'correct');
    removeClass(genetiveBox, 'correct');
    addClass(dativeBox, 'hoverable');
    addClass(accusativeBox, 'hoverable');
    addClass(genetiveBox, 'hoverable');

    selection = [ false, false, false ];
    
    // picking random preposition
    var newPrep = preposition;
    while ( newPrep == preposition ) {
        var num = Math.floor( Math.random() * prepositions.length );
        newPrep = prepositions[num];
    }
    preposition = newPrep;
    prepositionBoxContent.innerHTML = preposition.name;
}


var pick = function() {
    mode = 'result'
    selectBoxContent.innerHTML = 'Next';

    if ( preposition.cases[0] ) {
        addClass( dativeBox, 'answer' );
        if ( selection[0] ) {
            addClass(dativeBox,'correct');
        }
    } else if ( selection[0] ) {
        addClass( dativeBox, 'wrong' );
    }

    if ( preposition.cases[1] ) {
        addClass( accusativeBox, 'answer' );
        if ( selection[1] ) {
            addClass(accusativeBox,'correct');
        }
    } else if ( selection[1] ) {
        addClass( accusativeBox, 'wrong' );
    }

    if ( preposition.cases[2] ) {
        addClass( genetiveBox, 'answer' );
        if ( selection[2] ) {
            addClass(genetiveBox,'correct');
        }
    } else if ( selection[2] ) {
        addClass( genetiveBox, 'wrong' );
    }


    removeClass(dativeBox, 'hoverable');
    removeClass(accusativeBox, 'hoverable');
    removeClass(genetiveBox, 'hoverable');
}




window.onload = init;