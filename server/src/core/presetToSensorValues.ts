export enum Preset {
  WINE = "WINE",
  BEER = "BEER",
  EGG = "EGG"
}

export default {
  [Preset.WINE]: {
    temperature: {
      min: 1,
      max: 11
    },
    humidity: {
      min: 11,
      max: 111
    }
  },
  [Preset.BEER]: {
    temperature: {
      min: 2,
      max: 22
    },
    humidity: {
      min: 22,
      max: 222
    }
  },
  [Preset.EGG]: {
    temperature: {
      min: 3,
      max: 33
    },
    humidity: {
      min: 33,
      max: 333
    }
  }
};
