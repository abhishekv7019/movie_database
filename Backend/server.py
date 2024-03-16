
from flask import Flask,jsonify,request,session
from flask_cors import CORS
from flask_mysqldb import MySQL
from datetime import timedelta
import mysql.connector
from Auth import login_bp, signup_bp
from recommendation import *
import numpy as np
import pandas as pd


app = Flask(__name__)
cors = CORS(app)

try:
    connection = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="movie"
    )
    
    cursor = connection.cursor()
    

   
except mysql.connector.Error as error:
    print("Error connecting to MySQL:", error)
    
finally:
    print("Database connected")


app.secret_key = b'&<do~$&]9v&ri86'

app.register_blueprint(login_bp)
app.register_blueprint(signup_bp)


@app.route('/',methods=['GET',"POST"])
def searchtop1():
    if request.method == 'POST':
        username = request.json['username']
        query1 = f"""
            SELECT m.movie_id,m.title,m.posterpath,m.tmdb_rating
            FROM movie m
            LEFT JOIN list_content lc ON m.movie_id = lc.movie_id
            LEFT JOIN users u ON lc.u_id = u.u_id
            LEFT JOIN list l ON lc.u_id = l.u_id
            WHERE lc.movie_id IS NULL OR (u.username = '{username}' AND l.list_no IS NULL)
            ORDER BY m.tmdb_rating DESC
            LIMIT 5;
        """
        cursor.execute(query1)
        top_movies = cursor.fetchall()
        
        query2 = f"""
            SELECT m.movie_id,m.title,m.posterpath,m.tmdb_rating
            FROM movie m
            JOIN list_content lc ON m.movie_id = lc.movie_id
            JOIN users u ON lc.u_id = u.u_id
            JOIN list l ON lc.u_id = l.u_id AND lc.list_no = l.list_no
            WHERE u.username = '{username}' AND l.list_no = 1
            ORDER BY lc.watch DESC
            LIMIT 5;
        """
        cursor.execute(query2)
        recent = cursor.fetchall()
        
        print(recent[0][0])
        
        query3 = f"""
            SELECT m.movie_id,m.title,m.posterpath,m.tmdb_rating
            FROM movie m
            INNER JOIN list_content lc ON m.movie_id = lc.movie_id
            INNER JOIN list l ON lc.u_id = l.u_id AND lc.list_no = l.list_no
            INNER JOIN users u ON lc.u_id = u.u_id
            WHERE u.username = '{username}' AND l.list_no = 2
            LIMIT 5;
        """
        cursor.execute(query3)
        upcoming = cursor.fetchall()
        
        
        if ((ratings['movieId'] == recent[0][0]).sum()>0):
            movie_ids11 = find_similar_movies(recent[0][0],  metric='cosine', k=10)
            print(movie_ids11)
            query4 = "SELECT movie_id,title,posterpath,tmdb_rating FROM movie WHERE movie_id IN ({}) order by movie_id LIMIT 5".format(','.join(map(str, movie_ids11)))
            cursor.execute(query4)
            recommend = cursor.fetchall()
        
        else:
            
            recommend = top_movies
            
    
        return jsonify({
            "recent":recent,
            "upcoming":upcoming,
            "recommend":recommend,
            "top_rated": top_movies
        })


