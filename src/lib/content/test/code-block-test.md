---
title: "Code Block Tests"
date: "April 15, 2025"
author: "Test User"
---

# Code Block Tests

This page is designed to test our code block styling and copy button functionality.

## JavaScript Example

```javascript
// This is a JavaScript example
function magicalIncantation(spell) {
  const power = spell.length * 3.14159;

  if (power > 100) {
    return `The spell "${spell}" is too powerful to contain!`;
  }

  return {
    name: spell,
    power: power,
    effects: ['shimmer', 'glow', 'transform'],
    castTime: Math.floor(power / 10) + ' seconds'
  };
}

// Try casting a spell
const result = magicalIncantation('Arcanum Mysterium');
console.log(result);
```

## CSS Example

```css
/* Mystical styling for arcane elements */
.magical-element {
  background: linear-gradient(135deg, #2c0a37 0%, #1a1a45 100%);
  border: 2px solid #7b2cbf;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(123, 44, 191, 0.5),
              inset 0 0 30px rgba(123, 44, 191, 0.2);
  color: #d1b3ff;
  font-family: 'Enchanted Script', serif;
  padding: 2rem;
  position: relative;
  transition: all 0.3s ease;
}

.magical-element:hover {
  transform: translateY(-5px) rotate(1deg);
  box-shadow: 0 10px 25px rgba(123, 44, 191, 0.6),
              inset 0 0 30px rgba(123, 44, 191, 0.3);
}

.magical-element::before {
  content: '✧';
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 24px;
  color: #9b6dff;
}
```

## HTML Example

```html
<div class="magical-container">
  <h2 class="spell-title">Arcane Invocation</h2>

  <div class="spell-components">
    <span class="component verbal">Verbal</span>
    <span class="component somatic">Somatic</span>
    <span class="component material">Material (arcane dust)</span>
  </div>

  <p class="spell-description">
    When cast, this spell creates a shimmering portal to the
    <strong>Ethereal Plane</strong>, allowing glimpses into
    realms beyond mortal comprehension.
  </p>

  <button class="cast-button">
    <i class="magic-icon"></i>
    Cast Spell
  </button>
</div>
```

## Python Example

```python
# A mystical calculation system
import random
from datetime import datetime

class MagicalCalculator:
    def __init__(self, wizard_name):
        self.wizard_name = wizard_name
        self.power_level = random.randint(1, 100)
        self.spells_cast = 0

    def cast_spell(self, spell_name, difficulty):
        """Attempt to cast a magical spell"""
        current_hour = datetime.now().hour
        moon_phase = self._calculate_moon_phase()

        # Magical calculations
        chance_of_success = (
            self.power_level +
            (30 if 0 <= current_hour <= 3 else 0) -  # Magic is stronger at night
            difficulty * 2 +
            moon_phase * 5
        ) / 100

        success = random.random() < chance_of_success
        self.spells_cast += 1

        return {
            "wizard": self.wizard_name,
            "spell": spell_name,
            "success": success,
            "power_used": difficulty * (1.5 if success else 0.5),
            "moon_phase": moon_phase
        }

    def _calculate_moon_phase(self):
        """Returns a value from 0-1 representing the moon phase"""
        # This is a simplified calculation
        day_of_year = datetime.now().timetuple().tm_yday
        return (day_of_year % 28) / 28

# Create a new wizard
merlin = MagicalCalculator("Merlin")
result = merlin.cast_spell("Time Dilation", 75)
print(f"Spell result: {'Success' if result['success'] else 'Failure'}")
```

## Longer Example to Test Scrolling

