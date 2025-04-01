import { error } from '@sveltejs/kit';

// This is where you would typically fetch from an API or database
// For this example, we're using the hard-coded announcements data
const announcements = [
  {
    id: 1,
    slug: "goblin-infestation-cleanup",
    date: "March 10, 2025",
    title: "Goblin Infestation Cleanup Complete",
    category: "Event",
    type: "event",
    content: "After weeks of battling the unexpected goblin infestation in our cellar, our brave adventurers have finally cleared out the last of the vermin. Special thanks to the Dwarven Extermination Guild for their assistance with the particularly stubborn goblin king who had established a throne made entirely of stolen silverware.",
    mainImage: "/images/tales/goblin-infestation.webp",
    fullContent: `
      <p>After weeks of battling the unexpected goblin infestation in our cellar, our brave adventurers have finally cleared out the last of the vermin. Special thanks to the Dwarven Extermination Guild for their assistance with the particularly stubborn goblin king who had established a throne made entirely of stolen silverware.</p>

      <p>The infestation was first discovered when patrons began complaining about missing utensils and the faint sound of cackling coming from beneath the floorboards. Upon investigation, our maintenance wizard discovered an elaborate network of tunnels that the goblins had dug, connecting our cellar to the nearby abandoned silver mine.</p>

      <p>The goblins had apparently been attracted to our establishment by the scent of our renowned Chef Gnarl's Glittering Gooseberry Pie. According to goblin experts, the particular combination of spices used in the dish mimics the mating call of the rare Silver-backed Tunnel Shrieker, a fungus that goblins consider a delicacy.</p>

      <p>During the extermination, our team recovered over 200 pieces of silverware, 17 copper pots, and curiously, a collection of patrons' left boots. Any guests missing a left boot can inquire about its return at the front desk. Please note that some boots may have been... modified... with what appears to be attempts at "goblin fashion enhancements."</p>

      <p>The cellar has been thoroughly cleansed with anti-goblin wards and a particularly pungent mixture of troll-musk and lavender that goblins find repulsive. Our wine stocks have been checked for contamination, and we're pleased to report that the 2023 Elven Moonberry vintage remains untouched, though several barrels of dwarven ale were found to have been watered down and refilled with what our alchemist describes as "goblin moonshine of surprising quality."</p>

      <p>To celebrate our victory over these persistent pests, we will be holding a "Goblin-Free Gala" this weekend featuring special menu items including "Goblin-Proof" silverware (enchanted to turn bitter when touched by goblin hands) and our new cocktail, "The Exterminator's Elixir."</p>
    `,
    cta: {
      text: "Sign Up for Pest Prevention Workshop",
      link: "/demo"
    },
    relatedAnnouncements: [2, 5]
  },
  {
    id: 2,
    slug: "machine-elves-strike-resolved",
    date: "March 15, 2025",
    title: "Machine Elves Strike Resolved",
    category: "News",
    type: "news",
    content: "The labor dispute with our Machine Elves kitchen staff has finally been settled. Their demands for 'chronologically flexible lunch breaks' and 'interdimensional vacation days' have been accommodated. Patrons may notice our menu now includes several dishes that technically don't exist on this plane of reality.",
    mainImage: "/images/announcements/machine-elves-strike.webp",
    fullContent: `
      <p>The labor dispute with our Machine Elves kitchen staff has finally been settled. Their demands for 'chronologically flexible lunch breaks' and 'interdimensional vacation days' have been accommodated. Patrons may notice our menu now includes several dishes that technically don't exist on this plane of reality.</p>

      <p>For those unfamiliar with Machine Elves, they are extradimensional beings who exist simultaneously across multiple realities. We hired a group of them last fall after our previous head chef was accidentally trapped in the Ethereal Plane during an unfortunate incident involving a mislabeled portal scroll and a wheel of enchanted cheese.</p>

      <p>The strike began three weeks ago (or possibly three centuries ago, depending on which timeline you're following) when the head Machine Elf, Who-Sings-In-Geometric-Patterns, discovered that our standard employee benefits package did not account for the fact that Machine Elves experience time non-linearly.</p>

      <p>Specifically, they demanded:</p>
      <ul>
        <li>The right to take lunch breaks in the past, present, or future</li>
        <li>Vacation days that could be taken in parallel universes</li>
        <li>Healthcare coverage for appendages that may or may not exist depending on the phase of the moon</li>
        <li>A dedicated meditation space where the laws of physics are "more like guidelines"</li>
      </ul>

      <p>After consulting with our interdimensional labor relations expert (a former bureaucrat from the Time Variance Authority), we've restructured our employment contracts to accommodate these unique needs.</p>

      <p>As a result, our menu has been expanded to include several exciting new offerings, including "Schrödinger's Stew" (which is simultaneously the best and worst stew you've ever tasted until you observe it), "Hypercube Honeycakes" (which are bigger on the inside), and "Möbius Strip Pasta" (which you can keep twirling on your fork indefinitely).</p>

      <p>Please note that some dishes may arrive before you order them, and others might temporarily vanish from existence. Our waitstaff has been trained to handle these temporal anomalies, and we assure you that all food is perfectly safe for consumption by beings limited to experiencing time in a linear fashion.</p>
    `,
    cta: {
      text: "Try Our New Interdimensional Menu",
      link: "/demo"
    },
    relatedAnnouncements: [5, 3]
  },
  {
    id: 3,
    slug: "dragon-mating-season",
    date: "March 22, 2025",
    title: "Warning: Dragon Mating Season",
    category: "Alert",
    type: "alert",
    content: "Patrons are advised to use the eastern entrance until further notice, as a pair of adolescent copper dragons have claimed our western tower for courtship rituals. The local Dragonriders Guild assures us this is temporary, though the occasional rain of molten copper may continue through the month. Complimentary fireproof umbrellas available at the coat check.",
    mainImage: "/images/tales/dragon-wizard-music.webp",
    fullContent: `
      <p>Patrons are advised to use the eastern entrance until further notice, as a pair of adolescent copper dragons have claimed our western tower for courtship rituals. The local Dragonriders Guild assures us this is temporary, though the occasional rain of molten copper may continue through the month. Complimentary fireproof umbrellas available at the coat check.</p>

      <p>The dragons, identified as Pyraxix (male, approximately 87 years old) and Emberthia (female, approximately 92 years old), arrived last Tuesday during a thunderstorm. According to Dragonologist Fiora Scalebinder, copper dragons often seek out tall stone structures during their initial courtship phase, particularly those with "architectural flourishes that catch the morning light." Apparently, our recent tower renovation, which included copper weather vanes shaped like mythological creatures, was particularly attractive to the young couple.</p>

      <p>The Dragonriders Guild has assigned Senior Rider Thorm Windrider to monitor the situation. "This is perfectly natural behavior," Windrider explained. "Copper dragons typically engage in a courtship period of 3-4 weeks before deciding if they're compatible as mates. During this time, they demonstrate their prowess by melting and reshaping metals into elaborate gifts for each other."</p>

      <p>While the dragons themselves pose no direct threat to our patrons — copper dragons being generally friendly toward humanoids — there are some safety concerns:</p>

      <ul>
        <li>The occasional shower of molten copper droplets within a 30-foot radius of the tower</li>
        <li>Periodic bursts of electrical energy as the dragons attempt to impress each other with their control of storm magic</li>
        <li>Loud draconic poetry recitals, typically occurring between 2 AM and 4 AM</li>
        <li>The accumulation of shiny objects stolen from surrounding villages (the dragons have promised to return these items once their courtship concludes)</li>
      </ul>

      <p>We have implemented several safety measures for your protection and convenience:</p>

      <ul>
        <li>Complimentary fireproof umbrellas (enchanted by our resident abjuration specialist)</li>
        <li>A schedule of expected "molten metal displays" posted daily in the main hall</li>
        <li>Earplugs enhanced with silence spells available for overnight guests</li>
        <li>A designated "dragon viewing area" on the east balcony where guests can safely observe these magnificent creatures</li>
      </ul>

      <p>For dragon enthusiasts, our gift shop now stocks "I Survived Dragon Mating Season" t-shirts (fireproof, of course) and small vials of authentic dragon-melted copper (makes a wonderful souvenir and is said to bring good fortune when carried in a pocket close to the heart).</p>

      <p>We appreciate your understanding during this unexpected natural event. The Dragonriders Guild assures us that once the courtship period ends, the dragons will likely move on to establish a lair in the mountains. Until then, please enjoy this rare opportunity to witness draconic romance in action—from a safe distance.</p>
    `,
    cta: {
      text: "Reserve Dragon Watching Experience",
      link: "/demo"
    },
    relatedAnnouncements: [1, 4]
  },
  {
    id: 4,
    slug: "bardic-competition",
    date: "April 5, 2025",
    title: "Annual Bardic Competition",
    category: "Event",
    type: "event",
    content: "Calling all bards, minstrels, and musical enthusiasts! The annual Bardic Competition will be held in the Great Hall next month. Categories include traditional ballads, magical music, instrumental innovation, and comedy. Grand prize is a masterwork instrument crafted by the legendary luthier Harmonius Strings.",
    mainImage: "/images/tales/scrolls-of-the-hollow-choir.webp",
    fullContent: `
      <p>Calling all bards, minstrels, and musical enthusiasts! The annual Bardic Competition will be held in the Great Hall next month. Categories include traditional ballads, magical music, instrumental innovation, and comedy. Grand prize is a masterwork instrument crafted by the legendary luthier Harmonius Strings.</p>

      <p>Now in its 27th year, the Treasure Tavern Bardic Competition has become one of the most prestigious musical events in the realm. Previous winners have gone on to become court musicians for royalty, enchanted forest guides, and in one notable case, the musical familiar of an eccentric archmage.</p>

      <p>This year's competition will feature four categories:</p>

      <ul>
        <li><strong>Traditional Ballads</strong> - Renditions of classic tales and songs passed down through generations</li>
        <li><strong>Magical Musicality</strong> - Compositions that incorporate magical effects or are enhanced by spellcraft</li>
        <li><strong>Instrumental Innovation</strong> - Original instruments or novel playing techniques</li>
        <li><strong>Comedic Performance</strong> - Humorous songs, stories, or acts that amuse and delight</li>
      </ul>

      <p>Our distinguished panel of judges includes:</p>

      <ul>
        <li>Lady Melodia Silverstring, Royal Court Composer</li>
        <li>Gaxin the Whisper, Three-time Bardic Competition Champion</li>
        <li>Master Harmonius Strings, Legendary Instrument Crafter</li>
        <li>Professor Cadence, Dean of Musical Studies at the Arcane Academy</li>
      </ul>

      <p>The grand prize winner will receive a custom masterwork instrument crafted by Harmonius Strings himself, valued at over 5,000 gold pieces. Category winners will receive enchanted instrument strings that never break and always stay in tune, plus a guaranteed performance slot at the Midsummer Festival.</p>

      <p>Registration is open now through the end of the month. Entry fee is 5 gold pieces per category, or 15 gold pieces for all four categories. Apprentice rates (for performers under 18 years of age) are available at half price.</p>

      <p>Accommodations can be arranged at Treasure Tavern at a special competitor's rate. Please mention your registration when booking.</p>
    `,
    cta: {
      text: "Register for Competition",
      link: "/demo"
    },
    relatedAnnouncements: [1, 3]
  },
  {
    id: 5,
    slug: "menu-expansion",
    date: "April 8, 2025",
    title: "New Spring Menu Items",
    category: "News",
    type: "news",
    content: "Chef Gnarl is proud to introduce our spring menu featuring fresh ingredients from the Enchanted Forest. Try our new Fey-Touched Mushroom Stew, Unicorn Tear Tea, or the popular Phoenix Egg Benedict. Available for a limited time while magical ingredients last.",
    mainImage: "/images/announcements/elves-in-the-kitchen.webp",
    fullContent: `
      <p>Chef Gnarl is proud to introduce our spring menu featuring fresh ingredients from the Enchanted Forest. Try our new Fey-Touched Mushroom Stew, Unicorn Tear Tea, or the popular Phoenix Egg Benedict. Available for a limited time while magical ingredients last.</p>

      <p>Spring has arrived in the Enchanted Forest, bringing with it a bounty of rare and magical ingredients. Our head chef Gnarl Stonekettle, along with our interdimensional kitchen staff, has developed a special seasonal menu to showcase these exceptional flavors.</p>

      <p>Highlights from our new spring menu include:</p>

      <ul>
        <li>
          <strong>Fey-Touched Mushroom Stew</strong> - A hearty blend of luminescent mushrooms harvested under the full moon, slow-cooked with roots and herbs in a cauldron blessed by forest sprites. Each bowl shifts color according to the mood of the diner and is garnished with edible flowers that softly hum when you're about to take a particularly delicious bite.
        </li>
        <li>
          <strong>Unicorn Tear Tea</strong> - Don't worry! No unicorns were harmed in the collection of these tears. Our conservation partners at the Magical Creature Sanctuary collect tears naturally shed during unicorn meditation sessions. This iridescent tea grants temporary enhanced color vision and has been known to cause spontaneous poetry recitation in some patrons.
        </li>
        <li>
          <strong>Phoenix Egg Benedict</strong> - Unfertilized phoenix eggs (certified by the Magical Creature Conservation Society) poached to perfection and served on toasted mana-grain bread with smoked chimera ham and hollandaise sauce infused with saffron harvested from flowers grown in dragon's breath. Garnished with herbs that periodically burst into tiny, harmless flames.
        </li>
        <li>
          <strong>Dryad's Delight Salad</strong> - A mix of forest greens that continue to grow on your plate, meaning your salad is always fresh and never ending! Dressed with millennium-aged treant sap vinaigrette and topped with petals that change flavor with each bite.
        </li>
      </ul>

      <p>For dessert, try our:</p>

      <ul>
        <li>
          <strong>Shifting Seasons Sorbet</strong> - Each spoonful transitions through the four seasons of flavor, from spring's delicate floral notes to summer's bright berries, autumn's rich harvest fruits, and winter's deep spices.
        </li>
        <li>
          <strong>Time-Twisted Tart</strong> - Created by our Machine Elf pastry chef, this remarkable dessert ages backwards. It starts as a perfectly aged tart and becomes progressively fresher as you eat it, until the final bite tastes as if it just came out of the oven.
        </li>
      </ul>

      <p>Our new spring menu will be available until the summer solstice, or while magical ingredients last. Reservation is recommended, especially for weekend dining, as we expect high demand for these limited-time offerings.</p>

      <p>Please inform your server of any magical allergies or dietary restrictions. We can accommodate most needs, including anti-transmutation diets and ectoplasm-free options for our ghostly patrons.</p>
    `,
    cta: {
      text: "Reserve a Tasting Experience",
      link: "/demo"
    },
    relatedAnnouncements: [1, 2]
  }
];

export function load({ params }) {
  const announcement = announcements.find(a => a.slug === params.slug);

  if (!announcement) {
    throw error(404, {
      message: 'Announcement not found'
    });
  }

  // Get related announcements data
  const relatedAnnouncements = announcement.relatedAnnouncements
    ? announcement.relatedAnnouncements.map(id =>
        announcements.find(a => a.id === id)
      ).filter(Boolean)
    : [];

  return {
    announcement,
    relatedAnnouncements
  };
}