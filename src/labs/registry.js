// Every folder under src/labs that contains a lab.js is picked up here, so
// adding a lesson never means editing this file.
const modules = import.meta.glob("./**/lab.js", { eager: true });

export const TRACK_META = {
  react: {
    label: "React",
    blurb: "Components, state and the rendering model.",
  },
  nextjs: {
    label: "Next.js",
    blurb: "Routing, server components and data fetching.",
  },
};

const TRACK_ORDER = Object.keys(TRACK_META);

export const labs = Object.values(modules)
  .map((module) => module.default)
  .sort((a, b) => {
    const trackDelta =
      TRACK_ORDER.indexOf(a.track) - TRACK_ORDER.indexOf(b.track);
    return trackDelta || (a.order ?? 99) - (b.order ?? 99);
  });

export const tracks = TRACK_ORDER.filter((id) =>
  labs.some((lab) => lab.track === id),
).map((id) => ({
  id,
  ...TRACK_META[id],
  labs: labs.filter((lab) => lab.track === id),
}));

export function labsByTrack(trackId) {
  return labs.filter((lab) => lab.track === trackId);
}

export function getTrack(trackId) {
  return tracks.find((track) => track.id === trackId);
}

export function getLab(trackId, labId) {
  return labs.find((lab) => lab.track === trackId && lab.id === labId);
}

export const firstLab = labs[0];