@app.route('/profilestatics',methods=['GET',"POST"])
def statics():
    if request.method=="GET":
       
       
        return "hi"
    if request.method=="POST":
        loggedinuser = request.json['loggedinuser']
        query = """
        SELECT count(distinct lc.movie_id)
        FROM list_content as lc , list as l , users as u
        where u.username= %s
        and u.u_id=lc.u_id;
        """
        cursor.execute(query,(loggedinuser,))
        totalmovies = cursor.fetchone()[0]
        print(totalmovies)
        
        
        query1 = """
        SELECT count(f.p_id)
        FROM follow as f, users as u
        where u.username=%s
        and u.u_id=f.u_id
        """

        cursor.execute(query1,(loggedinuser,))

    
        peoplefollowing = cursor.fetchone()[0]
        print(peoplefollowing)
        
        
        
        query = """
        SELECT avg(r.score) 
        FROM list_content as r , users as u
        where u.username=%s
        and u.u_id=r.u_id
        """
       
        cursor.execute(query,(loggedinuser,))

    
        average_score = cursor.fetchone()[0]
        if(average_score==None):
            average_score=0
        print(average_score)
        
        
        
        query = "SELECT email FROM users WHERE username = %s"
        username = loggedinuser
        cursor.execute(query, (username,))
        email = cursor.fetchall()
        
        
        query = """
        SELECT people.p_id, people.name, people.imgpath
        FROM follow
        INNER JOIN people ON follow.p_id = people.p_id
        INNER JOIN users ON follow.u_id = users.u_id
        WHERE users.username = %s
        order by people.p_id
        """
        cursor.execute(query, (loggedinuser,))
        pplfollowing = cursor.fetchall()
        
        
        
        query99="""
            SELECT movie.movie_id, movie.posterpath
            FROM users
            INNER JOIN list ON users.u_id = list.u_id
            INNER JOIN list_content ON list.u_id = list_content.u_id AND list.list_no = list_content.list_no
            INNER JOIN movie ON list_content.movie_id = movie.movie_id
            WHERE users.username =%s AND list.listname = 'favorites';
        """
        cursor.execute(query99,(loggedinuser,))
        
        favorites = cursor.fetchall()
        
        stats={
            "totalmovies":totalmovies,
            "peoplefollowing":peoplefollowing,
            "average_score":round(average_score,1),
            "email":email[0],
            "pplfollowing":pplfollowing,
            "favorites":favorites,
            "Action":'0',
            "Adventure":'0',
            "Animation":'0',
            "Comedy":'0',
            "Crime":'0',
            "Drama":'0',
            "Family":'0',
            "Fantasy":'0',
            "History":'0',
            "Horror":'0',
            "Music":'0',
            "Mystery":'0',
            "Romance":'0',
            "Science_Fiction":'0',
            "Thriller":'0',
            "TV_Movie":'0',
            "War":'0',
            "Western":'0',
        }
        
        
        
        query199="""SELECT g.genre AS genre, COUNT(*) AS total_count
                FROM genres g
                INNER JOIN moviegenres mg ON g.genre_id = mg.genre_id
                INNER JOIN movie m ON mg.movie_id = m.movie_id
                INNER JOIN list_content lc ON lc.movie_id = m.movie_id
                INNER JOIN list l ON lc.u_id = l.u_id AND lc.list_no = l.list_no 
                INNER JOIN users u ON l.u_id = u.u_id
                WHERE u.username = %s
                AND (lc.list_no = 1 OR l.listname = 'Completed')
                GROUP BY g.genre;"""
        
        cursor.execute(query199,(loggedinuser,))
        
        genres=cursor.fetchall()
        
        for row in genres:
            stats[row[0]]=row[1]
        
        return jsonify(stats)
    



@app.route('/followpeople', methods=['GET','POST'])
def followpeople():
    if request.method=="GET":
        return "HI"
    if request.method=="POST":
        peopleid = request.json['peopleid']
        username = request.json['username']
        print(peopleid,username)
        query="""SELECT u_id 
                FROM users
                where username=%s"""
        cursor.execute(query,(username,))
        uid=cursor.fetchall()
        print(uid[0][0])
        
        data_to_insert = (uid[0][0], peopleid)
        insert_query = "INSERT INTO follow (u_id,p_id) VALUES (%s, %s)"
        cursor.execute(insert_query, data_to_insert)
        connection.commit()
        return "succes"
    
    
@app.route('/unfollowpeople', methods=['GET','POST'])
def unfollowpeople():
    if request.method=="GET":
        return "HI"
    if request.method=="POST":
        peopleid = request.json['peopleid']
        username = request.json['username']
        print(peopleid,username)
        query="""SELECT u_id 
                FROM users
                where username=%s"""
        cursor.execute(query,(username,))
        uid=cursor.fetchall()
        print(uid[0][0])
        
        data_to_delete = (uid[0][0], peopleid)


        delete_query = "DELETE FROM follow WHERE u_id = %s AND p_id = %s"

        cursor.execute(delete_query, data_to_delete)
        connection.commit()
        return "succes"




		
