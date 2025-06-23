// Format runtime to hours and minutes
export const formatRuntime = (minutes) => {
  if (!minutes) return "N/A";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

// Format money values
export const formatMoney = (value) => {
  if (!value) return "N/A";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
};

// Popular OTT platforms to prioritize in display
export const popularOttPlatforms = [
  10, // Amazon Prime
  8, // Netflix
  337, // Disney Plus
  2, // Apple TV
  384, // HBO Max
  15, // Hulu
  386, // Peacock
  283, // Crunchyroll
  350, // Apple TV Plus
  531, // Paramount Plus
];

// Function to filter and sort providers by popularity
export const getTopProviders = (providers, maxCount = 5) => {
  if (!providers || providers.length === 0) return [];

  // Sort by popular platforms first, then alphabetically
  return [...providers]
    .sort((a, b) => {
      const aPopIndex = popularOttPlatforms.indexOf(a.provider_id);
      const bPopIndex = popularOttPlatforms.indexOf(b.provider_id);

      // If both are popular platforms, sort by order in popularOttPlatforms
      if (aPopIndex !== -1 && bPopIndex !== -1) {
        return aPopIndex - bPopIndex;
      }

      // If only a is popular, it comes first
      if (aPopIndex !== -1) return -1;

      // If only b is popular, it comes first
      if (bPopIndex !== -1) return 1;

      // If neither is popular, sort alphabetically
      return a.provider_name.localeCompare(b.provider_name);
    })
    .slice(0, maxCount);
};
