export { formatDateIntoDays, longestWorkingPair };

function formatDateIntoDays(data) {
  return data.map((row) =>
    row.map((item, index) =>
      index > 1
        ? Math.round(
            new Date(
              (item && item !== 'NULL' && item !== 'null' && item) || Date.now()
            ).getTime() /
              (1000 * 60 * 60 * 24)
          )
        : item
    )
  );
}

// Turns the dates into days

function longestWorkingPair(data) {
  return data.map((array) =>
    array.filter((el) => el.daysWorked === array[0].daysWorked)
  );
}

// identifies the pair that has worked the most together(returns all that have the same amount of days in case of draw)