@app.route('/search',methods=['GET',"POST"])
def searchtop():
    if request.method=='GET':
        sql_query = "SELECT movie_id,title,posterpath,tmdb_rating FROM movie ORDER BY tmdb_rating DESC LIMIT 5"
        cursor.execute(sql_query)
        top_movies = cursor.fetchall()
        
        
        query = """
            SELECT m.movie_id, m.title, m.posterpath, m.tmdb_rating
            FROM movie as m, moviegenres as mg, genres as g
            WHERE m.movie_id = mg.movie_id 
                AND mg.genre_id = g.genre_id
                AND g.genre = 'Action'
            ORDER BY tmdb_rating DESC
            LIMIT 5;
        """
        cursor.execute(query)
        action_movies = cursor.fetchall()
        
        
        
        query1 = """
            SELECT m.movie_id, m.title, m.posterpath, m.tmdb_rating
            FROM movie as m, moviegenres as mg, genres as g
            WHERE m.movie_id = mg.movie_id 
                AND mg.genre_id = g.genre_id
                AND g.genre = 'Romance'
            ORDER BY tmdb_rating DESC
            LIMIT 5;
        """
        cursor.execute(query1)
        romance_movies = cursor.fetchall()
        
        
        
        query2 = """
            SELECT m.movie_id, m.title, m.posterpath, m.tmdb_rating
            FROM movie as m, moviegenres as mg, genres as g
            WHERE m.movie_id = mg.movie_id 
                AND mg.genre_id = g.genre_id
                AND g.genre = 'Thriller'
            ORDER BY tmdb_rating DESC
            LIMIT 5;
        """
        cursor.execute(query2)
        thriller_movies = cursor.fetchall()
        
        
        
        query3 = """
            SELECT m.movie_id, m.title, m.posterpath, m.tmdb_rating
            FROM movie as m, moviegenres as mg, genres as g
            WHERE m.movie_id = mg.movie_id 
                AND mg.genre_id = g.genre_id
                AND g.genre = 'Comedy'
            ORDER BY tmdb_rating DESC
            LIMIT 5;
        """
        cursor.execute(query3)
        comedy_movies = cursor.fetchall()
        
        
    
        return jsonify({
            "top_movies":top_movies,
            "action_movies":action_movies,
            "romance_movies":romance_movies,
            "thriller_movies": thriller_movies,
            "comedy_movies":comedy_movies
        })

@app.route('/searchbar',methods=['GET',"POST"])
def searchbar():
    if request.method=='GET':
        return "HI"
    if request.method=='POST':
        search = request.json['query']
        release_year = request.json['yeardate']
        genre_id = request.json['selectedOption']
        language = request.json['selectedOption1']
       
    
        search_term = f'%{search}%'
    
        
        
        sql_query = """
            SELECT DISTINCT m.title, m.posterpath,m.movie_id
            FROM movie m
            JOIN moviegenres mg ON m.movie_id = mg.movie_id
            WHERE
                (m.title LIKE %s)
                AND (%s IS NULL OR YEAR(m.release_date) = %s)
                AND (%s IS NULL OR m.language = %s)
                AND (%s IS NULL OR mg.genre_id = %s)
            LIMIT 200
        """

    
       
        release_year_param = release_year if release_year else None
        language_param = None if language == '' else language
        genre_id_param = None if genre_id=="" else genre_id

       
        params = (search_term, release_year_param, release_year_param, language_param, language_param, genre_id_param, genre_id_param)
        cursor.execute(sql_query, params)
  
        
        results = cursor.fetchall()
        return jsonify(results)
    
    
@app.route('/peoplepage',methods=['GET',"POST"])
def peoplepage():
    if request.method=="POST":
        print("post request recived")
        people_id = request.json['peopleid']
        username = request.json['username']
        query1 = """
        SELECT f.p_id
        FROM follow as f, users as u
        where u.username=%s
        and u.u_id=f.u_id
        """
        
        follow=False
        cursor.execute(query1,(username,))
        peoplefollowing = cursor.fetchall()
        
        for i in peoplefollowing:
            if(str(i[0])==str(people_id)):
                print(i[0]," ",people_id)
                follow=True
                break
        
        querypepleinfo=f"""SELECT * 
        FROM people as p
        where p.p_id={people_id}
        """
        cursor.execute(querypepleinfo)
        results1 = cursor.fetchall()
        
        
        querymoviesacted = f"""
        SELECT c.role, m.title , m.posterpath,m.movie_id
        FROM cast AS c, movie AS m
        WHERE c.movie_id = m.movie_id
        AND c.p_id = {people_id}
        UNION
        SELECT cr.job, m.title ,m.posterpath ,m.movie_id
        FROM crew AS cr, movie AS m
        WHERE cr.movie_id = m.movie_id
        AND cr.p_id = {people_id}
        """

        
        cursor.execute(querymoviesacted)
        results2 = cursor.fetchall()
        
        
        
        peopledetails={
            "id":results1[0][0],
            "nameee":results1[0][1],
            "dob":results1[0][2].strftime("%Y-%m-%d"),
            "bio":results1[0][3],
            "posterpath":results1[0][4],
            "moviesactedin":results2,
            "countofmovies":len(results2),
            "follow":follow
        }
        
         
        return jsonify(peopledetails)
    
    