```javascript
/**
 * The Arcane Reality Manipulator
 * A mystical system for bending the fabric of spacetime
 */
class RealityManipulator {
  constructor(practitionerName) {
    this.practitionerName = practitionerName;
    this.energyReserves = 100;
    this.manipulationHistory = [];
    this.dimensions = {
      time: { distortion: 0, stability: 1 },
      space: { distortion: 0, stability: 1 },
      probability: { distortion: 0, stability: 1 },
      perception: { distortion: 0, stability: 1 }
    };

    console.log(`Reality Manipulator initialized for ${practitionerName}`);
  }

  /**
   * Bend a specific dimension of reality
   * @param {string} dimension - The dimension to manipulate (time/space/probability/perception)
   * @param {number} intensity - How strongly to bend reality (1-10)
   * @param {string} purpose - The intended outcome
   * @returns {object} The result of the manipulation
   */
  manipulateDimension(dimension, intensity, purpose) {
    if (!this.dimensions[dimension]) {
      throw new Error(`Unknown dimension: ${dimension}. Reality remains intact.`);
    }

    if (intensity < 1 || intensity > 10) {
      throw new Error("Intensity must be between 1 and 10. The forces of reality resist improper manipulation.");
    }

    // Calculate energy cost based on current stability and intensity
    const energyCost = Math.ceil(intensity * 10 / this.dimensions[dimension].stability);

    if (this.energyReserves < energyCost) {
      return {
        success: false,
        message: `Insufficient energy reserves (${this.energyReserves}/${energyCost} required)`,
        sideEffects: ["practitioner fatigue", "minor reality fracture"]
      };
    }

    // Deduct energy cost
    this.energyReserves -= energyCost;

    // Calculate success probability
    const stabilityFactor = this.dimensions[dimension].stability;
    const successProbability = Math.min(0.95, (stabilityFactor * 0.8) - (intensity * 0.05));
    const successful = Math.random() <= successProbability;

    // Update dimension values
    this.dimensions[dimension].distortion += successful ? intensity * 0.1 : intensity * 0.2;
    this.dimensions[dimension].stability -= intensity * 0.05;

    // Normalize values
    if (this.dimensions[dimension].stability < 0.1) this.dimensions[dimension].stability = 0.1;
    if (this.dimensions[dimension].distortion > 1) this.dimensions[dimension].distortion = 1;

    // Record the manipulation
    const timestamp = new Date().toISOString();
    const record = {
      timestamp,
      dimension,
      intensity,
      purpose,
      successful,
      energyCost,
      newDistortion: this.dimensions[dimension].distortion,
      newStability: this.dimensions[dimension].stability
    };

    this.manipulationHistory.push(record);

    // Generate side effects based on distortion level
    const sideEffects = this.calculateSideEffects(dimension, intensity, successful);

    return {
      success: successful,
      energyRemaining: this.energyReserves,
      dimensionStatus: { ...this.dimensions[dimension] },
      sideEffects,
      message: successful
        ? `Reality successfully manipulated for: ${purpose}`
        : `Manipulation attempt failed. Reality resisted the change.`
    };
  }

  /**
   * Calculate possible side effects of reality manipulation
   */
  calculateSideEffects(dimension, intensity, successful) {
    const sideEffects = [];
    const distortion = this.dimensions[dimension].distortion;

    // Common side effects based on the manipulated dimension
    if (dimension === 'time') {
      if (distortion > 0.3) sideEffects.push("temporal echoes");
      if (distortion > 0.5) sideEffects.push("chronological inconsistencies");
      if (distortion > 0.8) sideEffects.push("time loops");
    } else if (dimension === 'space') {
      if (distortion > 0.3) sideEffects.push("spatial warping");
      if (distortion > 0.5) sideEffects.push("distance irregularities");
      if (distortion > 0.8) sideEffects.push("spontaneous teleportation");
    } else if (dimension === 'probability') {
      if (distortion > 0.3) sideEffects.push("unlikely coincidences");
      if (distortion > 0.5) sideEffects.push("probability storms");
      if (distortion > 0.8) sideEffects.push("paradox manifestations");
    } else if (dimension === 'perception') {
      if (distortion > 0.3) sideEffects.push("minor hallucinations");
      if (distortion > 0.5) sideEffects.push("shared illusions");
      if (distortion > 0.8) sideEffects.push("perception bleed");
    }

    // Add more severe effects for failed manipulations
    if (!successful) {
      sideEffects.push("reality backlash");
      if (intensity > 5) sideEffects.push("temporary practitioner incapacitation");
      if (intensity > 8) sideEffects.push("dimensional instability");
    }

    return sideEffects;
  }

  /**
   * Stabilize reality to reduce distortion
   */
  stabilizeReality() {
    if (this.energyReserves < 30) {
      return {
        success: false,
        message: "Insufficient energy to stabilize reality"
      };
    }

    this.energyReserves -= 30;

    // Reduce distortion across all dimensions
    Object.keys(this.dimensions).forEach(dim => {
      this.dimensions[dim].distortion = Math.max(0, this.dimensions[dim].distortion - 0.3);
      this.dimensions[dim].stability = Math.min(1, this.dimensions[dim].stability + 0.2);
    });

    this.manipulationHistory.push({
      timestamp: new Date().toISOString(),
      action: "stabilization",
      energyCost: 30,
      newStatus: { ...this.dimensions }
    });

    return {
      success: true,
      message: "Reality partially stabilized",
      dimensionStatus: this.dimensions,
      energyRemaining: this.energyReserves
    };
  }

  /**
   * Replenish energy reserves through meditation
   * @param {number} hours - Hours spent meditating
   */
  meditateToRestoreEnergy(hours) {
    if (hours <= 0) return { success: false, message: "Invalid meditation time" };

    const baseRecovery = 10;
    const recoveryRate = hours * baseRecovery;

    // Calculate total recovery with diminishing returns
    let totalRecovery = 0;
    for (let i = 0; i < hours; i++) {
      totalRecovery += baseRecovery / (1 + (i * 0.2));
    }

    totalRecovery = Math.floor(totalRecovery);
    this.energyReserves = Math.min(100, this.energyReserves + totalRecovery);

    this.manipulationHistory.push({
      timestamp: new Date().toISOString(),
      action: "meditation",
      duration: hours,
      energyRecovered: totalRecovery,
      newEnergy: this.energyReserves
    });

    return {
      success: true,
      message: `Recovered ${totalRecovery} energy through ${hours} hours of meditation`,
      energyRemaining: this.energyReserves
    };
  }
}

// Create a new reality manipulator
const manipulator = new RealityManipulator("Dr. Strange");

// Example usage
try {
  // Slow down time to study an ancient text
  const timeResult = manipulator.manipulateDimension(
    "time",
    3,
    "slow time to study ancient text"
  );
  console.log(timeResult);

  // Bend space to reach a distant location
  const spaceResult = manipulator.manipulateDimension(
    "space",
    5,
    "create a shortcut to the Sanctum Sanctorum"
  );
  console.log(spaceResult);

  // Stabilize after multiple manipulations
  const stabilization = manipulator.stabilizeReality();
  console.log(stabilization);

  // Meditate to recover energy
  const meditation = manipulator.meditateToRestoreEnergy(4);
  console.log(meditation);

} catch (error) {
  console.error("A critical error in reality manipulation:", error.message);
}
```

These examples should be sufficient to test our code block styling and copy functionality!