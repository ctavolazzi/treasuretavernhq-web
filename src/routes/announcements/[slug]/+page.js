import { error } from '@sveltejs/kit';

// This is where you would typically fetch from an API or database
// For this example, we're using the hard-coded announcements data
const announcements = [
  {
    id: 1,
    slug: "goblin-infestation-cleanup",
    date: "March 10, 2025",
    title: "Goblin Infestation Cleanup Complete",
    content: "After weeks of battling the unexpected goblin infestation in our cellar, our brave adventurers have finally cleared out the last of the vermin. Special thanks to the Dwarven Extermination Guild for their assistance with the particularly stubborn goblin king who had established a throne made entirely of stolen silverware.",
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
    }
  },
  {
    id: 2,
    slug: "machine-elves-strike-resolved",
    date: "March 15, 2025",
    title: "Machine Elves Strike Resolved",
    content: "The labor dispute with our Machine Elves kitchen staff has finally been settled. Their demands for 'chronologically flexible lunch breaks' and 'interdimensional vacation days' have been accommodated. Patrons may notice our menu now includes several dishes that technically don't exist on this plane of reality.",
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
    }
  },
  {
    id: 3,
    slug: "dragon-mating-season",
    date: "March 22, 2025",
    title: "Warning: Dragon Mating Season",
    content: "Patrons are advised to use the eastern entrance until further notice, as a pair of adolescent copper dragons have claimed our western tower for courtship rituals. The local Dragonriders Guild assures us this is temporary, though the occasional rain of molten copper may continue through the month. Complimentary fireproof umbrellas available at the coat check.",
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
    }
  }
];

export function load({ params }) {
  const announcement = announcements.find(a => a.slug === params.slug);

  if (!announcement) {
    throw error(404, {
      message: 'Announcement not found'
    });
  }

  return {
    announcement
  };
}