@app.route('/lists',methods=["POST"])
def completed():
    if request.method=='POST':
        username = request.json['username']
    query1 = """
        SELECT lc.movie_id, m.title, m.posterpath, lc.score, lc.watch
        FROM users u
        JOIN list l ON u.u_id = l.u_id
        JOIN list_content lc ON l.u_id = lc.u_id AND l.list_no = lc.list_no
        JOIN movie m ON lc.movie_id = m.movie_id
        WHERE u.username = %s AND l.list_no = 1;
    """
    cursor.execute(query1, (username,))
    completed = [
        {   'movie_id': movie[0],
            'title': movie[1],
            'img': movie[2],
            'score': movie[3],
            'date': movie[4].strftime("%Y-%m-%d")
        } for movie in cursor.fetchall()
    ]
    
    query2 = """
        SELECT lc.movie_id, m.title, m.posterpath
        FROM users u
        JOIN list l ON u.u_id = l.u_id
        JOIN list_content lc ON l.u_id = lc.u_id AND l.list_no = lc.list_no
        JOIN movie m ON lc.movie_id = m.movie_id
        WHERE u.username = %s AND l.list_no = 2;
    """
    cursor.execute(query2, (username,))
    planning = [
        {   'movie_id': movie[0],
            'title': movie[1],
            'img': movie[2],
        } for movie in cursor.fetchall()
    ]
    
    response = {
            "completed": completed,
            "planning": planning
    }
    return jsonify(response)





@app.route('/get_movie_details', methods=['POST'])
def get_movie_details():
    if request.method=='POST':
        movie_id = request.json['movieid']
        username = request.json['username']
        query1 = """
        SELECT * 
        FROM movie
        WHERE movie_id=%s
        """
        cursor.execute(query1, (movie_id,))
        movie = cursor.fetchall()
        
        query2 = """
        SELECT g.genre 
        FROM moviegenres as mg, genres as g
        WHERE mg.movie_id = %s
        AND mg.genre_id = g.genre_id
        """
        cursor.execute(query2, (movie_id,))
        genres = [item[0] for item in cursor.fetchall()]

    
        query3 = """
            SELECT c.role, c.p_id, p.name, p.imgpath
            FROM cast as c, people as p
            WHERE c.movie_id=%s
            AND c.p_id=p.p_id
            order by c.position
        """
        cursor.execute(query3, (movie_id,))
        cast = cursor.fetchall()

        query4 = """
            SELECT c.job, c.p_id, p.name, p.imgpath
            FROM crew as c, people as p
            WHERE c.movie_id=%s
            AND c.p_id=p.p_id
        """
        cursor.execute(query4, (movie_id,))
        crew = cursor.fetchall()
        lists = []
        score = []
        watch = []
        
        if username:
            query5 = """
                SELECT l.listname
                FROM users u
                JOIN list l ON u.u_id = l.u_id
                JOIN list_content lc ON l.u_id = lc.u_id AND l.list_no = lc.list_no
                JOIN movie m ON lc.movie_id = m.movie_id
                WHERE u.username = %s AND m.movie_id = %s;
            """
            cursor.execute(query5, (username, movie_id))
            res = cursor.fetchall()

            if res:
                lists = res[0]
                if 'Completed' in lists:
                    query6 = """
                        SELECT lc.score, lc.watch
                        FROM list_content lc
                        JOIN users u ON u.u_id = lc.u_id
                        WHERE u.username = %s 
                            AND lc.movie_id = %s
                            AND lc.list_no = 1
                    """
                    cursor.execute(query6, (username, movie_id))
                    result = cursor.fetchone()
                    score = result[0]
                    watch = result[1].strftime("%Y-%m-%d")
    
        movie_values={
            "id":movie[0][0],
            "name":movie[0][1],
            "language":movie[0][2],
            "released_date":movie[0][3].strftime("%Y-%m-%d"),
            "runtime":movie[0][4],
            "overview":movie[0][5],
            "tmdb_rating":movie[0][6],
            "posterpath":movie[0][7],
            "backdroppath":movie[0][8],
            "trailer":movie[0][9],
            "rating":movie[0][10],
            "votes":movie[0][11],
            "production_company":movie[0][12],
            "genres":genres,
            "cast":cast,
            "crew":crew,
            "lists": lists,
            "score": score,
            "watch": watch
        }
        return  jsonify(movie_values)
    
    
