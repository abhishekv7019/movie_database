
from flask import Flask,jsonify,request,render_template
from flask_cors import CORS
from flask_mysqldb import MySQL
import datetime
import mysql.connector
from werkzeug.security import  check_password_hash,generate_password_hash


app = Flask(__name__)
cors = CORS(app)

try:
    connection = mysql.connector.connect(
        host="localhost",
        user="root",
        password="abhishek!@#$1234",
        database="movie_db_1"
    )
    
    cursor = connection.cursor()
    

   
except mysql.connector.Error as error:
    print("Error connecting to MySQL:", error)
    
finally:
    print("Database connected")




@app.route('/',methods=["GET","POST"])
def hello_world():
    if request.method=="GET":
        
        return generate_password_hash("password")



@app.route('/get_movie_details', methods=['GET','POST'])
def get_movie_details():
    if request.method=='GET':
        return "hi"
    
    if request.method=='POST':
        movie_id = request.json['movieid']
        sql_query = f"""
        SELECT * 
        FROM movie_db_1.movie
        where movie_id={movie_id} 
        """
        cursor.execute(sql_query)
        top_movies = cursor.fetchall()
        
        
        query1 = """
            SELECT g.genre 
            FROM moviegenres as mg, genres as g
            WHERE mg.movie_id = %s
            AND mg.genre_id = g.genre_id
        """
  
        cursor.execute(query1, (movie_id,))

        genres = cursor.fetchall()
        genreslist=[]
        for item in genres:
            genreslist.append(item[0])
            
      
        query2 = f"""
            SELECT c.role, c.p_id, p.name, p.imgpath
            FROM cast as c, people as p
            WHERE c.movie_id={movie_id}
            AND c.p_id=p.p_id
        """
        cursor.execute(query2)

        cast = cursor.fetchall()
        
        
        
        
        
        query3 = f"""
            SELECT c.job, c.p_id, p.name, p.imgpath
            FROM crew as c, people as p
            WHERE c.movie_id={movie_id}
            AND c.p_id=p.p_id
        """
        cursor.execute(query3)

        crew = cursor.fetchall()
    
    
        movie_values={
            "id":top_movies[0][0],
            "name":top_movies[0][1],
            "language":top_movies[0][2],
            "released_date":top_movies[0][3].strftime("%Y-%m-%d"),
            "runtime":top_movies[0][4],
            "overview":top_movies[0][5],
            "tmdb_rating":top_movies[0][6],
            "posterpath":top_movies[0][7],
            "backdroppath":top_movies[0][8],
            "trailer":top_movies[0][9],
            "rating":top_movies[0][10],
            "votes":top_movies[0][11],
            "production_company":top_movies[0][12],
            "genres":genreslist,
            "cast":cast,
            "crew":crew
        }
        
        return  jsonify(movie_values)


@app.route('/signup',methods=["GET","POST"])
def sign_up():
    if request.method=="GET":
        return "HI"
    
    if request.method=="POST":
        username = request.json['username']
        email = request.json['email']
        password = request.json['password']
        passkey=generate_password_hash(password)
        insert_query = "INSERT INTO users (username, column2, column3) VALUES (%s, %s, %s)"
        print(username," ",email," ",passkey)
        return jsonify("T")
		
@app.route('/login',methods=["GET","POST"])
def login():
    if request.method=="GET":
        return "HI"
    
    if request.method=="POST":
        email = request.json['email']
        password = request.json['password']
        print(email," ",password)
        return jsonify("T")
		
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
       
        print(search,release_year,genre_id,language)
    
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
        
        people_id = request.json['peopleid']
        
        querypepleinfo=f"""SELECT * 
        FROM people as p
        where p.p_id={people_id}
        """
        cursor.execute(querypepleinfo)
        results1 = cursor.fetchall()
        
        
        querymoviesacted = f"""
        SELECT c.role, m.title , m.posterpath
        FROM cast AS c, movie AS m
        WHERE c.movie_id = m.movie_id
        AND c.p_id = {people_id}
        UNION
        SELECT cr.job, m.title ,m.posterpath
        FROM crew AS cr, movie AS m
        WHERE cr.movie_id = m.movie_id
        AND cr.p_id = {people_id}
        """

        
        cursor.execute(querymoviesacted)
        results2 = cursor.fetchall()
        
        
        
        peopledetails={
            "id":results1[0][0],
            "nameee":results1[0][1],
            "dob":results1[0][2],
            "bio":results1[0][3],
            "posterpath":results1[0][4],
            "moviesactedin":results2
        }
        
        print(peopledetails)
         
        return jsonify(peopledetails)
    
    


if __name__ == '__main__':
    
	app.run(debug=True)


   
   





"""
        SELECT m.title,m.posterpath
        FROM movie as m
        WHERE
            (CASE 
                WHEN "THE" IS NOT NULL THEN  m.title LIKE 'THE%'
                ELSE TRUE
            END)
            AND (CASE 
                WHEN "en" IS NOT NULL THEN YEAR(m.release_date) =1994
                ELSE TRUE
            END)
            AND (CASE 
                WHEN "en" IS NOT NULL THEN m.language = "en"
                ELSE TRUE
            END)

"""

