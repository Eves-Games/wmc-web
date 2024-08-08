interface BaseColour {
  name: string;
  imageSrc: string;
}

interface BannerPattern {
  name: string;
  imageSrc: string;
}

export interface ColouredPattern {
  name: string;
  colour: string;
}

function getPatternPosition(patternName: string, colourName: string) {
  const patternIndex = bannerPatterns.findIndex((banner) => banner.name == patternName);
  const colourIndex = colours.findIndex((colour) => colour.name == colourName);

  const width = (patternIndex + 1) * 80;
  const height = colourIndex * 156;

  return `${-width}px ${-height}px`;
}

interface BannerProps {
  baseColour: string;
  primaryPattern: ColouredPattern | null;
  secondaryPattern: ColouredPattern | null;
}

export function Banner({ baseColour, primaryPattern, secondaryPattern }: BannerProps) {
  return (
    <div className={`banner banner-shadow bg-${baseColour}`}>
      {primaryPattern && (
        <div
          className="size-full"
          style={{
            backgroundImage: "url(/minecraft/banner-patterns.png)",
            backgroundPosition: getPatternPosition(primaryPattern.name, primaryPattern.colour),
          }}
        >
          {secondaryPattern && (
            <div
              className="size-full"
              style={{
                backgroundImage: "url(/minecraft/banner-patterns.png)",
                backgroundPosition: getPatternPosition(secondaryPattern.name, secondaryPattern.colour),
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}

export function getSmallPatternPosition(patternName: string) {
  const patternIndex = bannerPatterns.findIndex((banner) => banner.name == patternName);

  const height = (patternIndex + 1) * 15;
  return `${-height}px -450px`;
}

export const colours = [
  {
    name: "white-dye",
    imageSrc: "/minecraft/item/white_dye.png",
  },
  {
    name: "orange-dye",
    imageSrc: "/minecraft/item/orange_dye.png",
  },
  {
    name: "magenta-dye",
    imageSrc: "/minecraft/item/magenta_dye.png",
  },
  {
    name: "light-blue-dye",
    imageSrc: "/minecraft/item/light_blue_dye.png",
  },
  {
    name: "yellow-dye",
    imageSrc: "/minecraft/item/yellow_dye.png",
  },
  {
    name: "lime-dye",
    imageSrc: "/minecraft/item/lime_dye.png",
  },
  {
    name: "pink-dye",
    imageSrc: "/minecraft/item/pink_dye.png",
  },
  {
    name: "gray-dye",
    imageSrc: "/minecraft/item/gray_dye.png",
  },
  {
    name: "light-gray-dye",
    imageSrc: "/minecraft/item/light_gray_dye.png",
  },
  {
    name: "cyan-dye",
    imageSrc: "/minecraft/item/cyan_dye.png",
  },
  {
    name: "purple-dye",
    imageSrc: "/minecraft/item/purple_dye.png",
  },
  {
    name: "blue-dye",
    imageSrc: "/minecraft/item/blue_dye.png",
  },
  {
    name: "brown-dye",
    imageSrc: "/minecraft/item/brown_dye.png",
  },
  {
    name: "green-dye",
    imageSrc: "/minecraft/item/green_dye.png",
  },
  {
    name: "red-dye",
    imageSrc: "/minecraft/item/red_dye.png",
  },
  {
    name: "black-dye",
    imageSrc: "/minecraft/item/black_dye.png",
  },
] satisfies BaseColour[];

export const bannerPatterns = [
  {
    name: "Roundel",
    imageSrc: "/minecraft/banner-patterns/roundel_banner_pattern.webp",
  },
  {
    name: "Base Dexter Canton",
    imageSrc: "/minecraft/banner-patterns/base_dexter_canton_banner_pattern.webp",
  },
  {
    name: "Base Sinister Canton",
    imageSrc: "/minecraft/banner-patterns/base_sinister_canton_banner_pattern.webp",
  },
  {
    name: "Chief Dexter Canton",
    imageSrc: "/minecraft/banner-patterns/chief_dexter_canton_banner_pattern.webp",
  },
  {
    name: "Chief Sinister Canton",
    imageSrc: "/minecraft/banner-patterns/chief_sinister_canton_banner_pattern.webp",
  },
  {
    name: "Per Fess",
    imageSrc: "/minecraft/banner-patterns/per_fess_banner_pattern.webp",
  },
  {
    name: "Base",
    imageSrc: "/minecraft/banner-patterns/base_banner_pattern.webp",
  },
  {
    name: "Chief",
    imageSrc: "/minecraft/banner-patterns/chief_banner_pattern.webp",
  },
  {
    name: "Per Pale",
    imageSrc: "/minecraft/banner-patterns/per_pale_banner_pattern.webp",
  },
  {
    name: "Pale Dexter",
    imageSrc: "/minecraft/banner-patterns/pale_dexter_banner_pattern.webp",
  },
  {
    name: "Pale",
    imageSrc: "/minecraft/banner-patterns/pale_banner_pattern.webp",
  },
  {
    name: "Pale Sinister",
    imageSrc: "/minecraft/banner-patterns/pale_sinister_banner_pattern.webp",
  },
  {
    name: "Fess",
    imageSrc: "/minecraft/banner-patterns/fess_banner_pattern.webp",
  },
  {
    name: "Cross",
    imageSrc: "/minecraft/banner-patterns/cross_banner_pattern.webp",
  },
  {
    name: "Bend Sinister",
    imageSrc: "/minecraft/banner-patterns/bend_sinister_banner_pattern.webp",
  },
  {
    name: "Bend",
    imageSrc: "/minecraft/banner-patterns/bend_banner_pattern.webp",
  },
  {
    name: "Saltire",
    imageSrc: "/minecraft/banner-patterns/saltire_banner_pattern.webp",
  },
  {
    name: "Per Bend Sinister",
    imageSrc: "/minecraft/banner-patterns/per_bend_sinister_banner_pattern.webp",
  },
  {
    name: "Per Bend",
    imageSrc: "/minecraft/banner-patterns/per_bend_banner_pattern.webp",
  },
  {
    name: "Inverted Chevron",
    imageSrc: "/minecraft/banner-patterns/inverted_chevron_banner_pattern.webp",
  },
  {
    name: "Chevron",
    imageSrc: "/minecraft/banner-patterns/chevron_banner_pattern.webp",
  },
  {
    name: "Lozenge",
    imageSrc: "/minecraft/banner-patterns/lozenge_banner_pattern.webp",
  },
  {
    name: "Chief Indented",
    imageSrc: "/minecraft/banner-patterns/chief_indented_banner_pattern.webp",
  },
  {
    name: "Base Indented",
    imageSrc: "/minecraft/banner-patterns/base_indented_banner_pattern.webp",
  },
  {
    name: "Bordure Indented",
    imageSrc: "/minecraft/banner-patterns/bordure_indented_banner_pattern.webp",
  },
  {
    name: "Bordure",
    imageSrc: "/minecraft/banner-patterns/bordure_banner_pattern.webp",
  },
  {
    name: "Paly",
    imageSrc: "/minecraft/banner-patterns/paly_banner_pattern.webp",
  },
  {
    name: "Field Masoned",
    imageSrc: "/minecraft/banner-patterns/field_masoned_banner_pattern.webp",
  },
  {
    name: "Gradient",
    imageSrc: "/minecraft/banner-patterns/gradient_banner_pattern.webp",
  },
  {
    name: "Creeper Charge",
    imageSrc: "/minecraft/banner-patterns/creeper_charge_banner_pattern.webp",
  },
  {
    name: "Skull Charge",
    imageSrc: "/minecraft/banner-patterns/skull_charge_banner_pattern.webp",
  },
  {
    name: "Flower Charge",
    imageSrc: "/minecraft/banner-patterns/flower_charge_banner_pattern.webp",
  },
  {
    name: "Thing",
    imageSrc: "/minecraft/banner-patterns/thing_banner_pattern.webp",
  },
  {
    name: "Per Bend Inverted",
    imageSrc: "/minecraft/banner-patterns/per_bend_inverted_banner_pattern.webp",
  },
  {
    name: "Per Bend Sinister Inverted",
    imageSrc: "/minecraft/banner-patterns/per_bend_sinister_inverted_banner_pattern.webp",
  },
  {
    name: "Base Gradient",
    imageSrc: "/minecraft/banner-patterns/base_gradient_banner_pattern.webp",
  },
  {
    name: "Per Fess Inverted",
    imageSrc: "/minecraft/banner-patterns/per_fess_inverted_banner_pattern.webp",
  },
  {
    name: "Per Pale Inverted",
    imageSrc: "/minecraft/banner-patterns/per_pale_inverted_banner_pattern.webp",
  },
  {
    name: "Globe",
    imageSrc: "/minecraft/banner-patterns/globe_banner_pattern.webp",
  },
  {
    name: "Snout",
    imageSrc: "/minecraft/banner-patterns/snout_banner_pattern.webp",
  },
] satisfies BannerPattern[];
