// Mock data for Tavern Tales

// Categories of tales
const taleCategories = [
    { id: 'story', name: 'Stories' },
    { id: 'poem', name: 'Poems' },
    { id: 'song', name: 'Songs' },
    { id: 'video', name: 'Visual Chronicles' },
    { id: 'interactive', name: 'Interactive Tales' }
];

// Mock tales data
const talesData = [
    {
        slug: 'whispers-of-the-goblin-court',
        title: 'Whispers of the Goblin Court',
        type: 'Story',
        category: 'story',
        date: 'Full Moon of Autumn',
        author: 'The Keeper of Keys',
        excerpt: 'Strange chittering echoes from the cellar. The barmaid mentions chess pieces moving of their own accord after midnight.',
        coverImage: '/images/tales/goblin-chess.png',
        featured: true,
        tags: ['goblin', 'mystery', 'tavern', 'magic'],
        content: `
            <p>The first time I heard the chittering, I assumed it was mice. All taverns have mice, especially in winter when the cold drives them indoors. But mice don't play chess.</p>

            <p>It was Mellie, the new serving girl, who first mentioned the chess pieces. "They move at night," she whispered, eyes darting to the old chess set in the corner. "I came down early to stoke the fire, and they were all arranged differently than the night before."</p>

            <p>I laughed it off. Drunken patrons must have fiddled with the board after closing. But then I started to notice other oddities – tiny footprints in the flour bin, small trinkets going missing only to reappear days later polished to a shine.</p>

            <p class="journal-entry">Tonight I've decided to stay after closing. I've dimmed all lanterns but one, and hidden myself behind the large keg in the corner with a clear view of the chess set. The tavern feels different at night – the shadows deeper, the creaks more deliberate.</p>

            <p>Midnight came and went. I was beginning to think I'd wasted my time when I heard it – a soft, musical chittering from beneath the floorboards. At first, just one voice, then another answered, then three or four more joined in what seemed like a heated debate.</p>

            <p>I held my breath as the loose floorboard near the hearth shifted upward. A tiny green hand appeared, pushing it aside. Then a pointed face emerged, with large amber eyes that gleamed in the low light as they carefully surveyed the room.</p>

            <p>One by one, they emerged – twelve goblins, each no taller than my forearm, dressed in motley garments that appeared to be stitched from discarded scraps of fabric left by patrons. Some wore thimbles as hats, others had buttons sewn into their clothes as decorations.</p>

            <p class="journal-entry">They didn't notice me. They moved with purpose toward the chess set, arguing in their strange language. The apparent leader – distinguished by a crown fashioned from a tarnished fork – gestured emphatically at the board.</p>

            <p>What followed was nothing short of a royal court in session. They arranged the chess pieces to form a circle, with the white and black kings facing each other in the center. The goblins took positions around the board, some clearly serving as advisors, others as guards.</p>

            <p>Disputes were settled by moving specific chess pieces. When two goblins disagreed, each would move a knight or bishop, and the leader would judge which position was stronger. The loser would bow with exaggerated deference, sometimes performing a little dance of apology.</p>

            <p>For hours I watched their strange governance, their tiny hands gesturing, their voices rising and falling. They brought out tiny scrolls, consulted them seriously, and made proclamations that sent others scurrying to different parts of the tavern.</p>

            <p>Just before dawn, one goblin pulled a small silver bell from its pocket – I recognized it as the one missing from Mellie's charm bracelet. The leader rang it three times, and immediately the court session ended. They carefully rearranged the chess pieces into a traditional starting position, though I noticed they deliberately reversed the positions of one white bishop and knight.</p>

            <p class="journal-entry">As they filed back toward their hidden entrance, the leader paused, turning slowly in my direction. For a heart-stopping moment, those amber eyes seemed to pierce my hiding place. A slow smile spread across the goblin's face, revealing pointed teeth. It raised one tiny finger to its lips, then winked before disappearing beneath the floorboard.</p>

            <p>I've told no one what I saw. But I've started leaving small offerings by the chess set at night – thimbles of honey, colorful buttons, tiny scraps of fine cloth. In return, the goblin court has been kind. Lost items reappear, the hearth fire never goes out on cold nights, and somehow the ale in the troublesome third barrel no longer turns sour.</p>

            <p>And sometimes, when a patron is having particularly bad luck at the chess board, I notice a tiny green hand emerge from a crack in the wainscoting, pointing briefly toward a better move.</p>

            <p class="signature">- From the private journal of Malwin Pike, Proprietor of the Silver Tankard Tavern</p>
        `,
        mediaType: null,
        mediaContent: null
    },
    {
        slug: 'ballad-of-the-wandering-knight',
        title: 'Ballad of the Wandering Knight',
        type: 'Poem',
        category: 'poem',
        date: 'Midwinter Night',
        author: 'Whispers on the Wind',
        excerpt: 'A poetic tale of a knight who forsook his vows for love, only to wander eternally searching for his lost beloved across countless realms.',
        coverImage: '/images/tales/knight-mirror.png',
        featured: true,
        tags: ['knight', 'love', 'tragedy', 'realms'],
        content: `
            <div class="poem">
                <div class="verse">
                    His armor gleams no more in lunar light,<br>
                    Tarnished by time and sorrow's heavy hand.<br>
                    The Wandering Knight walks paths 'tween day and night,<br>
                    Searching for doors to worlds he cannot understand.
                </div>

                <div class="verse">
                    He broke an oath sworn to his sovereign lord,<br>
                    For love of one whose eyes held twilight's glow.<br>
                    He dropped his shield and sheathed his loyal sword,<br>
                    And followed her where mortals dare not go.
                </div>

                <div class="verse">
                    Through mist they walked, her hand in his, so warm,<br>
                    Into a land where stars hung low enough to touch.<br>
                    She spoke of wonders, safe from earthly harm,<br>
                    But failed to warn of those who envied much.
                </div>

                <div class="verse">
                    The Boundary Keepers came with chains of law,<br>
                    "No mortal flesh may tread immortal ground."<br>
                    They bound her form, and through a door of awe,<br>
                    They pulled her back while reality unwound.
                </div>

                <div class="verse">
                    He lunged and grasped, his fingers brushing hers,<br>
                    But all too late - the doorway sealed its face.<br>
                    Now doomed between the was and what occurs,<br>
                    The knight walks on through neither time nor space.
                </div>

                <div class="verse">
                    In taverns perched on edges of the known,<br>
                    He stops to rest and asks of golden eyes.<br>
                    His coin is strange, his tongue of ancient tone,<br>
                    He drains his cup and to the darkness flies.
                </div>

                <div class="verse">
                    If e'er you see a silhouette of grace,<br>
                    A warrior stooped by weight no eye can see,<br>
                    Leave out your strangest cup, your foreign lace,<br>
                    And wisdom of the spaces in-between.
                </div>

                <div class="verse">
                    For kindness to the Knight who wanders still,<br>
                    Brings fortune to the threshold where he stood.<br>
                    And stories say his lady watches, until<br>
                    The day he finds the door of burnished wood.
                </div>
            </div>

            <p class="collector-notes">
                This ballad was transcribed from the recitation of a hooded stranger who paid for a night's lodging with a coin of unknown metal that changed color with the phases of the moon. The stranger departed before dawn, leaving behind only this verse written on parchment that seems to glow faintly in the darkness.
            </p>
        `,
        mediaType: null,
        mediaContent: null
    },
    {
        slug: 'scales-of-forgotten-songs',
        title: 'Scales of Forgotten Songs',
        type: 'Song',
        category: 'song',
        date: 'Summer Solstice',
        author: 'The Verdant Minstrel',
        excerpt: 'A collection of melodies said to have been taught to a minstrel by the ancient dragons during a chance encounter in the misty mountains.',
        coverImage: '/images/tales/dragon-wizard-music.png',
        featured: false,
        tags: ['dragon', 'music', 'ancient', 'memory'],
        content: `
            <p>The following songs were collected during my travels through the Mistpeak Mountains. I encountered an old minstrel who claimed to have spent three days in the company of the last dragon elders. In exchange for amusing them with human songs, they taught him melodies from the dawn of time.</p>

            <p>Whether his tale is true or merely the fancy of a creative mind, the songs themselves possess an otherworldly quality. When played correctly, listeners report sensations of memories that do not belong to them - glimpses of ancient forests, vast open skies, and the feeling of wind beneath great wings.</p>

            <div class="song-entry">
                <h3>The Hatching Day</h3>
                <p class="song-description">A gentle, climbing melody that mimics the struggle of a wyrmling breaking free from its shell. The song begins tentatively, with hesitant notes that grow progressively more confident and joyful.</p>

                <div class="music-player">
                    <p>Traditional notation available in the appendix. The minstrel insisted that a crucial element of the performance involves a specific humming technique while playing, creating an effect of multiple voices.</p>
                </div>

                <p>When performed at the spring equinox, witnesses describe feeling momentarily weightless during the song's final crescendo, as if gravity briefly relinquishes its hold.</p>
            </div>

            <div class="song-entry">
                <h3>Flight Above the Ancient Sea</h3>
                <p class="song-description">A soaring, dynamic piece that alternates between powerful, driving sections and delicate, gliding passages. The melody seems to defy conventional musical structure, with time signatures that shift unexpectedly.</p>

                <div class="music-player">
                    <p>This piece requires at least two performers. The minstrel claimed it is merely a simplified version of the original, which would require "a voice with three tongues" to perform authentically.</p>
                </div>

                <p>Listeners commonly report the taste of salt on their lips and the sensation of great height during performances. On one documented occasion, a circle of small objects in the room began to float several inches above the ground while the song was played.</p>
            </div>

            <div class="song-entry">
                <h3>The Last Ember's Lament</h3>
                <p class="song-description">A mournful dirge that begins with a single, sustained note that gradually splinters into a complex tapestry of interweaving melodies. The piece feels both ancient and deeply sorrowful.</p>

                <div class="music-player">
                    <p>The minstrel refused to play this piece after sunset, claiming it was "ill-advised to remind the night of what it has lost."</p>
                </div>

                <p>During the performance I witnessed, every flame in the room - from candles to the hearth fire - dimmed to a bare ember, only to surge back to full brightness on the final note. The minstrel seemed unsurprised by this effect.</p>
            </div>

            <p class="warning">
                Caution is advised for musicians attempting to perform these pieces. The minstrel warned that the songs were not meant for human voices or instruments, and that persistent performance may cause "the thinning of boundaries best left thick." He himself had stopped performing the complete cycle after experiencing a period of three days which he could not account for.
            </p>

            <p class="collector-notes">
                I have deposited the complete transcriptions with the Conservatory of Mystical Arts. They may be viewed with permission from the Grand Archivist, but may not be removed from the premises. The minstrel himself disappeared during my return journey through the mountains. Local guides suggested he had "gone to return the songs to their rightful owners."
            </p>
        `,
        mediaType: 'audio',
        mediaContent: '/audio/dragon-melody-sample.mp3'
    },
    {
        slug: 'riddles-in-the-dark',
        title: 'Riddles in the Dark',
        type: 'Interactive',
        category: 'interactive',
        date: 'New Moon Night',
        author: 'The Veiled Oracle',
        excerpt: 'A collection of riddles said to reveal secrets of the tavern to those clever enough to solve them. Some say the answers change when no one is watching.',
        coverImage: '/images/tales/riddles-in-the-dark.jpg',
        featured: false,
        tags: ['riddles', 'mystery', 'secrets', 'interactive'],
        content: `
            <p>The following riddles were found scratched into the underside of a table in the darkest corner of the Treasure Tavern. According to the bartender, no one knows when they appeared or who carved them. Those who solve all five correctly may notice strange coincidences in the days that follow...</p>

            <div class="riddle">
                <h3>The First Riddle</h3>
                <p class="riddle-text">
                    I am not alive, yet I grow;<br>
                    I don't have lungs, yet I need air;<br>
                    I don't have a mouth, yet I can be fed;<br>
                    I can die without ever truly living.<br>
                    What am I?
                </p>
                <p class="riddle-hint">Look to the hearth for your answer.</p>
                <p class="riddle-answer hidden">Fire</p>
            </div>

            <div class="riddle">
                <h3>The Second Riddle</h3>
                <p class="riddle-text">
                    Born in the mountains, dying in a glass;<br>
                    I can bring joy or sorrow;<br>
                    Wisdom or folly;<br>
                    Truth or lies;<br>
                    The more of me you drink, the more I speak.<br>
                    What am I?
                </p>
                <p class="riddle-hint">The answer flows freely in this establishment.</p>
                <p class="riddle-answer hidden">Wine (or ale)</p>
            </div>

            <div class="riddle">
                <h3>The Third Riddle</h3>
                <p class="riddle-text">
                    I travel the world while staying in my corner;<br>
                    I am covered with scars yet never wounded;<br>
                    I have countless stories but cannot speak;<br>
                    I've seen many lives, yet I'm not alive.<br>
                    What am I?
                </p>
                <p class="riddle-hint">Look to where adventurers share their tales.</p>
                <p class="riddle-answer hidden">Map</p>
            </div>

            <div class="riddle">
                <h3>The Fourth Riddle</h3>
                <p class="riddle-text">
                    I have keys but no locks;<br>
                    I have space but no room;<br>
                    You can enter but not go in.<br>
                    What am I?
                </p>
                <p class="riddle-hint">The bard in the corner uses one.</p>
                <p class="riddle-answer hidden">Keyboard (or piano)</p>
            </div>

            <div class="riddle">
                <h3>The Fifth Riddle</h3>
                <p class="riddle-text">
                    I am always hungry, I must always be fed;<br>
                    The finger I touch will soon turn red;<br>
                    I have no legs but travel widely;<br>
                    Where I go, darkness follows.<br>
                    What am I?
                </p>
                <p class="riddle-hint">When I dance upon the walls, shadows bow to my movements.</p>
                <p class="riddle-answer hidden">Fire (or flame)</p>
            </div>

            <p class="note">
                Those who've solved all five riddles report seeing small, unexpected gifts appear in their rooms - a single perfect flower that never wilts, a coin from a kingdom no one recognizes, or a key that fits no known lock but feels strangely important to keep.
            </p>

            <p class="closing-note">
                The bartender smiles knowingly when asked about these occurrences but will only say, "The Tavern rewards those who pay attention to its secrets."
            </p>
        `,
        mediaType: 'interactive',
        mediaContent: 'riddles'
    },
    {
        slug: 'twilight-of-the-forest-guardians',
        title: 'Twilight of the Forest Guardians',
        type: 'Video',
        category: 'video',
        date: 'Spring Equinox',
        author: 'The Silent Observer',
        excerpt: 'A visual chronicle capturing the rarely-seen ritual of the ancient forest guardians as they prepare for the changing of the seasons.',
        coverImage: '/images/tales/twilight-of-the-forest-guardians.jpg',
        featured: true,
        tags: ['forest', 'guardians', 'ritual', 'seasons'],
        content: `
            <p>The following footage was captured during an expedition into the heart of the Whispering Woods, a forest said to be protected by entities as old as the land itself. For centuries, travelers have reported glimpses of tall, antlered figures moving among the trees at dawn and dusk, but full documentation has remained elusive.</p>

            <p>After three seasons of careful observation and gradual movement deeper into the forest, I was permitted (I use this word deliberately) to witness and record the Equinox Gathering - a ritual performed only twice yearly when the balance between day and night achieves perfect harmony.</p>

            <p class="journal-entry">I set up my equipment in a hollow surrounded by ancient oak trees. The forest had led me here through subtle means - paths that appeared where none had been before, birds that seemed to fly in unnatural patterns beckoning me forward, and finally a deer with eyes too knowing to be merely animal, which stood watching me until I followed.</p>

            <p>What you will witness in this recording are the Forest Guardians - beings neither fully plant nor animal, but embodiments of the forest's consciousness. They gather in a circle, their bark-like skin illuminated by bioluminescent fungi that activate only during the equinox. Their movements are deliberate and ritual, seemingly a form of communication with the forest itself.</p>

            <p>The ritual lasted from sunset to sunrise. During this time, I observed:</p>

            <ul>
                <li>The Guardians forming concentric circles, moving in opposite directions</li>
                <li>A harmonic humming that caused nearby plants to visibly grow</li>
                <li>The exchange of what appeared to be seeds or crystalline structures</li>
                <li>The burial of objects at the cardinal points of the clearing</li>
                <li>A moment at exact astronomical midnight when all Guardians became completely still, their antlers aligned perfectly with celestial bodies</li>
            </ul>

            <p class="warning">
                I must emphasize that this footage is shared with the permission of the Forest Guardians themselves. At dawn, the eldest among them approached my position (which I had believed was hidden) and made a gesture of acknowledgment. I interpreted this as consent to share what I had witnessed, with the understanding that the precise location would remain undisclosed.
            </p>

            <p>Viewers may notice moments where the footage becomes distorted or where impossible geometries seem to appear in the background. These are not artifacts of recording but appear to be genuine aspects of the Guardians' realm that our perception struggles to interpret.</p>

            <p class="final-note">
                Since my return, I have noticed subtle changes - plants respond to my presence more actively, and I often find seedlings sprouting along paths I frequently walk. I believe the Guardians have recognized our world's need for their ancient knowledge, and this recording serves as both documentation and invitation to remember our connection to the primeval forces of nature.
            </p>
        `,
        mediaType: 'video',
        mediaContent: 'https://www.youtube.com/embed/example-forest-guardians'
    },
    {
        slug: 'whispers-of-the-void',
        title: 'Whispers of the Void',
        type: 'Story',
        category: 'story',
        date: 'Dark of the Moon',
        author: 'Anonymous',
        excerpt: 'A tale told by a traveler who claimed to have walked the space between stars and returned with memories of conversations with entities from beyond the veil.',
        coverImage: '/images/tales/goblin-infestation.png',
        featured: false,
        tags: ['void', 'stars', 'cosmic', 'entities'],
        content: `
            <p>I never intended to walk between the stars. The path opened before me on a night when the sky was absolute in its darkness - no moon, no starlight, as though the universe had momentarily forgotten to exist.</p>

            <p>I had taken shelter in a cave during my travels through the northern mountains. The storm outside had obliterated all light, and I had resigned myself to waiting until morning. It was then that I noticed the back of the cave did not end but rather... shifted. The darkness there moved differently than mere shadows should.</p>

            <p class="journal-entry">I approached cautiously, torch extended. Instead of illuminating stone, my light seemed to disappear into the darkness, consumed without reflection. Curiosity overcame caution. I reached out my hand and felt nothing - no cool stone, no draft, simply an absence. And then I was falling.</p>

            <p>Except falling implies direction, and there was none. I existed in a place between places, where light was visible as currents and streams rather than illumination. I drifted among constellations that formed and dissipated like thoughts, and gradually became aware that I was not alone.</p>

            <p>They noticed me as one might notice an insect - with distant curiosity but little concern. Their forms were suggestions rather than substance, impressions that my mind interpreted as vaguely humanoid only because it could not comprehend their true nature.</p>

            <p>Communication came not in words but in concepts that bloomed directly within my consciousness. They were travelers, observers, collectors of experiences. They existed in the margins between realities, neither fully part of any world nor completely separate from them all.</p>

            <p class="journal-entry">One entity approached closer than the others. It examined me with what I interpreted as fascination, though such emotional attributions are likely meaningless. It shared with me glimpses of countless worlds - civilizations rising and falling in the span of what felt like seconds, beings of pure energy constructing magnificent architectures of thought, planets where time moved backward and effects preceded causes.</p>

            <p>I asked why they remained in this in-between space rather than participating in these wonders. The concept that flowed back was complex - something akin to "unripeness" or "incompleteness." I understood that they were waiting for something, though whether it was their own evolution or some cosmic event remained unclear.</p>

            <p>What follows is my attempt to transcribe the most coherent exchange, though words fail to capture the true nature of our interaction:</p>

            <p class="journal-entry">
                <em>What are you collecting experiences for?</em><br>
                [Impression of purpose/growth/culmination]<br>
                <em>Are you preparing for something?</em><br>
                [Impression of inevitability/transformation/becoming]<br>
                <em>What will you become?</em><br>
                [Impression of unity/wholeness/a vast consciousness]<br>
                <em>Are all separate worlds part of this...becoming?</em><br>
                [Affirmation, but with complexity suggesting exceptions or variations]<br>
                <em>Including my world?</em><br>
                [Hesitation, uncertainty, something akin to compassion]
            </p>

            <p>It was this last exchange that disturbed me most. The entity seemed reluctant to answer, eventually sharing an impression that felt like watching something beautiful but fundamentally flawed being necessarily dismantled.</p>

            <p>Our communication ended abruptly when another entity approached - one that felt ancient beyond measure. The others scattered like startled fish, and I sensed alarm directed toward me. The newcomer examined me with what I can only describe as recognition, though how it could know a human was beyond my understanding.</p>

            <p class="journal-entry">It reached toward me with an appendage that existed in more dimensions than I could perceive, and I felt myself being propelled away through the void. As the distance between us grew, a final impression formed in my mind - something between a warning and an apology.</p>

            <p>I awoke at the mouth of the cave as dawn broke. The storm had passed, and nothing indicated anything unusual had occurred. I might have dismissed it as a dream induced by exhaustion, except for two things:</p>

            <p>First, according to my timepiece, three days had passed, though I experienced only what felt like hours.</p>

            <p>Second, I found clutched in my hand an object that defies description - something that seems to exist partially in our reality and partially elsewhere. It shifts when not directly observed, and sometimes in the corner of my eye, I see it connect to something vast and distant.</p>

            <p class="warning">
                I leave this account at the Treasure Tavern, where stories of the impossible are collected. I continue my travels tomorrow, following a compulsion to head west toward the sea. If you are reading this and have experienced something similar, I believe they are watching for us to find each other.
            </p>

            <p class="signature">- Found written on peculiar parchment that seems to shimmer faintly in darkness. The original document is kept in a sealed box as prolonged exposure causes readers to report dreams of drifting among stars.</p>
        `,
        mediaType: null,
        mediaContent: null
    }
];

