
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
        password="",
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
            "released_date":top_movies[0][3].strftime("%Y-%m"),
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
        
        print(movie_values)
        
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
        year = request.json['yeardate']
        genres = request.json['selectedOption']
        language = request.json['selectedOption1']
        print(search,year,genres,language)
        return jsonify("succes")
    
    


if __name__ == '__main__':
    
	app.run(debug=True)


   