@app.route('/update', methods=['POST'])
def update():
    if request.method=='POST':
        try:
            movie_id = request.json['movieid']
            username =  request.json['username']
            status = request.json['status']
            
            if status == 'Completed':
                score = request.json['score']
                watch = request.json['watchDate']
                query1 = """
                    DELETE FROM list_content
                    WHERE movie_id = %s
                    AND (u_id, list_no) IN (
                        SELECT u_id, list_no 
                        FROM list 
                        WHERE u_id = (
                            SELECT u_id
                            FROM users 
                            WHERE username = %s) 
                        AND list_no = 2);
                """
                cursor.execute(query1, (movie_id, username))
                
                query2 = """
                    INSERT INTO list_content (u_id, list_no, movie_id, watch, score)
                    VALUES (
                        (SELECT u_id FROM users WHERE username = %s),
                        1, %s, %s, %s
                    )
                    ON DUPLICATE KEY UPDATE
                        watch = %s,
                        score = %s;
                """
                cursor.execute(query2, (username, movie_id, watch, score, watch, score))
                cursor.execute('COMMIT')
                
            else:
                query3 = """
                    DELETE FROM list_content
                    WHERE movie_id = %s
                    AND (u_id, list_no) IN (
                        SELECT u_id, list_no 
                        FROM list 
                        WHERE u_id = (
                            SELECT u_id
                            FROM users 
                            WHERE username = %s) 
                        AND list_no = 1);
                """
                cursor.execute(query3, (movie_id, username))
                
                query4 = """
                    INSERT IGNORE INTO list_content (u_id, list_no, movie_id, watch, score)
                    VALUES (
                        (SELECT u_id FROM users WHERE username = %s),
                        2, %s, NULL, NULL
                    )
                """
                cursor.execute(query4, (username, movie_id))
                cursor.execute('COMMIT')
                
            fav = request.json['isFavorite']
            if fav:
                query5 = """
                    INSERT IGNORE INTO list_content (u_id, list_no, movie_id, watch, score)
                    VALUES (
                        (SELECT u_id FROM users WHERE username = %s),
                        3, %s, NULL, NULL
                    )
                """
                cursor.execute(query5, (username, movie_id))
                cursor.execute('COMMIT')
            else:
                query6 = """
                    DELETE FROM list_content
                    WHERE movie_id = %s
                    AND (u_id, list_no) IN (
                        SELECT u_id, list_no 
                        FROM list 
                        WHERE u_id = (
                            SELECT u_id
                            FROM users 
                            WHERE username = %s) 
                        AND list_no = 3);
                """
                cursor.execute(query6, (movie_id, username))
                cursor.execute('COMMIT')
                
            return jsonify(success=True)
        except Exception as e:
            print("Error: ", e)
            return jsonify(success=False)
            
@app.route('/delete', methods=['POST'])
def delete():
    if request.method=='POST':
        try:
            movie_id = request.json['movieid']
            username = request.json['username']
            print(movie_id, username)
            
            query = """
                DELETE FROM list_content
                WHERE movie_id = %s
                AND (u_id, list_no) IN (
                    SELECT u_id, list_no 
                    FROM list 
                    WHERE u_id = (
                        SELECT u_id
                        FROM users 
                        WHERE username = %s));
            """
            cursor.execute(query, (movie_id, username))
            cursor.execute('COMMIT')
            return jsonify(success=True)
        except Exception as e:
            print("Error: ", e)
            return jsonify(success=False)

if __name__ == '__main__':
    
	app.run(debug=True)


