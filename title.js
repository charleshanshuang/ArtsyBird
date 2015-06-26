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
        'Hopelessness',
        'Reckoning',
        'Treachery',
        'Fate',
        'Hunger',
        'Thirst',
        'Journey',
        'Struggle',
        'Persistence',
        'Desecration',
        'Birth',
        'Death'
        ];

    var titleYList = [
        'Meaning',
        'Humanity',
        'Existence',
        'Peace',
        'Creation',
        'Heaven',
        'Hell',
        'the Earth',
        'Dreams',
        'Flight',
        'Sainthood',
        'Beauty',
        'Life',
        'Justice'
    ];


    title = title.replace('[X]', getRandomFromArray(titleXList));
    title = title.replace('[Y]', getRandomFromArray(titleYList));
    return title;
}
