from scipy.sparse import csr_matrix
import numpy as np
import pandas as pd
from sklearn.neighbors import NearestNeighbors

ratings = pd.read_csv('ratings.csv')
movies = pd.read_csv('movies1.csv')


def find_similar_movies(movie_id,  k, metric='cosine'):
    
    df=ratings
    """
        Generates a sparse matrix from ratings dataframe.
        
        Args:
            df: pandas dataframe containing 3 columns (userId, movieId, rating)
        
        Returns:
            X: sparse matrix
            user_mapper: dict that maps user id's to user indices
            user_inv_mapper: dict that maps user indices to user id's
            movie_mapper: dict that maps movie id's to movie indices
            movie_inv_mapper: dict that maps movie indices to movie id's
    """
    M = df['userId'].nunique()
    N = df['movieId'].nunique()

    user_mapper = dict(zip(np.unique(df["userId"]), list(range(M))))
    movie_mapper = dict(zip(np.unique(df["movieId"]), list(range(N))))
        
    user_inv_mapper = dict(zip(list(range(M)), np.unique(df["userId"])))
    movie_inv_mapper = dict(zip(list(range(N)), np.unique(df["movieId"])))
        
    user_index = [user_mapper[i] for i in df['userId']]
    item_index = [movie_mapper[i] for i in df['movieId']]

    X = csr_matrix((df["rating"], (user_index,item_index)), shape=(M,N))
    """
    Finds k-nearest neighbours for a given movie id.
    
    Args:
        movie_id: id of the movie of interest
        X: user-item utility matrix
        k: number of similar movies to retrieve
        metric: distance metric for kNN calculations
    
    Output: returns list of k similar movie ID's
    """
    X = X.T
    neighbour_ids = []
    
    if movie_id not in movie_mapper:
        print("Movie ID not found in the dataset.")
        return neighbour_ids
    
    movie_ind = movie_mapper[movie_id]
    movie_vec = X[movie_ind]
    if isinstance(movie_vec, (np.ndarray)):
        movie_vec = movie_vec.reshape(1,-1)
    # use k+1 since kNN output includes the movieId of interest
    kNN = NearestNeighbors(n_neighbors=k+1, algorithm="brute", metric=metric)
    kNN.fit(X)
    neighbour = kNN.kneighbors(movie_vec, return_distance=False)
    for i in range(0,k):
        n = neighbour.item(i)
        neighbour_ids.append(movie_inv_mapper[n])
    neighbour_ids.pop(0)
    return neighbour_ids
