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
        slug: 'the-glass-sorceress',
        title: 'The Glass Sorceress',
        type: 'Story',
        category: 'story',
        date: 'Winter Solstice',
        author: 'The Archive Keeper',
        excerpt: 'In the gleaming city of Vitralis, a young apprentice glassblower discovers her mentor holds a dangerous secret—the ability to trap souls within her delicate creations.',
        coverImage: '/images/tales/the-glass-sorceress.png',
        featured: true,
        tags: ['sorceress', 'glass', 'souls', 'apprentice', 'magic'],
        content: `
            <p>The first time I saw Mistress Luminara trap a soul in glass, I didn't realize what I was witnessing. I was simply mesmerized by the way she caught the last breath of the dying merchant in a delicate glass orb, twisting it with tools too fine to see, whispering words that made the air shimmer like heat above summer stones.</p>

            <p>"A memento for his family," she told me, her voice soft as she smoothed the still-warm surface with fingers impossibly unmarred by her trade. "His essence preserved, so they might speak with him when grief becomes too heavy."</p>

            <p>I nodded, nineteen years old and painfully naive, honored to be the first apprentice the famed Glass Sorceress of Vitralis had taken in a decade. I believed I had been chosen for my steady hands and patient nature.</p>

            <p class="journal-entry">I learned the mundane aspects of glassblowing first—how to gather molten glass on a blowpipe, how to shape it with wooden tools, how to anneal it slowly to prevent shattering. For months, I created only simple objects: cups, vases, beads for wealthy merchants' wives. Mistress Luminara would inspect each piece critically, her pale blue eyes—the color of the clearest beach glass—revealing nothing of her thoughts.</p>

            <p>"You understand the glass," she said one evening, after I had completed a particularly challenging goblet. "But you do not yet hear it sing."</p>

            <p>I didn't understand then. Glass was silent except when struck or broken. But Luminara spoke of it as something alive, something with voice and intention.</p>

            <p>"When will you teach me to make the memorial orbs?" I asked, watching her create another commissioned piece for a grieving family. "The ones that glow from within?"</p>

            <p>She paused in her work, studying me with sudden intensity. "When you can hear the difference between the voice of the glass and the voice of what it contains."</p>

            <p class="journal-entry">It was midwinter when I first noticed the whispering. I'd been working late, experimenting with colored powders mixed into clear glass. The workshop had grown cold as the furnace died down. In that stillness, between the beats of my own heart, I heard it—a tiny chorus of murmurs coming from the locked cabinet where Luminara kept her special commissions.</p>

            <p>I convinced myself it was the wind finding gaps in the workshop's stone walls, or perhaps rats in the storage room. But the sound followed me into my dreams—fragments of conversations, pleas, occasional laughter, and, most disturbingly, weeping that seemed to rise and fall with the moon's transit across the night sky.</p>

            <p>One night I woke suddenly, certain someone was standing over my bed. The workshop was flooded with moonlight, and in that silver illumination, I saw a figure—translucent as finest glass, edges catching light like a prism. A woman in formal dress, her expression one of confusion.</p>

            <p>"This isn't right," she said, her voice distant as if carried across water. "I should be with my children. Why can't I reach them?"</p>

            <p>Before I could respond, she dispersed like smoke in wind. But not before I recognized her from a portrait I'd seen—Lady Elaine Vautier, who had died of fever three months prior, and whose "memorial orb" sat in Luminara's locked cabinet, paid for by her grieving husband.</p>

            <p class="journal-entry">I waited two days before confronting my mentor. Two days in which I observed her more carefully—noting how she visited wealthy homes under the pretext of delivering commissioned works, always choosing times when death had recently visited or seemed imminent. How she would return with her spitioris—the smallest blowing tube used for delicate work—and lock herself in her private chamber for hours.</p>

            <p>I searched the town's records, the old stories, the whispered warnings parents gave children about the beautiful Glass Sorceress who could create anything in her furnace, if the price was right.</p>

            <p>"You're not creating memorials," I said, when I finally found my courage. "You're taking souls."</p>

            <p>Luminara didn't seem surprised by my accusation. She continued polishing a delicate rose-colored bottle, its surface etched with symbols I recognized from her private workroom. "I'm preserving them," she corrected, without looking up. "There's a difference."</p>

            <p>"Those people think their loved ones have passed on. But they're trapped, confused. I've heard them. I've <em>seen</em> them."</p>

            <p>Now she did look up, and I saw something like pride flicker across her face. "You can see them? Outside their vessels?" She set aside her work, giving me her full attention for perhaps the first time. "Interesting. Perhaps you were the right choice after all."</p>

            <p>"Choice for what?" My voice sounded small even to my own ears.</p>

            <p class="journal-entry">"My successor, of course." She stood and moved to the locked cabinet, removing a key from around her neck. "You think I'm a monster, I can see it in your eyes. But you don't understand the alternative."</p>

            <p>The cabinet opened to reveal dozens of glass orbs, bottles, and figurines, each giving off a soft glow in varying colors. She removed one—a paperweight containing what appeared to be a frozen blue flame.</p>

            <p>"Before me, there was only darkness for them. Oblivion. Or worse—the Hollow Markets beyond the Veil, where souls are currency." She cradled the paperweight like a beloved pet. "I give them shelter. Preservation. Sometimes even purpose."</p>

            <p>"By selling them to their families? Tricking people into thinking these are just... what? Magical mementos?"</p>

            <p>"The families get comfort. The souls get protection. I get to continue my work." She placed the paperweight in my hands. "This is the essence of a child who would have been devoured by things you cannot imagine. His parents speak to him every night, tell him about his siblings growing up. Is that so terrible?"</p>

            <p>I wanted to drop the glass, to flee, to report her to... to whom? The city guards? The clerics? Who would believe me?</p>

            <p>Yet as I held the weight, I felt a curious peace emanating from it—not distress like the specter of Lady Vautier, but something like contentment.</p>

            <p>After Luminara left for a commission in the northern estates, I resolved to investigate. I waited until midnight, drawing the heavy indigo cloak she had gifted me close around my shoulders, pulling its deep hood low over my face. The enchanted fabric was supposedly woven with protective spells—"to shield the apprentice from the heat of creation," she had said. I wondered now if it served a different purpose.</p>

            <p>The workshop was nearly pitch black. I lit only three taper candles—arranged in a perfect triangle as she had taught me for delicate work. Their amber flames cast long, dancing shadows across the worn workbench where I carefully placed the smallest of her "memorial" pieces—a teardrop pendant that contained what appeared to be swirls of luminous blue mist.</p>

            <p class="journal-entry">As I stared into its depths, breath held in anticipation, the mist began to move with purpose. No longer random swirls, it coalesced into the unmistakable shape of a woman's face. I nearly dropped the pendant in shock, but instead of falling to the table, it hung suspended in the air between my fingers. The blue mist poured forth like water, forming a translucent figure hovering before me.</p>

            <p>She was hauntingly beautiful—a woman composed entirely of what appeared to be liquid blue glass. Her long hair floated as if underwater, her features delicate yet precise, as though carved by the most skilled artisan. Her eyes held no pupils—just wells of deeper blue containing pinpricks of light like distant stars.</p>

            <p>"You are not her," the apparition said, her voice resonating with a crystalline quality that made the actual glass in the room vibrate in subtle harmony. "Yet you wear her protections."</p>

            <p>I clutched my cloak tighter, pulling the hood further over my face as if it might shield me from her otherworldly gaze. "Who are you?" I managed to whisper.</p>

            <p>"I was Lady Elise Morvane, once. Before your mistress... preserved me." She spoke the word with complicated emotion—gratitude and resentment intertwined. "Now I am... less and more than what I was."</p>

            <p class="journal-entry">The ghostly woman drifted around the table, settling into the chair opposite mine. The blue light of her form illuminated the workshop in an ethereal glow, catching in the facets of nearby glass objects and sending prismatic reflections dancing across the walls.</p>

            <p>"She told my husband I would find peace," Elise continued, studying me with those starlit eyes. "That my essence would rest in beauty until natural law took its course. Does this look like peace to you, apprentice?"</p>

            <p>I could not lie, not with her gaze piercing through me. "No."</p>

            <p>"And yet," she admitted, her form rippling like disturbed water, "nor is it torment. It is... suspension. Neither life nor death. Neither heaven nor hell. Just... waiting."</p>

            <p>"Waiting for what?" I asked, finding courage in curiosity.</p>

            <p>She spread her translucent arms, and the workshop filled with a subtle chill that frosted the windowpanes. "That is the question we all ask. That is why we whisper, hoping to find the answer in each other's echoes."</p>

            <p>I leaned forward, the candlelight flickering between us. "Would you rather she had let you go? To whatever comes after?"</p>

            <p class="journal-entry">The ghost-woman's expression twisted with fear, her blue form momentarily fracturing like shattered glass before reforming. "You don't understand what waits beyond. She's shown you nothing of the Hollow Markets? The soul-eaters? The collectors?"</p>

            <p>"I know nothing," I admitted, "except what I see before me."</p>

            <p>Lady Elise's spectral hand extended across the table, hovering just above my forehead. "Then I will show you. Before your mistress returns and seals me away again. Before she decides whether you are worthy to inherit her terrible mercy."</p>

            <p>When her fingers made contact with my skin, my mind exploded with visions of ravenous shadow-beings that existed in the spaces between worlds, of marketplaces where immortal collectors traded in human essence, of the terrifying fate that awaited unprotected souls. I understood then what Luminara had been fighting against for centuries—the commodification of human consciousness, the predation upon the vulnerable dead.</p>

            <p>When the visions subsided, I found myself slumped in my chair, gasping for breath, the hood of my cloak thrown back. Across the table, Elise watched me with something akin to sympathy in her starlit eyes.</p>

            <p>"Now you understand," she said softly. "We are not victims. We are refugees."</p>

            <p class="journal-entry">We talked through the night, the spectral woman and I, as the candles burned low. She told me of her life, her death, her strange half-existence in glass. I shared my concerns, my confusion, my growing suspicion that I had been chosen for more than my steady hands.</p>

            <p>As dawn approached, Elise's form began to fade, drawn back to the pendant that served as her anchor.</p>

            <p>"She will return tomorrow," the apparition warned, her voice growing distant. "She will know we've spoken. She always knows." Her form was now little more than a blue outline against the candlelight. "You must decide, apprentice—will you continue her work? Will you improve upon it? Or will you shatter us all and let the collectors claim what remains?"</p>

            <p>When Luminara returned the next evening, she found me waiting in my indigo cloak, hood drawn low over my face, three fresh candles burning on the workbench. The teardrop pendant lay exactly where she had left it.</p>

            <p>"You've been busy in my absence," she said, setting down her traveling case. It wasn't a question.</p>

            <p>"I've been learning," I corrected. "As you wished."</p>

            <p class="journal-entry">"My successor, of course." She stood and moved to the locked cabinet, removing a key from around her neck. "You think I'm a monster, I can see it in your eyes. But you don't understand the alternative."</p>

            <p>The cabinet opened to reveal dozens of glass orbs, bottles, and figurines, each giving off a soft glow in varying colors. She removed one—a paperweight containing what appeared to be a frozen blue flame.</p>

            <p>"Before me, there was only darkness for them. Oblivion. Or worse—the Hollow Markets beyond the Veil, where souls are currency." She cradled the paperweight like a beloved pet. "I give them shelter. Preservation. Sometimes even purpose."</p>

            <p>"By selling them to their families? Tricking people into thinking these are just... what? Magical mementos?"</p>

            <p>"The families get comfort. The souls get protection. I get to continue my work." She placed the paperweight in my hands. "This is the essence of a child who would have been devoured by things you cannot imagine. His parents speak to him every night, tell him about his siblings growing up. Is that so terrible?"</p>

            <p>I wanted to drop the glass, to flee, to report her to... to whom? The city guards? The clerics? Who would believe me?</p>

            <p>Yet as I held the weight, I felt a curious peace emanating from it—not distress like the specter of Lady Vautier, but something like contentment.</p>

            <p>After Luminara left for a commission in the northern estates, I resolved to investigate. I waited until midnight, drawing the heavy indigo cloak she had gifted me close around my shoulders, pulling its deep hood low over my face. The enchanted fabric was supposedly woven with protective spells—"to shield the apprentice from the heat of creation," she had said. I wondered now if it served a different purpose.</p>

            <p>The workshop was nearly pitch black. I lit only three taper candles—arranged in a perfect triangle as she had taught me for delicate work. Their amber flames cast long, dancing shadows across the worn workbench where I carefully placed the smallest of her "memorial" pieces—a teardrop pendant that contained what appeared to be swirls of luminous blue mist.</p>

            <p class="journal-entry">As I stared into its depths, breath held in anticipation, the mist began to move with purpose. No longer random swirls, it coalesced into the unmistakable shape of a woman's face. I nearly dropped the pendant in shock, but instead of falling to the table, it hung suspended in the air between my fingers. The blue mist poured forth like water, forming a translucent figure hovering before me.</p>

            <p>She was hauntingly beautiful—a woman composed entirely of what appeared to be liquid blue glass. Her long hair floated as if underwater, her features delicate yet precise, as though carved by the most skilled artisan. Her eyes held no pupils—just wells of deeper blue containing pinpricks of light like distant stars.</p>

            <p>"You are not her," the apparition said, her voice resonating with a crystalline quality that made the actual glass in the room vibrate in subtle harmony. "Yet you wear her protections."</p>

            <p>I clutched my cloak tighter, pulling the hood further over my face as if it might shield me from her otherworldly gaze. "Who are you?" I managed to whisper.</p>

            <p>"I was Lady Elise Morvane, once. Before your mistress... preserved me." She spoke the word with complicated emotion—gratitude and resentment intertwined. "Now I am... less and more than what I was."</p>

            <p class="journal-entry">The ghostly woman drifted around the table, settling into the chair opposite mine. The blue light of her form illuminated the workshop in an ethereal glow, catching in the facets of nearby glass objects and sending prismatic reflections dancing across the walls.</p>

            <p>"She told my husband I would find peace," Elise continued, studying me with those starlit eyes. "That my essence would rest in beauty until natural law took its course. Does this look like peace to you, apprentice?"</p>

            <p>I could not lie, not with her gaze piercing through me. "No."</p>

            <p>"And yet," she admitted, her form rippling like disturbed water, "nor is it torment. It is... suspension. Neither life nor death. Neither heaven nor hell. Just... waiting."</p>

            <p>"Waiting for what?" I asked, finding courage in curiosity.</p>

            <p>She spread her translucent arms, and the workshop filled with a subtle chill that frosted the windowpanes. "That is the question we all ask. That is why we whisper, hoping to find the answer in each other's echoes."</p>

            <p>I leaned forward, the candlelight flickering between us. "Would you rather she had let you go? To whatever comes after?"</p>

            <p class="journal-entry">The ghost-woman's expression twisted with fear, her blue form momentarily fracturing like shattered glass before reforming. "You don't understand what waits beyond. She's shown you nothing of the Hollow Markets? The soul-eaters? The collectors?"</p>

            <p>"I know nothing," I admitted, "except what I see before me."</p>

            <p>Lady Elise's spectral hand extended across the table, hovering just above my forehead. "Then I will show you. Before your mistress returns and seals me away again. Before she decides whether you are worthy to inherit her terrible mercy."</p>

            <p>When her fingers made contact with my skin, my mind exploded with visions of ravenous shadow-beings that existed in the spaces between worlds, of marketplaces where immortal collectors traded in human essence, of the terrifying fate that awaited unprotected souls. I understood then what Luminara had been fighting against for centuries—the commodification of human consciousness, the predation upon the vulnerable dead.</p>

            <p>When the visions subsided, I found myself slumped in my chair, gasping for breath, the hood of my cloak thrown back. Across the table, Elise watched me with something akin to sympathy in her starlit eyes.</p>

            <p>"Now you understand," she said softly. "We are not victims. We are refugees."</p>

            <p class="journal-entry">We talked through the night, the spectral woman and I, as the candles burned low. She told me of her life, her death, her strange half-existence in glass. I shared my concerns, my confusion, my growing suspicion that I had been chosen for more than my steady hands.</p>

            <p>As dawn approached, Elise's form began to fade, drawn back to the pendant that served as her anchor.</p>

            <p>"She will return tomorrow," the apparition warned, her voice growing distant. "She will know we've spoken. She always knows." Her form was now little more than a blue outline against the candlelight. "You must decide, apprentice—will you continue her work? Will you improve upon it? Or will you shatter us all and let the collectors claim what remains?"</p>

            <p>With those words, she collapsed back into the teardrop pendant, now just a swirl of blue mist once more.</p>

            <p>When Luminara returned the next evening, she found me waiting in my indigo cloak, hood pulled low, three fresh candles burning on the workbench between us. The teardrop pendant lay exactly where she had left it, betraying nothing of our conversation.</p>

            <p>"You've been busy in my absence," she said, setting down her traveling case. It wasn't a question.</p>

            <p>"I've been learning," I corrected. "As you wished."</p>

            <p>A smile touched her lips—the first genuine one I'd seen. "And what have you learned, my apprentice?"</p>

            <p class="journal-entry">"That I can hear the difference now," I said quietly. "Between the voice of the glass and the voice of what it contains."</p>

            <p>Luminara nodded, removing her traveling cloak. "Then you are ready for your true education to begin."</p>

            <p>What followed was five years of learning not only to shape glass, but to hear its song, to understand its affinity for human essence, to whisper the words that bind the leaving to the remaining. I learned of the Hollow Markets and the collectors. I learned why souls are drawn to glass—its paradoxical nature, solid yet flowing, containing yet revealing, a perfect halfway house between states of being.</p>

            <p>Luminara has been gone these past three years. Her own glass prison—a magnificent chandelier hanging in the workshop's center—holds the faintest pink glow now. She speaks to me sometimes, guiding my work, though her voice grows fainter with each passing season.</p>

            <p>I am more selective than my mentor was. I take only those who would be most vulnerable to the things beyond—children taken too soon, souls too gentle for what awaits, those whose unfinished business would make them easy prey for entities that feed on regret and longing.</p>

            <p>I have improved the process as well. My vessels are more comfortable, my bindings more flexible. The souls in my keeping can visit their families in dreams if they wish, though never for long.</p>

            <p class="journal-entry">If you find yourself in Vitralis, you may see a slender figure in an indigo hooded cloak making her way through the twilight streets, carrying a case of delicate tools. They call me the new Glass Sorceress, said to create works of such beauty and life that they seem to contain worlds within them.</p>

            <p>They're not wrong.</p>

            <p>And if death approaches someone you love, you might seek my services. I will come with my tools and my quiet words of comfort. Three candles will be lit. Across the table, in the dancing light, you may catch a glimpse of blue reflections that have no source, hear whispers that seem to come from the glass itself.</p>

            <p>Just know that what I offer is not what you think. It's both more and less. A postponement, not a solution. A shelter, not a release.</p>

            <p>But in a world where what waits beyond the last breath is hungrier and crueler than any human religion has dared imagine—perhaps a beautiful glass cage is the kindest gift I can offer.</p>

            <p class="signature">- From the private journal of Iris Calaver, known in Vitralis as the Glass Sorceress, discovered after the mysterious explosion that destroyed her workshop. Among the debris, authorities recovered dozens of intact glass objects that glowed with a distinctive blue light. Those who handle them report hearing whispers and occasionally seeing a woman's face reflected in their depths, even when no one stands nearby.</p>
        `,
        mediaType: null,
        mediaContent: null
    },
    {
        slug: 'the-sorceress-of-storms',
        title: 'The Sorceress of Storms',
        type: 'Story',
        category: 'story',
        date: 'Thunder Moon',
        author: 'The Weather-Watcher',
        excerpt: 'When a desperate village makes a bargain with the notorious Sorceress of Storms to end a devastating drought, a young apprentice discovers the true price of commanding the weather.',
        coverImage: '/images/tales/sorceress-of-storms.png',
        featured: true,
        tags: ['sorceress', 'storms', 'bargain', 'weather', 'magic'],
        content: `
            <p>The first drops of rain fell like mercy on Dryhollow, a village that had not seen water from the sky in nearly three hundred days. Farmers wept openly in their barren fields. Children danced with upturned faces. The village elder, Marwen, watched from the steps of the meeting hall, his weathered face betraying neither joy nor relief—only resignation.</p>

            <p>I knew what the others did not. This rain came with a price beyond measure.</p>

            <p class="journal-entry">Three weeks earlier, I had followed Marwen into the Misted Mountains as his apprentice. The journey had been his idea—a desperate gambit after our wells ran dry and the river shrank to a trickle of mud. "We seek the Sorceress," he had told the council, his voice hollow. "It's said she commands the storms."</p>

            <p>The council had protested. All knew the tales of the Sorceress of Storms—how she had once flooded a kingdom that denied her tribute, how ships that failed to leave offerings upon passing her isle were swallowed by whirlpools, how those who sought her power returned changed, if they returned at all.</p>

            <p>Marwen had silenced them with a withered hand. "The children die of thirst while we debate. I go tomorrow at dawn."</p>

            <p>I volunteered to accompany him. I was seventeen, curious about magic, and naive about its cost.</p>

            <p class="journal-entry">The Sorceress did not dwell in a palace as I had imagined, nor a cave festooned with lightning. We found her in a modest cottage perched on a cliff face, accessible only by a narrow path that seemed to shift beneath our feet. Above her home, the sky was divided precisely—clear blue to one side, roiling thunderclouds to the other, the division between them as sharp as a knife's edge.</p>

            <p>She opened her door before we knocked.</p>

            <p>"The desperate village sends its elder and its future," she said, her voice like distant thunder. Her eyes were the deep gray of storm clouds, her hair a cascade of silver that moved as though underwater. Around her neck hung vials of different waters—rain, mist, dew, tears—each glowing faintly with inner light.</p>

            <p>Marwen bowed. "Mistress of the Changing Sky, we come seeking—"</p>

            <p>"I know why you come, Marwen of Dryhollow," she interrupted. "The question is whether you understand what you ask."</p>

            <p>She invited us inside, where the cottage seemed impossibly larger. Maps covered the walls—not of lands but of air currents, cloud formations, and patterns I could not comprehend. Glass containers of every size held what appeared to be captured weather—a miniature tornado spiraling in one, a snow squall in another, ball lightning bouncing gently against the glass of a third.</p>

            <p class="journal-entry">The Sorceress gestured to a table where a shallow bowl of silver sat. As we approached, the bowl filled with water that reflected not our faces but the image of Dryhollow, its fields cracked and dying.</p>

            <p>"Three hundred years ago," she said, stirring the water with one finger, "your ancestors diverted the river that fed the lake of my homeland, all to grow one more crop of grain to sell at profit. The lake dried. My people scattered. The weather patterns that had existed for millennia... disrupted."</p>

            <p>The water in the bowl swirled, showing a lush valley transforming into a barren wasteland not unlike our own.</p>

            <p>"You ask me to undo what your ancestors caused?" Her laughter was like hail on a rooftop. "Nature remembers, Elder. It keeps its accounts across generations."</p>

            <p>Marwen fell to his knees. "Our children had no part in those sins. I beg you, take what price you will from me, but spare them."</p>

            <p>The Sorceress considered him, then turned her storm-gray eyes to me. "And you, child? What would you offer?"</p>

            <p>The question caught me unprepared. "I... I have nothing of value," I stammered. "Only my service, if it would help."</p>

            <p>Something flickered across her face—interest, perhaps. Or calculation.</p>

            <p>"Three gifts I require," she declared. "First, the elder's remaining years—fair exchange for the generations of rain you've stolen."</p>

            <p>Marwen nodded without hesitation.</p>

            <p>"Second, the waters of your village's memory. They will forget the drought, forget this bargain, forget the wrongdoing of their ancestors. They will know only that rain has come again."</p>

            <p>Again, Marwen agreed, though I saw pain in his eyes at the thought of history erased.</p>

            <p>"And third," she said, fixing me with her gaze, "an apprentice. One with the potential to learn my arts. One who will help maintain the balance after I am gone."</p>

            <p class="journal-entry">My heart stopped. "Me?"</p>

            <p>"You have the gift," she said simply. "I felt it when you crossed the threshold. Weather-sense, they called it in the old days. The ability to not merely predict storms but to feel them in your bones, to understand their voice and intent."</p>

            <p>I looked to Marwen, hoping for guidance, but his eyes were downcast.</p>

            <p>"The boy has family," he said quietly.</p>

            <p>"Who will forget him," the Sorceress replied, "as part of the village's memory-waters. It is kinder this way. A clean severing."</p>

            <p>I wanted to protest, to run, but as she spoke, I felt something unfurling within me—a recognition of truth. All my life I had known when rains would come before the clouds appeared. I had felt the electricity of approaching storms. I had dreamed of wind patterns and woken to find them precisely as I'd envisioned.</p>

            <p>The Sorceress saw my realization. "It is rare, this gift. Without training, it will drive you mad eventually. You'll feel every drought as physical pain, every flood as drowning. Better to master it than be mastered by it."</p>

            <p>I made my choice with a single nod, though my heart felt as parched as our fields.</p>

            <p>The Sorceress wasted no time. From Marwen, she took a lock of hair that turned white as she wound it around her finger. From a shelf, she retrieved a glass sphere that she told me contained the essence of our village's collective memory of the drought. And from me, she took a single tear, carefully capturing it in an empty vial she wore alongside the others.</p>

            <p class="journal-entry">She instructed us to return home, promising the rains would follow within a day. As we prepared to leave, she placed a hand on my shoulder.</p>

            <p>"Return when the first moon of summer is full," she said. "Come alone. Bring nothing from your old life. By then, they will have forgotten you entirely."</p>

            <p>The journey back was silent. Marwen, already looking decades older, refused to meet my gaze. "I have sacrificed you," he finally whispered as our village came into view. "May the waters forgive me."</p>

            <p>I wanted to comfort him, to say I had made my own choice, but the words felt hollow. Instead, I asked the question that had burned in me since the mountain. "Is she... evil?"</p>

            <p>Marwen considered this for a long moment. "The Sorceress is like the weather itself," he finally said. "Neither evil nor good, but essential. Uncaring about our desires, yet bound by patterns and purposes deeper than our understanding. She is balance made flesh."</p>

            <p>Now I stand in the rain, watching my people celebrate a miracle they don't understand, paid for with a price they'll never remember. Already I see the confusion in my mother's eyes when she looks at me, the slight furrow in my brother's brow as he tries to recall my name.</p>

            <p class="journal-entry">Tomorrow I will begin walking back to the Misted Mountains. Not because of our bargain, but because I felt it when the Sorceress summoned the rains—a surge of power so intoxicating it made my knees buckle. For one brief moment, I understood the language of clouds, the grammar of lightning, the poetry of precipitation.</p>

            <p>I have seen behind the veil of the world, and I cannot unsee it.</p>

            <p>If you find this account in the archives of the Treasure Tavern, know that I left it here on my journey to become what I must. Perhaps someday, when my apprenticeship is complete, I will return—not to Dryhollow, where none remember me, but to this tavern where forgotten tales find sanctuary.</p>

            <p>Listen for me in the storm that rattles the shutters. I am learning its secrets, syllable by syllable, drop by drop.</p>

            <p class="signature">- From the journal of Tanis Reed, discovered sealed in a bottle that appeared on the Treasure Tavern's doorstep during a thunderstorm of unusual intensity. The ink changes color with the weather.</p>
        `,
        mediaType: null,
        mediaContent: null
    },
    {
        slug: 'the-bone-kingdom',
        title: 'The Bone Kingdom',
        type: 'Story',
        category: 'story',
        date: 'Midwinter Eve',
        author: 'Rosaline Thornwood',
        excerpt: 'A cartographer discovers a mysterious map that leads to a hidden city built entirely of bones, where the memories of the dead are preserved for eternity.',
        coverImage: '/images/tales/the-bone-kingdom.png',
        featured: true,
        tags: ['necromancy', 'cartography', 'undead', 'kingdom', 'memory'],
        content: `
            <p>There are maps that lead us to treasure, those that guide us home, and those that lure us into the waiting arms of danger. But the map that came into my possession that winter night belonged to none of these categories. It was a map that led to truth—perhaps the most perilous destination of all.</p>

            <p class="journal-entry">I've spent my life charting the known world, but never could I have imagined a place such as the one I'm about to describe. I commit these words to paper, though I suspect few will believe them. Nevertheless, I record what I've witnessed, as is the sworn duty of any cartographer worth their compass.</p>

            <p>The map arrived in an unmarked package while snow battered the windows of my study. Inside was a sheet of parchment that appeared, at first glance, to be blank save for a gray smudge at its center. As a cartographer familiar with invisible inks and hidden markings, I held it to my candle's flame, watching in fascination as lines of ash—for that's what the substance proved to be—began to spread across the surface like frost forming on a winter pond.</p>

            <p>By the time the moon rose that night, casting silver light through my windows, the map had fully revealed itself. It depicted a mountain range I recognized immediately, though in the center was marked a valley that, by all official records, did not exist. Around this valley's perimeter were markings in an ancient script that took me three days to decipher:</p>

            <p class="quoted-text">"Where memory becomes stone and bone becomes shelter, the forgotten write their histories upon the walls of eternity."</p>

            <p>I should have left it there. Any sane cartographer would have dismissed it as an elaborate hoax or metaphorical curiosity. Instead, I packed my instruments, my journals, and supplies for a winter expedition. Something in that flowing script called to me—perhaps the professional curiosity that had led me to map uncharted territories before, or perhaps something more insidious that I dare not name.</p>

            <p class="journal-entry">The journey was arduous. Three weeks of travel through mountain passes that seemed to resist my presence. Strange winds erased my footprints. Compass needles spun without purpose. Stars rearranged themselves in unfamiliar patterns at night. But the map... the map remained constant, the ashen lines brightening under moonlight as if encouraging my progress.</p>

            <p>It was on a night of the full moon that I crested a ridge and looked down upon a valley that, by all natural laws, should not have existed. In place of the expected forested basin was a sprawling city built entirely of bone. Immense structures rose like pale giants against the night sky, their surfaces etched with patterns I could barely make out from my vantage point. Streets formed a spiraling labyrinth, connecting domed buildings and towering spires. And everywhere, a soft blue luminescence pulsed like a heartbeat.</p>

            <p>I made my descent, half-expecting the vision to dissolve like morning mist. But with each step, the Bone Kingdom—for that is how I came to think of it—only grew more substantial. The entrance to the city was an arch formed from what appeared to be a massive spine, each vertebra larger than a wagon wheel. No guards stood watch, yet I felt observed by countless unseen presences.</p>

            <p class="journal-entry">The architecture defied conventional explanation. Palaces built from thousands of interlocking skulls, their eye sockets glowing with that same spectral blue light. Bridges formed from elongated finger bones, perfectly calibrated to support remarkable weight. Gardens where flowers of carved ivory bloomed, catching moonlight and fragmenting it into rainbow prisms.</p>

            <p>Most astonishing was the sound—a constant, gentle whisper that seemed to emanate from the structures themselves. As I stood in what appeared to be a central plaza, I realized with growing wonder that I was hearing voices—countless voices—murmuring stories, singing forgotten songs, reciting poetry in languages both familiar and alien.</p>

            <p>It was there that I first encountered one of the kingdom's denizens. A figure emerged from a nearby archway, moving with fluid grace despite being composed entirely of animated bone. Its skull featured delicately carved patterns that continued down its spine and across its ribcage—a recording system, I would later learn, containing the entity's collected memories.</p>

            <p>"We receive few living visitors," it said, its voice resonating not from its jaw but from the very bones that composed it. "You must be one who follows maps rather than warnings."</p>

            <p>I admitted as much, my voice barely audible above my thundering heartbeat.</p>

            <p>"Then you have come to the Archive of Last Remembrance," it continued, gesturing with elongated fingers toward the city. "Where those who wish to be remembered beyond death give their bones and their memories to our eternal collection."</p>

            <p class="journal-entry">What followed was a three-day tour of what I can only describe as the most astonishing library conceivable. The entire city, I learned, was a repository of memories—a place where those who feared being forgotten could ensure their stories lived on. The inhabitants—the Ossuary Keepers—were scholars who had devoted their afterlives to preserving these narratives.</p>

            <p>In death, those who found their way to the Bone Kingdom surrendered their physical forms to the architecture, their bones becoming part of the ever-expanding city. Their memories were etched into their remains, becoming accessible to those who knew how to read them.</p>

            <p>"Touch any wall," my guide instructed, "and listen."</p>

            <p>I placed my hand against a curved surface constructed from countless finger bones. Immediately, my mind filled with images—a young woman dancing at her wedding, a merchant counting his first profits, a mother cradling her newborn child. Ordinary moments made extraordinary by their preservation.</p>

            <p>"Not all memories are joyful," the Keeper warned as we moved deeper into the city. "Some sections house tragedies, betrayals, final regrets. We preserve them all, for what is a life if not the sum of both light and shadow?"</p>

            <p>In the center of the kingdom stood a palace more magnificent than the others—constructed from bones that shimmered with an opalescent quality unlike anything I'd seen before. "The Hall of Monarchs," my guide explained. "Those whose memories shaped nations."</p>

            <p class="journal-entry">Within this hall, I witnessed coronations and assassinations, treaties signed and broken, the rise and fall of empires long since turned to dust in the world above. I saw the private doubts of confident rulers, the unexpected compassion of tyrants, the crushing loneliness that often accompanies power.</p>

            <p>On my final night in the Bone Kingdom, I was brought before a council of elder Keepers—their forms more elaborate and adorned with crystalline growths that caught and reflected light in hypnotic patterns.</p>

            <p>"You came seeking knowledge," said one whose skull bore a crown of delicate bone spindles. "And knowledge you have found. But now a choice lies before you."</p>

            <p>They offered me a place among them—a position as a living chronicler who could travel between their realm and mine, bringing worthy souls to their final rest among the memory-bones. In exchange, when my time eventually came, my own bones would join their architecture, my experiences preserved for eternity.</p>

            <p>The alternative was to return to the world above, my memory of their kingdom gradually fading until it seemed no more substantial than a dream.</p>

            <p class="journal-entry">I asked for one night to consider their proposal. In the silence of my bone-chamber, I opened my cartographer's journal and began to sketch what I had seen—the layout of the kingdom, the patterns etched into its structures, the script used to record memories. As I worked, a realization dawned: the map that had led me here had been drawn in ash because it was never meant to be permanent. It was a test—a means of identifying those who would seek knowledge regardless of the cost.</p>

            <p>By morning, I had made my decision. I would return to the world above, but not as one doomed to forget. Instead, I accepted a third option of my own devising: I would become a keeper of maps rather than memories, creating carefully coded charts leading to the Bone Kingdom—maps I would entrust only to those whose souls seemed worthy of eventual preservation.</p>

            <p>The council accepted my counterproposal with what I perceived as approval, though it's difficult to read expressions on faces composed only of bone.</p>

            <p>"Until your return, then," said the crowned elder as I prepared to depart.</p>

            <p>I've created seven maps since that day, each entrusted to a different bearer. Whether any have completed the journey, I cannot say. The Bone Kingdom does not send word of new arrivals.</p>

            <p>As for myself, I continue my work as a cartographer, though conventional maps now seem flat and lifeless compared to what I've seen. Sometimes, when I work by moonlight, I notice the scars on my fingertips—marks left from when I pricked my skin to sign my agreement with the Keepers in blood—begin to glow with that same spectral blue that illuminated the kingdom.</p>

            <p>A reminder, perhaps, that someday I too will join the whispering bones, my stories added to the eternal archive where nothing truly important is ever forgotten.</p>

            <p class="signature">- From the final journal of Lyra Winters, Royal Cartographer, discovered three years after her disappearance. The journal contained numerous detailed sketches of anatomically impossible structures and several blank pages bearing faint traces of ash.</p>
        `,
        mediaType: null,
        mediaContent: null
    },
    {
        slug: 'the-goblin-kings-bet',
        title: 'The Goblin King\'s Bet',
        type: 'Story',
        category: 'story',
        date: 'Harvest Moon',
        author: 'The Wandering Sage',
        excerpt: 'When the shrewd merchant Elwin Thorn accepted a wager from the Goblin King, he never expected the stakes would be his own shadow—or that winning might be worse than losing.',
        coverImage: '/images/tales/the-goblin-kings-bet.png',
        featured: true,
        tags: ['goblin', 'wager', 'merchant', 'shadows', 'magic'],
        content: `
            <p>The night Elwin Thorn made his wager with the Goblin King began like many others at the Treasure Tavern—with overconfidence and strong spirits.</p>

            <p>"There's no merchant in seven kingdoms who can match my skill at the bargaining table," Elwin boasted, slamming his fourth tankard down. The fire in the hearth cast long shadows across the weathered oak table where he sat. "I could haggle the scales off a dragon and convince him it was his idea."</p>

            <p>That's when the laughter started—a sound like dry leaves skittering across stone. Most patrons didn't notice, but Elwin felt a chill climb his spine despite the tavern's warmth.</p>

            <p class="journal-entry">In the darkest corner of the room, two eyes gleamed amber in the shadows—pupils vertical like a cat's. They hadn't been there moments before. Neither had the hunched figure in the patchwork cloak of impossible colors, fingers long and gnarled where they wrapped around a goblet that seemed too delicate for such hands.</p>

            <p>"A bold claim," came the voice, surprisingly melodious despite its raspy edge. "But I wonder—does your confidence extend to... unconventional negotiations?"</p>

            <p>Had Elwin been sober, he might have noticed how the tavern fell unnaturally quiet, how the other patrons seemed to blur at the edges like a painting left in the rain. But Elwin only saw a challenge, and his merchant's pride wouldn't allow him to back down.</p>

            <p>"There's not a deal made that I can't turn to my advantage," he replied, puffing out his chest. "Be it with man, beast, or..."</p>

            <p>"Or goblin?" The figure leaned forward, revealing a face that was all sharp angles and knowing malice, crowned with an elaborate headdress of tarnished silver and oddly shaped gemstones. "I am Griznok, King of the Seventh Goblin Court, Master of Twilight Bargains and Keeper of Harvested Shadows."</p>

            <p>Elwin should have left then. Anyone in the tavern would have warned him, had they been able to move or speak. But they were all frozen, caught between one moment and the next while something ancient and dangerous unfolded.</p>

            <p class="journal-entry">"I propose a wager," said the Goblin King, his smile revealing teeth too numerous and needle-sharp. "A simple test of your vaunted skills. If you can convince me to give you something I value without my realizing I've been manipulated, you win. If you fail, I take something of equal value from you."</p>

            <p>"And what's the prize?" Elwin asked, intrigued despite the warning bells ringing clear through his alcohol-fogged mind.</p>

            <p>Griznok reached into his cloak and withdrew a small object that glittered even in the dim light—a coin of pure gold, but one that seemed to shift and change as Elwin looked at it. Sometimes it appeared to be a royal sovereign, other times an ancient medallion inscribed with symbols that hurt the eyes.</p>

            <p>"The Trader's Fortune," the Goblin King explained. "Flip it before a transaction, and you'll know precisely what the other party desires most. Quite useful for a merchant, I'd imagine."</p>

            <p>Elwin's eyes widened. With such an artifact, he could become the wealthiest man in the realm within a year. "And if I lose?"</p>

            <p>The Goblin King's smile widened impossibly. "Something of equivalent value. Your shadow, perhaps? You'll hardly miss it, except on the sunniest days."</p>

            <p>Even in his inebriated state, Elwin hesitated. Deals with magical creatures were notoriously dangerous, and the stakes seemed oddly imbalanced. "Just my shadow? Nothing else?"</p>

            <p>"On my crown and court," Griznok confirmed, placing one spindly hand over his chest in mock solemnity. "We begin at once. You have until the fire burns the last log to convince me to give you something I value."</p>

            <p class="journal-entry">What followed was the strangest negotiation of Elwin's career. He tried flattery, appeals to vanity, manufactured urgency—every trick that had served him well in marketplaces across the continent. The Goblin King responded with amusement but gave away nothing of value.</p>

            <p>As the final log cracked and settled in the hearth, Elwin felt a creeping dread. The King's eyes gleamed with anticipation.</p>

            <p>"It seems your reputation is somewhat... exaggerated," Griznok said, rising from his seat with fluid grace. "Our bargain is concluded. Your shadow, if you please."</p>

            <p>Elwin opened his mouth to protest, but no sound emerged. He watched in horror as his shadow peeled away from his feet, crawling up the wall like spilled ink flowing upward. It pooled in the Goblin King's outstretched hand, condensing into a small, dark stone.</p>

            <p>"A pleasure doing business," Griznok said, tucking the stone into his cloak. He turned to leave, then paused. "Oh, but wait. It seems in our transaction, I've dropped something of mine. How careless."</p>

            <p>On the floor between them lay a small silver key of intricate design.</p>

            <p>"Is this yours?" Elwin asked, bending to retrieve it. "Wouldn't want you to lose something valuable." He held it out to the Goblin King.</p>

            <p>Griznok's expression froze. "Yes, quite valuable indeed. The key to my personal treasury, in fact. How... generous of you to return it."</p>

            <p>The realization dawned on Elwin as the Goblin King's face transformed from surprise to grudging respect. "I... convinced you to acknowledge something you value. Without you realizing my intent."</p>

            <p>The tavern seemed to hold its breath.</p>

            <p>"Clever human," the Goblin King hissed, his amusement gone. "You've fulfilled our bargain's terms, though not in the way either of us expected." He produced the shadow-stone and the gold coin, holding one in each hand. "So what will it be? Your shadow returned, or the Trader's Fortune?"</p>

            <p class="journal-entry">Elwin barely hesitated. "The coin, of course."</p>

            <p>Griznok's laughter echoed as he tossed the coin through the air. Elwin caught it, feeling its peculiar weight—heavier than it should be, as though it contained more than mere metal.</p>

            <p>"Enjoy your prize, merchant," the Goblin King said, the shadow-stone vanishing back into his cloak. "Though I wonder if you'll find it the bargain you hoped for."</p>

            <p>In an eyeblink, the strange figure was gone. The tavern's sounds rushed back—conversations resuming mid-sentence, no one seeming to notice the interruption or the fact that the merchant at the corner table now cast no shadow.</p>

            <p>Elwin clutched the coin tightly, already imagining the wealth it would bring him. Only later would he discover the coin's true nature—that knowing what others desire most reveals the darkness in their hearts, and that carrying such knowledge is a burden heavier than any shadow.</p>

            <p>They say he still wanders the trade routes, the most astute merchant in seven kingdoms, able to secure any deal but finding no joy in his perfect transactions. And on moonless nights, if you listen carefully at the Treasure Tavern, you might hear the Goblin King's laughter—for in the final accounting, he always collects his due.</p>

            <p class="signature">- As recounted by Lorekeeper Miria to the patrons of the Treasure Tavern on the anniversary of Elwin Thorn's disappearance</p>
        `,
        mediaType: null,
        mediaContent: null
    },
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
        coverImage: '/images/tales/floor-sigils.png',
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
        coverImage: '/images/tales/crossroads-dark-night.png',
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
        coverImage: '/images/tales/the-void-boy.png',
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

            <p>It reached toward me with an appendage that existed in more dimensions than I could perceive, and I felt myself being propelled away through the void. As the distance between us grew, a final impression formed in my mind - something between a warning and an apology.</p>

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
    // Find the current tale
    const currentTale = talesData.find(t => t.slug === slug);

    if (!currentTale) {
        return [];
    }

    // Find tales that are in the same category or share tags
    const relatedTales = talesData
        .filter(t => {
            // Don't include the current tale
            if (t.slug === slug) return false;

            // Check if it's in the same category
            const sameCategory = t.category === currentTale.category;

            // Check if it shares at least one tag
            const hasSharedTag = t.tags.some(tag => currentTale.tags.includes(tag));

            return sameCategory || hasSharedTag;
        })
        .map(tale => ({
            slug: tale.slug,
            title: tale.title,
            type: tale.type,
            coverImage: tale.coverImage
        }))
        .slice(0, limit);

    // Always ensure we have the correct properties needed for the links
    const validatedRelated = relatedTales.map(tale => {
        // Ensure slug exists and is properly formatted
        if (!tale.slug) {
            // Silent handling for missing slugs
        }
        return tale;
    });

    return validatedRelated;
};