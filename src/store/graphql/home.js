export const getAllGamesByPage = `
  query ($skit:Float, take:Float) {
    findAllGamesPaginated(pagination:{skip:$skip,take:$take}) {
      id,
      gameId,
      name,
      imageUrl,
      description,
      category,
      availability,
    }
  }
  `;

export const getAllGames = `
query {
  findAllGames {
    id,
    gameId,
		name,
    imageUrl,
    description,
    category,
    availability,
  }
}
`;

export const getGameByCategory = `
query ($categories: [String!]) {
  findAllGamesByCategories(input:{categories:$categories}) {
    id,
    gameId,
		name,
    imageUrl,
    description,
    category,
    availability,
  }
}
`;