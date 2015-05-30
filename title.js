function setTitleFormat(titleElement) {
    var fontWeightList = [
        'lighter',
        'bolder'
    ];
    
    var fontStyleList = [
        'normal',
        'italic',
        'oblique'
    ];

    var fontFamilyList = [
        'Impact',
        'Lucida Sans Unicode',
        'Courier New',
        'Helvetica',
        'Book Antiqua'
    ];
    
    titleElement.style.fontWeight = getRandomFromArray(fontWeightList);
    titleElement.style.fontStyle = getRandomFromArray(fontStyleList);
    titleElement.style.fontFamily = getRandomFromArray(fontFamilyList);
}

function getTitle() {
    var title = 'The [X] of [Y]';
    
    var titleXList = [
        'Failure',
        'Ambition',
        'Folly',
        'Consequences',
        'Arrogance',
        'Audacity',
        'Humility',
        'Hopelessness'
        ];

    var titleYList = [
        'Meaning',
        'Humanity',
        'Existence',
        'Peace',
        'Creativity',
        'Creation'
    ];


    title = title.replace('[X]', getRandomFromArray(titleXList));
    title = title.replace('[Y]', getRandomFromArray(titleYList));
    return title;
}
