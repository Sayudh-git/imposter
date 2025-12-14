export type GameWord = {
    word: string;
    category: string;
    hints: [string, string, string, string, string]; // Exactly 5 hints
    difficulty: 'easy' | 'medium' | 'hard';
};

export const GAME_DICTIONARY: GameWord[] = [
    // LANDMARKS
    {
        word: 'Victoria Memorial',
        category: 'Landmark',
        hints: [
            'Built for a queen who never visited',
            'Couples hide behind the bushes here',
            'White marble that glows at sunset',
            'Gardens where students skip college',
            'The building has 40,000 square feet',
        ],
        difficulty: 'medium',
    },
    {
        word: 'Howrah Bridge',
        category: 'Landmark',
        hints: [
            'No nuts and bolts were used',
            'Nicknamed after a goddess',
            'Busiest cantilever in the world',
            'You hear hawkers louder than cars',
            'Connects two railway stations',
        ],
        difficulty: 'medium',
    },

    // FOOD & DRINKS
    {
        word: 'Old Monk',
        category: 'Beverage',
        hints: [
            'The national drink of heartbroken engineers',
            'Vanilla-flavored companion',
            'Comes in a dark bottle with a monk',
            'Tastes better than it smells',
            'Best served with Thums Up',
        ],
        difficulty: 'hard',
    },
    {
        word: 'Kathi Roll',
        category: 'Food',
        hints: [
            'Born on Park Street in 1932',
            'Wrapped street food genius',
            'Nizam is the OG maker',
            'You eat it while standing',
            'Egg paratha hugs the filling',
        ],
        difficulty: 'medium',
    },
    {
        word: 'Mughlai Paratha',
        category: 'Food',
        hints: [
            'Egg oozes when you cut it',
            'Not actually Mughal in origin',
            'Keema lurks inside',
            'Crispy, flaky, and sinful',
            'Served with a kasundi dip',
        ],
        difficulty: 'medium',
    },
    {
        word: 'Mishti Doi',
        category: 'Dessert',
        hints: [
            'Served in earthen pots',
            'Originated in Bogra',
            'Caramelized sweetness',
            'You lick the clay pot after',
            'Best eaten chilled from Balaram',
        ],
        difficulty: 'hard',
    },

    // CULTURE & LIFESTYLE
    {
        word: 'Yellow Taxi',
        category: 'Transport',
        hints: [
            'Refuses to use GPS or Google Maps',
            'The meter is just decoration',
            'Iconic Ambassador car',
            'Will bargain more than a fish seller',
            'Drivers know every shortcut',
        ],
        difficulty: 'easy',
    },
    {
        word: 'Tram',
        category: 'Transport',
        hints: [
            'Slowest way to get anywhere',
            'Runs on Esplanade and Gariahat routes',
            'Heritage on wheels',
            'Ding-ding sound at every stop',
            'Costs only ₹5-7 per ride',
        ],
        difficulty: 'medium',
    },
    {
        word: 'Durga Puja',
        category: 'Festival',
        hints: [
            '5-day city shutdown',
            'Pandal-hopping marathon',
            'Dhakis play beats',
            'Everyone wears new clothes',
            'Ends with Bijoya Dashami',
        ],
        difficulty: 'easy',
    },
    {
        word: 'College Street',
        category: 'Location',
        hints: [
            'Largest book market in Asia',
            'Indian Coffee House nearby',
            'Students haggle for used textbooks',
            'Smells like old paper and chai',
            'Presidency University is here',
        ],
        difficulty: 'medium',
    },

    // HARD MODE (Desi Slang & Niche)
    {
        word: 'Adda',
        category: 'Culture',
        hints: [
            'Can last 4 hours without agenda',
            'Involves endless cups of cha',
            'Topics: politics, cricket, exes',
            'Usually happens at street corners',
            'The art of doing nothing productively',
        ],
        difficulty: 'hard',
    },
    {
        word: 'Rosogolla',
        category: 'Dessert',
        hints: [
            'Bengal vs Odisha battlefield',
            'Spongy, syrupy, white spheres',
            'KC Das is the inventor',
            'Dunked in sugar syrup',
            'GI tag controversy',
        ],
        difficulty: 'medium',
    },
    {
        word: 'Kalighat Painting',
        category: 'Art',
        hints: [
            'Bold lines, minimal colors',
            'Pat style from the 19th century',
            'Depicts gods and social satire',
            'Sold near Kali temple',
            'Folk art on cloth',
        ],
        difficulty: 'hard',
    },
    {
        word: 'Sandesh',
        category: 'Dessert',
        hints: [
            'Made from chhena',
            'Nolen gur version is legendary',
            'Comes in various flavors',
            'Shaped like fish or flowers',
            'Not as sweet as rasgulla',
        ],
        difficulty: 'medium',
    },
    {
        word: 'Phuchka',
        category: 'Street Food',
        hints: [
            'You eat 10 and still want more',
            'Tamarind water is the soul',
            'Crispy shells filled with chaos',
            'Vivekananda Road is famous for it',
            'Don\'t call it golgappa here',
        ],
        difficulty: 'easy',
    },
    {
        word: 'Maidan',
        category: 'Location',
        hints: [
            'Lungs of Kolkata',
            'Where cricket meets morning walks',
            'Grazing horses freely roam',
            'Massive open green space',
            'Hosts the Book Fair no more',
        ],
        difficulty: 'medium',
    },
    {
        word: 'Eden Gardens',
        category: 'Landmark',
        hints: [
            'The Mecca of Indian Cricket',
            'Witnessed VVS Laxman\'s 281',
            'Capacity of over 60,000',
            'Established in 1864',
            'Near the High Court',
        ],
        difficulty: 'easy',
    },
    {
        word: 'Dakshineswar Kali Temple',
        category: 'Religious',
        hints: [
            'Built by Rani Rashmoni',
            'Ramakrishna Paramhansa lived here',
            'Located on the Hooghly riverbank',
            'Bhavatarini resides here',
            'Famous for its 12 Shiva shrines',
        ],
        difficulty: 'medium',
    },
    {
        word: 'South City Mall',
        category: 'Shopping',
        hints: [
            'One of the largest malls in East India',
            'Located in Jadavpur area',
            'Has a massive food court',
            'PVR IMAX is a key attraction',
            'Opened in 2008',
        ],
        difficulty: 'easy',
    },
    {
        word: 'Science City',
        category: 'Attraction',
        hints: [
            'Largest science center in the subcontinent',
            'Has a Space Odyssey theater',
            'Famous for the Evolution Park',
            'On the EM Bypass',
            'School picnic favorite',
        ],
        difficulty: 'medium',
    },
    {
        word: 'Netaji Subhas Chandra Bose',
        category: 'Historical Figure',
        hints: [
            'Gave the slogan Tum mujhe khoon do',
            'Established Azad Hind Fauj',
            'Death mystery still unsolved',
            'Statue at Red Road crossing',
            'Birthday celebrated as Parakram Diwas',
        ],
        difficulty: 'medium',
    },
    {
        word: 'Satyajit Ray',
        category: 'Cinema',
        hints: [
            'Oscar for Lifetime Achievement',
            'Created Feluda and Professor Shonku',
            'Pather Panchali was his debut',
            'Goopy Gyne Bagha Byne director',
            'The Apu Trilogy creator',
        ],
        difficulty: 'medium',
    },
    {
        word: 'Park Street',
        category: 'Location',
        hints: [
            'Christmas season lighting festival',
            'Mother House of Calcutta',
            'Flury\'s is an iconic bakery here',
            'Officially named Mother Teresa Sarani',
            'Nightlife and pubs central',
        ],
        difficulty: 'easy',
    },
    {
        word: 'Ilish Maach',
        category: 'Food',
        hints: [
            'The king of Bengali fish',
            'Best during monsoon season',
            'Has 46 bones you must pick',
            'Bhapa and Paturi are popular styles',
            'Causes Bengalis to weep with joy',
        ],
        difficulty: 'medium',
    },
    {
        word: 'Pujo',
        category: 'Culture',
        hints: [
            'The only acceptable abbreviation',
            'Starts with Mahalaya morning',
            'Pandal hopping is mandatory',
            'Dhunuchi naach is iconic',
            'Short for Durga Puja',
        ],
        difficulty: 'easy',
    },
    {
        word: 'Mamata Banerjee',
        category: 'Politics',
        hints: [
            'First female CM of West Bengal',
            'Founded Trinamool Congress',
            'Wears white saree and slippers',
            'Known for fiery speeches',
            'Nickname: Didi',
        ],
        difficulty: 'easy',
    },
    {
        word: 'Jyoti Basu',
        category: 'Politics',
        hints: [
            'Longest serving Indian CM',
            'Led Left Front for 23 years',
            'Declined PM position in 1996',
            'Known for precise articulation',
            'CPI(M) stalwart',
        ],
        difficulty: 'hard',
    },
    {
        word: 'Metro Railway',
        category: 'Transport',
        hints: [
            'First underground in India',
            'Started operations in 1984',
            'Esplanade to Dumdum route',
            'Air conditioned lifesaver',
            'Runs from Kavi Subhash to various lines',
        ],
        difficulty: 'easy',
    },
    {
        word: 'Princep Ghat',
        category: 'Landmark',
        hints: [
            'Gothic memorial on Hooghly bank',
            'Popular evening hangout',
            'Boat rides available',
            'Instagram favorite spot',
            'James Prinsep memorial',
        ],
        difficulty: 'medium',
    },
    {
        word: 'Bhooter Raja Dilo Bor',
        category: 'Culture',
        hints: [
            'Famous Bengali idiom',
            'Means unexpected good fortune',
            'Literally: Ghost king gave blessing',
            'Used when luck strikes',
            'Satyajit Ray film reference',
        ],
        difficulty: 'hard',
    },
    {
        word: 'Arsenic',
        category: 'Politics',
        hints: [
            'West Bengal groundwater crisis',
            'Contamination in tube wells',
            'Major health hazard',
            'Green markings indicate unsafe pumps',
            'Affected millions in rural areas',
        ],
        difficulty: 'hard',
    },
    {
        word: 'Chingri Malai Curry',
        category: 'Food',
        hints: [
            'Prawn cooked in coconut milk',
            'Wedding feast essential',
            'Sweet and creamy curry',
            'Served with steamed rice',
            'Golda chingri preferred',
        ],
        difficulty: 'medium',
    },
    {
        word: 'Priya Cinema',
        category: 'Entertainment',
        hints: [
            'Iconic Deshapriya Park theatre',
            'Known for Bollywood premieres',
            'Food court and shopping nearby',
            'Multiplex in South Kolkata',
            'Popular date spot',
        ],
        difficulty: 'medium',
    },
    {
        word: 'Dakaar',
        category: 'Slang',
        hints: [
            'Means calling someone loudly',
            'Shout to get attention',
            'Typically done from balcony',
            'Used in street cricket',
            'Bengali for holler',
        ],
        difficulty: 'hard',
    },
    {
        word: 'Ghoti vs Bangal',
        category: 'Culture',
        hints: [
            'Age-old Bengali rivalry',
            'Fish curry pronunciation differs',
            'East vs West Bengal divide',
            'Partition created the split',
            'Friendly banter topic',
        ],
        difficulty: 'medium',
    },
    {
        word: 'New Market',
        category: 'Shopping',
        hints: [
            'Historic shopping complex',
            'Hogg Market official name',
            'Bargaining is essential',
            'Everything available under one roof',
            'Christmas shopping destination',
        ],
        difficulty: 'easy',
    },
];

export const getRandomWord = (): GameWord => {
    return GAME_DICTIONARY[Math.floor(Math.random() * GAME_DICTIONARY.length)];
};