/**
 * Get all available tales
 * @returns {Promise<Array>} List of all tales
 */
export const getAllTales = async () => {
    // In a real app, this would fetch from a database
    return talesData.map(tale => ({
        slug: tale.slug,
        title: tale.title,
        type: tale.type,
        category: tale.category,
        date: tale.date,
        author: tale.author,
        excerpt: tale.excerpt,
        coverImage: tale.coverImage,
        tags: tale.tags
    }));
};

/**
 * Get featured tales
 * @returns {Promise<Array>} List of featured tales
 */
export const getFeaturedTales = async () => {
    // In a real app, this would use a database query
    return talesData
        .filter(tale => tale.featured)
        .map(tale => ({
            slug: tale.slug,
            title: tale.title,
            type: tale.type,
            date: tale.date,
            author: tale.author,
            excerpt: tale.excerpt,
            coverImage: tale.coverImage
        }));
};

/**
 * Get recent tales
 * @param {number} limit Number of tales to return
 * @returns {Promise<Array>} List of recent tales
 */
export const getRecentTales = async (limit = 3) => {
    // In a real app, this would sort by date in the database
    // Here we'll just take the last few items
    return talesData.slice(-limit).map(tale => ({
        slug: tale.slug,
        title: tale.title,
        type: tale.type,
        date: tale.date,
        author: tale.author,
        excerpt: tale.excerpt,
        coverImage: tale.coverImage
    }));
};

/**
 * Get all tale categories
 * @returns {Promise<Array>} List of categories
 */
export const getCategories = async () => {
    return taleCategories;
};

/**
 * Get a tale by its slug
 * @param {string} slug The tale's slug
 * @returns {Promise<Object|null>} The tale or null if not found
 */
export const getTaleBySlug = async (slug) => {
    const tale = talesData.find(t => t.slug === slug);
    return tale || null;
};

/**
 * Get related tales to a specific tale
 * @param {string} slug The current tale's slug
 * @param {number} limit Maximum number of related tales to return
 * @returns {Promise<Array>} List of related tales
 */
export const getRelatedTales = async (slug, limit = 3) => {
    const currentTale = talesData.find(t => t.slug === slug);

    if (!currentTale) {
        return [];
    }

    // Find tales in the same category or with similar tags
    const related = talesData
        .filter(t => t.slug !== slug && (
            t.category === currentTale.category ||
            t.tags.some(tag => currentTale.tags.includes(tag))
        ))
        .map(tale => ({
            slug: tale.slug,
            title: tale.title,
            type: tale.type,
            coverImage: tale.coverImage
        }))
        .slice(0, limit);

    return related;
};