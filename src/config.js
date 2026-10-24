// Single source of truth for the invitation details.
export const GROOM = { name: "Rochan", parents: "Mr. & Mrs. Desai" };
export const BRIDE = { name: "Nikita", parents: "Mr. & Mrs. Savanur" };

export const VENUE = {
  name: "Tekfarm Retreat and Marriage Hall",
  address: "Jogellapur, NH-4 Bypass, near Nuggikeri Temple, Hubballi, Karnataka 580114",
};
export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${VENUE.name}, ${VENUE.address}`)}`;

// Wedding day (year assumed 2026; change if needed). Countdown targets the first event.
export const DAYS = [
  {
    date: "2026-12-14",
    events: [
      { id: "muhurtham", title: "Muhurtam", time: "8:42 AM", feature: true },
      { id: "akshata", title: "Akshate", time: "12:30 PM" },
    ],
  },
];

export const WEDDING_DATE = new Date("2026-12-14T08:42:00");

const fmt = (iso, opts) => new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", opts);
export const dayLabel = (iso) => fmt(iso, { weekday: "long", day: "numeric", month: "long", year: "numeric" });
export const DATE_RANGE = fmt(DAYS[0].date, { day: "numeric", month: "long", year: "numeric" });
export const dayShort = (iso) => fmt(iso, { weekday: "short", day: "numeric", month: "short" });
