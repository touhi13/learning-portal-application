const getRank = (total, scores) => {
    console.log({ total, scores })
      const sortedScores = scores.sort((a, b) => b - a);
      let rank = 1;
      for (let i = 0; i < sortedScores.length; i++) {
        if (sortedScores[i] === total) {
          return rank;
        }
        if (sortedScores[i] > total) {
          rank++;
        }
      }
      return sortedScores.length + 1;
  }
  export default getRank;
