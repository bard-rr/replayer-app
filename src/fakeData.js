export const fakeFunnel = {
  funnel: {
    name: 'fakeFunnelName',
    sessionFilters: [
      { filterType: "length", startLength: 5000, endLength: 25000 },
      { filterType: "originHost", textContent: "partyApp" },
    ],
    eventSequence: [
      { eventType: "click", textContent: "Sign In" },
      { eventType: "click", textContent: "Generate Link" },
      { eventType: "click", textContent: "Copy Link" },
    ],
  },
  results: {
    totalFilteredSessions: 4,
    eventSequenceResults: [
      {
        numberCompleted: 4,
        sessionsCompleted: [
          "fc5028a1-6e48-41a7-a5c8-49ab956f01a5",
          "1ea361a2-0003-4754-aefb-3a79a8f1d470",
          "60b682ee-d27e-4202-ada6-864ac3f6f320",
          "3ecd414e-3213-499b-9698-82fc660324b4",
        ],
        numberNotCompleted: 0,
        sessionsNotCompleted: [],
      },
      {
        numberCompleted: 3,
        sessionsCompleted: [
          "60b682ee-d27e-4202-ada6-864ac3f6f320",
          "fc5028a1-6e48-41a7-a5c8-49ab956f01a5",
          "1ea361a2-0003-4754-aefb-3a79a8f1d470",
        ],
        numberNotCompleted: 1,
        sessionsNotCompleted: ["3ecd414e-3213-499b-9698-82fc660324b4"],
      },
      {
        numberCompleted: 1,
        sessionsCompleted: ["60b682ee-d27e-4202-ada6-864ac3f6f320"],
        numberNotCompleted: 1,
        sessionsNotCompleted: ["1ea361a2-0003-4754-aefb-3a79a8f1d470"],
      },
    ],
  },
};
